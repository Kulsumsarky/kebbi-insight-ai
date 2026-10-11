import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Loader2, Check, X, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Update = {
  id: string;
  lga: string;
  school: string;
  total_teachers: number;
  classroom_teachers: number;
  office_teachers: number;
  learners: number;
  subject_gaps: string[];
  status: string;
  created_at: string;
  officials: { name: string; phone: string } | null;
};

type Contact = { id: string; name: string; phone: string; message: string; created_at: string };

const csvCell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;

const downloadCsv = (filename: string, header: string[], rows: unknown[][]) => {
  const body = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([body], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const fmt = (d: string) => new Date(d).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

const Admin = () => {
  const { user, role, loading: authLoading, signOut } = useAuth();
  const [tab, setTab] = useState<"pending" | "reviewed" | "contacts">("pending");
  const [updates, setUpdates] = useState<Update[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [waited, setWaited] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gateBusy, setGateBusy] = useState(false);
  const [gateError, setGateError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setWaited(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    const [u, c] = await Promise.all([
      supabase
        .from("pending_updates")
        .select("*, officials(name, phone)")
        .order("created_at", { ascending: false }),
      supabase.from("contact_requests").select("*").order("created_at", { ascending: false }),
    ]);
    if (u.error || c.error) setError("Could not load data. Please refresh.");
    setUpdates((u.data as unknown as Update[]) ?? []);
    setContacts((c.data as Contact[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (role === "ministry" && verified) load();
  }, [role, verified, load]);

  const review = async (id: string, status: "approved" | "rejected") => {
    const { error: e } = await supabase.from("pending_updates").update({ status }).eq("id", id);
    if (e) return setError("Could not save that decision. Please try again.");
    setUpdates((list) => list.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const removeContact = async (id: string) => {
    if (!window.confirm("Delete this message permanently?")) return;
    const { error: e } = await supabase.from("contact_requests").delete().eq("id", id);
    if (e) return setError("Could not delete that message.");
    setContacts((list) => list.filter((x) => x.id !== id));
  };

  if (authLoading || (role === null && !waited)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (role !== "ministry") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <h1 className="font-display font-bold text-2xl text-foreground">Admin access only</h1>
        <p className="text-muted-foreground font-body max-w-md">
          This page is for administrators. Please sign in with an admin account.
        </p>
        <Button asChild className="bg-primary text-primary-foreground">
          <Link to="/auth">Sign in</Link>
        </Button>
      </div>
    );
  }

  const confirmIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateBusy(true);
    setGateError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setGateBusy(false);
    if (err || !data.user) return setGateError("Incorrect email or password.");
    if (data.user.id !== user?.id) {
      await supabase.auth.signOut();
      return setGateError("That is not the signed-in admin account.");
    }
    setPassword("");
    setVerified(true);
  };

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <form onSubmit={confirmIdentity} className="w-full max-w-sm space-y-3">
          <h1 className="font-display font-bold text-2xl text-foreground">Confirm admin sign-in</h1>
          <p className="text-sm text-muted-foreground font-body">
            Enter the email and password of your approved admin account to continue.
          </p>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {gateError && <p className="text-sm text-destructive font-body">{gateError}</p>}
          <Button type="submit" disabled={gateBusy} className="w-full bg-primary text-primary-foreground">
            {gateBusy ? "Checking..." : "Continue"}
          </Button>
        </form>
      </div>
    );
  }

  const pending = updates.filter((u) => u.status === "pending");
  const reviewed = updates.filter((u) => u.status !== "pending");

  const exportUpdates = (list: Update[], name: string) =>
    downloadCsv(
      name,
      ["Submitted", "LGA", "School", "Official", "Phone", "Total teachers", "Classroom", "Office", "Learners", "Subject gaps", "Status"],
      list.map((u) => [
        fmt(u.created_at), u.lga, u.school, u.officials?.name, u.officials?.phone,
        u.total_teachers, u.classroom_teachers, u.office_teachers, u.learners,
        u.subject_gaps.join("; "), u.status,
      ]),
    );

  const UpdateCard = ({ u, actions }: { u: Update; actions: boolean }) => (
    <div className="rounded-xl border border-border bg-card p-4 space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-display font-semibold text-foreground">{u.school}</p>
          <p className="text-xs text-muted-foreground font-body">
            {u.lga} · {u.officials?.name ?? "Unknown"} ({u.officials?.phone ?? "-"}) · {fmt(u.created_at)}
          </p>
        </div>
        {!actions && (
          <span className="text-xs font-display font-semibold uppercase tracking-wide text-primary">{u.status}</span>
        )}
      </div>
      <p className="text-sm font-body text-foreground">
        Teachers: {u.total_teachers} (classroom {u.classroom_teachers}, office {u.office_teachers}) · Learners: {u.learners}
      </p>
      {u.subject_gaps.length > 0 && (
        <p className="text-sm text-muted-foreground font-body">Subject gaps: {u.subject_gaps.join(", ")}</p>
      )}
      {actions && (
        <div className="flex gap-2 pt-1">
          <Button size="sm" onClick={() => review(u.id, "approved")} className="bg-primary text-primary-foreground">
            <Check className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button size="sm" variant="outline" onClick={() => review(u.id, "rejected")}>
            <X className="w-4 h-4 mr-1" /> Reject
          </Button>
        </div>
      )}
    </div>
  );

  const tabBtn = (key: typeof tab, label: string) => (
    <button
      onClick={() => setTab(key)}
      className={`px-4 py-2 text-sm font-display font-semibold rounded-lg transition-colors ${
        tab === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-display font-bold text-xl text-foreground">
            EduMap <span className="text-primary">NG</span> · Review
          </h1>
          <div className="flex items-center gap-3 text-sm font-body">
            <Link to="/dashboard" className="text-primary hover:underline">Dashboard</Link>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground">Sign out</button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6 max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {tabBtn("pending", `Pending updates (${pending.length})`)}
          {tabBtn("reviewed", `Reviewed (${reviewed.length})`)}
          {tabBtn("contacts", `Contact requests (${contacts.length})`)}
        </div>

        {error && <p className="text-sm text-destructive font-body">{error}</p>}
        {loading && <Loader2 className="w-5 h-5 animate-spin text-primary" />}

        {!loading && tab === "pending" && (
          <div className="space-y-3">
            {pending.length === 0 && <p className="text-sm text-muted-foreground font-body">No pending updates.</p>}
            {pending.map((u) => <UpdateCard key={u.id} u={u} actions />)}
          </div>
        )}

        {!loading && tab === "reviewed" && (
          <div className="space-y-3">
            {reviewed.length > 0 && (
              <Button variant="outline" size="sm" onClick={() => exportUpdates(reviewed, "edumap-reviewed-updates.csv")}>
                <Download className="w-4 h-4 mr-2" /> Download CSV
              </Button>
            )}
            {reviewed.length === 0 && <p className="text-sm text-muted-foreground font-body">Nothing reviewed yet.</p>}
            {reviewed.map((u) => <UpdateCard key={u.id} u={u} actions={false} />)}
          </div>
        )}

        {!loading && tab === "contacts" && (
          <div className="space-y-3">
            {contacts.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadCsv("edumap-contact-requests.csv", ["Received", "Name", "Phone", "Message"],
                    contacts.map((c) => [fmt(c.created_at), c.name, c.phone, c.message]))
                }
              >
                <Download className="w-4 h-4 mr-2" /> Download CSV
              </Button>
            )}
            {contacts.length === 0 && <p className="text-sm text-muted-foreground font-body">No messages yet.</p>}
            {contacts.map((c) => (
              <div key={c.id} className="rounded-xl border border-border bg-card p-4 space-y-1">
                <div className="flex justify-between gap-2">
                  <p className="font-display font-semibold text-foreground">{c.name} · {c.phone}</p>
                  <button onClick={() => removeContact(c.id)} aria-label="Delete message" className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground font-body">{fmt(c.created_at)}</p>
                <p className="text-sm font-body text-foreground">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
