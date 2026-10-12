import { useEffect, useState } from "react";
import { MessageCircle, X, ArrowLeft, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type View = "menu" | "faq" | "contact" | "official" | "update" | "done";

const FAQS = [
  { q: "What is EduMap NG?", a: "A platform that turns school-level teacher data into clear, current evidence for planning and posting decisions in Kebbi State." },
  { q: "Where does the data come from?", a: "It is built on DNEMIS data and school-level records collected with local government education authorities." },
  { q: "Who can see the data?", a: "Only authorised officials. Data is handled with the consent of the relevant authorities." },
  { q: "Which LGAs are in the pilot?", a: "Birnin Kebbi, Kalgo, Argungu, Gwandu and Aliero." },
  { q: "How do I request a briefing?", a: "Choose 'Contact the team' here, or email hello@edumap.com.ng." },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneMsg, setDoneMsg] = useState("");

  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cMsg, setCMsg] = useState("");

  const [phone, setPhone] = useState("");
  const [official, setOfficial] = useState<{ id: string; lga: string; name: string } | null>(null);
  const [schools, setSchools] = useState<string[]>([]);
  const [school, setSchool] = useState("");
  const [total, setTotal] = useState("");
  const [classroom, setClassroom] = useState("");
  const [office, setOffice] = useState("0");
  const [learners, setLearners] = useState("");
  const [gaps, setGaps] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const target = (e as CustomEvent<View>).detail;
      setOpen(true);
      setError("");
      setView(target ?? "menu");
    };
    window.addEventListener("edumap:open-chat", onOpen);
    return () => window.removeEventListener("edumap:open-chat", onOpen);
  }, []);

  const goto = (v: View) => {
    setError("");
    setView(v);
  };

  const sendContact = async () => {
    if (!cName.trim() || !cPhone.trim() || !cMsg.trim()) return setError("Please fill in all fields.");
    setBusy(true);
    const { error: e } = await supabase
      .from("contact_requests")
      .insert({ name: cName.trim(), phone: cPhone.trim(), message: cMsg.trim() });
    setBusy(false);
    if (e) return setError("Sorry, that did not send. Please email hello@edumap.com.ng.");
    setDoneMsg("Thank you. We have received your message and will be in touch.");
    setCName(""); setCPhone(""); setCMsg("");
    goto("done");
  };

  const verify = async () => {
    if (!phone.trim()) return setError("Enter your registered phone number.");
    setBusy(true);
    const { data, error: e } = await supabase.rpc("verify_official", { _phone: phone.trim() });
    if (e || !data || data.length === 0) {
      setBusy(false);
      return setError("We could not find that number. Please contact the team to register.");
    }
    const { data: s } = await supabase.rpc("official_schools", { _phone: phone.trim() });
    setBusy(false);
    setOfficial(data[0]);
    setSchools((s ?? []).map((r: { name: string }) => r.name));
    goto("update");
  };

  const sendUpdate = async () => {
    const t = Number(total), c = Number(classroom), o = Number(office), l = Number(learners);
    if (!school || [t, c, o, l].some((n) => Number.isNaN(n) || n < 0) || !total || !classroom || !learners)
      return setError("Please choose a school and enter all numbers.");
    setBusy(true);
    const { error: e } = await supabase.rpc("submit_pending_update", {
      _phone: phone.trim(),
      _school: school,
      _total: t,
      _classroom: c,
      _office: o,
      _learners: l,
      _gaps: gaps.split(",").map((g) => g.trim()).filter(Boolean),
    });
    setBusy(false);
    if (e) return setError("Sorry, the update could not be sent. Please try again.");
    setDoneMsg("Thank you. Your update has been sent for review.");
    setSchool(""); setTotal(""); setClassroom(""); setOffice("0"); setLearners(""); setGaps("");
    goto("done");
  };

  const MenuBtn = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full text-left rounded-lg border border-border bg-card px-4 py-3 text-sm font-display font-semibold text-foreground hover:bg-secondary transition-colors"
    >
      {label}
    </button>
  );

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed z-50 bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-96 h-[85vh] sm:h-[32rem] bg-background border border-border sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {view !== "menu" && (
                <button onClick={() => goto("menu")} aria-label="Back">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <span className="font-display font-semibold">EduMap NG</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {view === "menu" && (
              <>
                <p className="text-sm text-muted-foreground font-body">
                  Welcome to EduMap NG. How can we help?
                </p>
                <MenuBtn label="About EduMap NG (FAQ)" onClick={() => goto("faq")} />
                <MenuBtn label="Contact the team" onClick={() => goto("contact")} />
                <MenuBtn label="I am a registered official: send an update" onClick={() => goto("official")} />
              </>
            )}

            {view === "faq" &&
              FAQS.map((f, i) => (
                <div key={f.q} className="rounded-lg border border-border bg-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-4 py-3 text-sm font-display font-semibold text-foreground"
                  >
                    {f.q}
                  </button>
                  {openFaq === i && <p className="px-4 pb-3 text-sm text-muted-foreground font-body">{f.a}</p>}
                </div>
              ))}

            {view === "contact" && (
              <>
                <Input placeholder="Your name" value={cName} onChange={(e) => setCName(e.target.value)} />
                <Input placeholder="Phone number" value={cPhone} onChange={(e) => setCPhone(e.target.value)} />
                <Textarea placeholder="Your message" value={cMsg} onChange={(e) => setCMsg(e.target.value)} />
                <Button onClick={sendContact} disabled={busy} className="w-full bg-primary text-primary-foreground">
                  <Send className="w-4 h-4 mr-2" /> Send
                </Button>
              </>
            )}

            {view === "official" && (
              <>
                <p className="text-sm text-muted-foreground font-body">
                  Enter the phone number you registered with. Updates are reviewed before use.
                </p>
                <Input placeholder="Registered phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Button onClick={verify} disabled={busy} className="w-full bg-primary text-primary-foreground">
                  Continue
                </Button>
              </>
            )}

            {view === "update" && official && (
              <>
                <p className="text-sm font-body text-foreground">
                  Hello {official.name} ({official.lga}).
                </p>
                <select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Choose school</option>
                  {schools.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <Input type="number" min={0} placeholder="Total teachers" value={total} onChange={(e) => setTotal(e.target.value)} />
                <Input type="number" min={0} placeholder="Teachers in classrooms" value={classroom} onChange={(e) => setClassroom(e.target.value)} />
                <Input type="number" min={0} placeholder="Teachers in offices" value={office} onChange={(e) => setOffice(e.target.value)} />
                <Input type="number" min={0} placeholder="Learners" value={learners} onChange={(e) => setLearners(e.target.value)} />
                <Input placeholder="Subject gaps (comma separated)" value={gaps} onChange={(e) => setGaps(e.target.value)} />
                <Button onClick={sendUpdate} disabled={busy} className="w-full bg-primary text-primary-foreground">
                  Send for review
                </Button>
              </>
            )}

            {view === "done" && (
              <>
                <p className="text-sm font-body text-foreground">{doneMsg}</p>
                <MenuBtn label="Back to menu" onClick={() => goto("menu")} />
              </>
            )}

            {error && <p className="text-sm text-destructive font-body">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
