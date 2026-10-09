CREATE TABLE public.officials (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, phone text NOT NULL UNIQUE, lga text NOT NULL, active boolean NOT NULL DEFAULT true, is_sample boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.officials TO authenticated;
GRANT ALL ON public.officials TO service_role;
ALTER TABLE public.officials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ministry manages officials" ON public.officials FOR ALL TO authenticated USING (public.has_role(auth.uid(),'ministry')) WITH CHECK (public.has_role(auth.uid(),'ministry'));

CREATE TABLE public.schools (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, lga text NOT NULL, is_sample boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.schools TO authenticated;
GRANT ALL ON public.schools TO service_role;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ministry manages schools" ON public.schools FOR ALL TO authenticated USING (public.has_role(auth.uid(),'ministry')) WITH CHECK (public.has_role(auth.uid(),'ministry'));

CREATE TABLE public.contact_requests (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL CHECK (length(name) BETWEEN 1 AND 120), phone text NOT NULL CHECK (length(phone) BETWEEN 7 AND 20), message text NOT NULL CHECK (length(message) BETWEEN 1 AND 1000), created_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.contact_requests TO anon, authenticated;
GRANT SELECT, DELETE ON public.contact_requests TO authenticated;
GRANT ALL ON public.contact_requests TO service_role;
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can send a contact request" ON public.contact_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Ministry reads contact requests" ON public.contact_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'ministry'));

CREATE TABLE public.pending_updates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), official_id uuid NOT NULL REFERENCES public.officials(id) ON DELETE CASCADE, lga text NOT NULL, school text NOT NULL, total_teachers int NOT NULL CHECK (total_teachers >= 0), classroom_teachers int NOT NULL CHECK (classroom_teachers >= 0 AND classroom_teachers <= total_teachers), office_teachers int NOT NULL DEFAULT 0 CHECK (office_teachers >= 0 AND office_teachers <= total_teachers), subject_gaps text[] NOT NULL DEFAULT '{}', learners int NOT NULL CHECK (learners >= 0), status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, UPDATE ON public.pending_updates TO authenticated;
GRANT ALL ON public.pending_updates TO service_role;
ALTER TABLE public.pending_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ministry reads updates" ON public.pending_updates FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'ministry'));
CREATE POLICY "Ministry reviews updates" ON public.pending_updates FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'ministry')) WITH CHECK (public.has_role(auth.uid(),'ministry'));

-- Chat-session functions: verify by phone, never expose tables
CREATE OR REPLACE FUNCTION public.verify_official(_phone text)
RETURNS TABLE(id uuid, name text, lga text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT o.id, o.name, o.lga FROM public.officials o
  WHERE o.active AND regexp_replace(o.phone,'\D','','g') = regexp_replace(_phone,'\D','','g') LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.official_schools(_phone text)
RETURNS TABLE(name text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT s.name FROM public.schools s JOIN public.officials o ON o.lga = s.lga
  WHERE o.active AND regexp_replace(o.phone,'\D','','g') = regexp_replace(_phone,'\D','','g') ORDER BY s.name
$$;

CREATE OR REPLACE FUNCTION public.submit_pending_update(_phone text, _school text, _total int, _classroom int, _office int, _gaps text[], _learners int)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE o record; new_id uuid;
BEGIN
  SELECT * INTO o FROM public.officials WHERE active AND regexp_replace(phone,'\D','','g') = regexp_replace(_phone,'\D','','g') LIMIT 1;
  IF o IS NULL THEN RAISE EXCEPTION 'Not a registered official'; END IF;
  IF length(coalesce(_school,'')) NOT BETWEEN 1 AND 200 THEN RAISE EXCEPTION 'Invalid school'; END IF;
  INSERT INTO public.pending_updates(official_id, lga, school, total_teachers, classroom_teachers, office_teachers, subject_gaps, learners)
  VALUES (o.id, o.lga, _school, _total, _classroom, _office, coalesce(_gaps,'{}'), _learners) RETURNING id INTO new_id;
  RETURN new_id;
END $$;

REVOKE ALL ON FUNCTION public.verify_official(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.official_schools(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_pending_update(text,text,int,int,int,text[],int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_official(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.official_schools(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_pending_update(text,text,int,int,int,text[],int) TO anon, authenticated;

INSERT INTO public.officials(name, phone, lga, is_sample) VALUES
 ('Sample Official A','08000000001','Birnin Kebbi',true),
 ('Sample Official B','08000000002','Kalgo',true),
 ('Sample Official C','08000000003','Argungu',true);
INSERT INTO public.schools(name, lga, is_sample) VALUES
 ('Sample School — Birnin Kebbi Model Primary','Birnin Kebbi',true),
 ('Sample School — Kalgo Central Primary','Kalgo',true),
 ('Sample School — Argungu Town Primary','Argungu',true);