import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "ministry" | "lga_secretary" | "school_admin";

export const roleLabels: Record<AppRole, string> = {
  ministry: "State Ministry of Education",
  lga_secretary: "LGA Education Secretary",
  school_admin: "School Administrator",
};

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  lga: string | null;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  role: AppRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  profile: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = (uid: string) => {
      setTimeout(async () => {
        const [{ data: p }, { data: r }] = await Promise.all([
          supabase.from("profiles").select("id, full_name, email, lga").eq("id", uid).maybeSingle(),
          supabase.from("user_roles").select("role").eq("user_id", uid).maybeSingle(),
        ]);
        setProfile((p as Profile) ?? null);
        setRole((r?.role as AppRole) ?? null);
      }, 0);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
      if (newSession?.user) {
        loadDetails(newSession.user.id);
      } else {
        setProfile(null);
        setRole(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      setSession(existing);
      setUser(existing?.user ?? null);
      setLoading(false);
      if (existing?.user) loadDetails(existing.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
