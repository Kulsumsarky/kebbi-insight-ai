import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  School,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import kebbiSeal from "@/assets/kebbi-seal.jpg";
import nigeriaMap from "@/assets/nigeria-kebbi-map.png";
import { Button } from "@/components/ui/button";
import { DATA_SOURCE } from "@/data/kebbiData";
import ChatWidget from "@/components/ChatWidget";

const CONTACT_EMAIL = "hello@edumap.com.ng";
const LINKEDIN_HANDLE = "@edumapng";
const LINKEDIN_URL = "https://www.linkedin.com/company/edumapng";

const problemPoints = [
  { icon: MapPin, title: "Where teachers are actually deployed" },
  { icon: BarChart3, title: "Which subjects are short, LGA by LGA" },
  { icon: CheckCircle2, title: "Current evidence, not months-old estimates" },
];

const pilotLgas = ["Birnin Kebbi", "Kalgo", "Argungu", "Gwandu", "Aliero"];

const faqs = [
  { q: "What is EduMap NG?", a: "A platform that turns school-level teacher data into clear evidence for planning and posting decisions in Kebbi State." },
  { q: "Where does the data come from?", a: "It is built on DNEMIS data, and school-level records collected with local government education authorities." },
  { q: "Who can see it?", a: "Only authorised officials. Data is handled with the consent of the relevant authorities." },
  { q: "Is it free during the pilot?", a: "Please write to us and we will share the pilot details with your office." },
  { q: "How do LGEAs take part?", a: "We begin with five pilot LGAs and work with their education authorities to collect and verify school-level data." },
  { q: "How do I contact you?", a: "Email hello@edumap.com.ng or message us on LinkedIn at @edumapng." },
];

const whatItDoes = [
  {
    icon: School,
    title: "Maps every LGA in one view",
    text: "Schools, learners and teachers for all 21 local government areas in a single, consistent picture.",
  },
  {
    icon: BarChart3,
    title: "Pinpoints where the gaps are",
    text: "Urgency ratings, learner–teacher ratios and subject shortfalls show which areas are under-resourced, and how badly.",
  },
  {
    icon: Users,
    title: "Checks whether deployment adds up",
    text: "Separates teachers actually in classrooms from those in administrative offices and those unaccounted for.",
  },
  {
    icon: Target,
    title: "Ranks what to act on first",
    text: "A priority-ordered list of recommended actions, so limited recruitment capacity goes where the need is greatest.",
  },
  {
    icon: Sparkles,
    title: "Writes the brief for you",
    text: "Generates a structured intelligence report, ready to circulate to the Ministry, LGA secretaries and partners.",
  },
];

const howItWorks = [
  {
    step: "1",
    icon: ClipboardList,
    title: "Load the official records",
    text: "Verified census and ministry data is imported once and held centrally, so every user sees the same numbers.",
  },
  {
    step: "2",
    icon: Search,
    title: "Filter and investigate",
    text: "Narrow by LGA, school type, location or subject, and compare areas side by side until the pattern is clear.",
  },
  {
    step: "3",
    icon: CheckCircle2,
    title: "Decide and act",
    text: "Leave with a defensible shortlist of where to post, recruit or intervene — and a written report to back it.",
  },
];

const whoFor = [
  {
    icon: Building2,
    title: "State Ministry",
    text: "Set recruitment priorities, track progress against targets, and brief partners with one authoritative view.",
  },
  {
    icon: MapPin,
    title: "LGA Secretaries",
    text: "See your area's shortages and staffing gaps in context, and make the case for support with evidence.",
  },
  {
    icon: School,
    title: "School Administrators",
    text: "Understand how your school's coverage compares with neighbouring areas and what it means for learners.",
  },
];

const gridStyle = {
  backgroundImage:
    "linear-gradient(hsl(var(--border) / 0.55) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border) / 0.55) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const MiniBars = () => (
  <div className="flex items-end gap-1.5 h-10">
    {[38, 55, 30, 62, 45, 78, 58].map((h, i) => (
      <div
        key={i}
        className={`w-3 rounded-sm ${i === 5 ? "bg-accent" : "bg-primary/70"}`}
        style={{ height: `${h}%` }}
      />
    ))}
  </div>
);

const MiniLine = () => (
  <svg viewBox="0 0 120 44" className="w-full h-10" fill="none">
    <polyline
      points="4,36 24,30 44,32 64,22 84,24 104,10 116,6"
      stroke="hsl(var(--primary))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="116" cy="6" r="3.5" fill="hsl(var(--accent))" />
  </svg>
);

const HeroIllustration = () => (
  <div className="relative">
    <div
      className="relative rounded-2xl border border-border bg-secondary/60 overflow-hidden p-6 md:p-8"
      style={gridStyle}
    >
      {/* Map of Nigeria with Kebbi State highlighted */}
      <div className="relative mx-auto w-full max-w-md aspect-square">
        <img
          src={nigeriaMap}
          alt="Map of Nigeria with Kebbi State highlighted in gold"
          width={1024}
          height={1024}
          className="w-full h-full object-contain drop-shadow-md"
        />
        {/* Logo pinned inside Kebbi State */}
        <div className="absolute left-[15.5%] top-[27%] -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
          <img
            src={kebbiSeal}
            alt="Kebbi State Seal"
            className="relative w-11 h-11 md:w-14 md:h-14 rounded-full border-2 border-card shadow-lg object-cover"
          />
        </div>
        <span className="absolute left-[15.5%] top-[40%] -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-display font-semibold px-2 py-0.5 rounded-full shadow">
          Kebbi State
        </span>
      </div>

      {/* floating card: planning signals */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-card border border-border rounded-xl shadow-md p-3 w-36 md:w-44">
        <p className="text-[10px] font-display font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          Planning signals
        </p>
        <MiniLine />
      </div>

      {/* floating card: gap analysis */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-card border border-border rounded-xl shadow-md p-3 w-36 md:w-44">
        <p className="text-[10px] font-display font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
          Gap analysis
        </p>
        <MiniBars />
      </div>
    </div>
    <p className="mt-2.5 flex items-center gap-2 text-[10px] font-body font-semibold uppercase tracking-widest text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      Conceptual view · Illustrative data
    </p>
  </div>
);

const Landing = () => (
  <div className="min-h-screen bg-background flex flex-col">
    {/* Top bar */}
    <header className="bg-background/95 border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img
            src={kebbiSeal}
            alt="Kebbi State Seal"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-accent object-cover"
          />
          <span className="font-display font-bold text-xl md:text-2xl text-foreground tracking-tight">
            EduMap <span className="text-primary">NG</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-body font-medium text-muted-foreground">
          <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#pilot" className="hover:text-foreground transition-colors">Pilot</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold">
          <a href={`mailto:${CONTACT_EMAIL}?subject=Request%20a%20briefing`}>Request a briefing</a>
        </Button>
      </div>
    </header>

    <main className="flex-1">
      {/* Split hero */}
      <section className="border-b border-border">
        <div className="container py-12 md:py-20 grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <div>
            <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-primary mb-4">
              Teacher Deployment & Gap Intelligence
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-foreground mb-5">
              See where every teacher is needed,{" "}
              <span className="text-primary">LGA by LGA.</span>
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-lg mb-5">
              EduMap NG turns school-level teacher data into clear, current evidence for planning and
              posting decisions in Kebbi State.
            </p>
            <p className="font-display font-semibold text-foreground text-sm mb-6">
              Map gaps. Align action. Strengthen schools.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold group">
                <a href={`mailto:${CONTACT_EMAIL}?subject=Request%20a%20briefing`}>
                  Request a briefing
                  <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary/40 text-primary hover:bg-secondary hover:text-primary font-display font-semibold"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <p className="mt-3.5 text-xs text-muted-foreground font-body">
              Officials with an account can <Link to="/auth" className="underline underline-offset-2">sign in here</Link>.
            </p>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="container py-12 md:py-16 scroll-mt-20">
        <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-primary mb-2">The problem</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Teacher gaps are hard to see without current school-level data
        </h2>
        <p className="text-muted-foreground font-body max-w-2xl mb-8">
          Planning and posting decisions are only as good as the evidence behind them. EduMap NG brings it into one place.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {problemPoints.map(({ icon: Icon, title }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="w-6 h-6 text-primary shrink-0" />
              <p className="font-display font-semibold text-foreground">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What EduMap does */}
      <section id="how-it-works" className="container py-12 md:py-16 scroll-mt-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whatItDoes.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group">
              <Icon className="w-6 h-6 text-primary mb-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground font-body">{text}</p>
            </div>
          ))}
          {/* How it works folded in as the compact numbered list */}
          <div className="lg:col-span-3 mt-4 pt-8 border-t border-border grid gap-8 md:grid-cols-3">
            {howItWorks.map(({ step, icon: Icon, title, text }) => (
              <div key={step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-display font-bold">
                  {step}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's built for */}
      <section className="bg-secondary">
        <div className="container py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-9">
            <div>
              <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-primary mb-2">
                Who it's built for
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-secondary-foreground">
                One platform, three vantage points
              </h2>
            </div>
            <p className="text-sm text-secondary-foreground/80 font-body max-w-md">
              Each sees the same facts from the angle that matters to them.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {whoFor.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground font-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot */}
      <section id="pilot" className="bg-secondary scroll-mt-20">
        <div className="container py-12 md:py-16">
          <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-primary mb-2">Pilot</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-secondary-foreground mb-5">
            Starting in 5 LGAs
          </h2>
          <div className="flex flex-wrap gap-2">
            {pilotLgas.map((l) => (
              <span key={l} className="bg-card border border-border rounded-full px-4 py-1.5 text-sm font-display font-semibold text-foreground">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container py-12 md:py-16">
        <p className="text-sm text-muted-foreground font-body max-w-2xl">
          Data is handled with the consent of the relevant authorities and shared only with authorised officials.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="container pb-12 md:pb-16 scroll-mt-20">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-6">Frequently asked questions</h2>
        <div className="divide-y divide-border border-y border-border max-w-3xl">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="cursor-pointer list-none font-display font-semibold text-foreground flex justify-between items-center">
                {q}
                <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground font-body">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container py-12 md:py-16">
        <div className="rounded-2xl bg-primary text-primary-foreground px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Want a short briefing for your office?</h2>
            <p className="text-primary-foreground/85 font-body max-w-xl">
              Write to us at {CONTACT_EMAIL} or find us on LinkedIn {LINKEDIN_HANDLE}.
            </p>
          </div>
          <Button asChild size="lg" className="bg-accent text-primary hover:bg-accent/90 font-display font-semibold shrink-0">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Request%20a%20briefing`}>
              Request a briefing
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>
    </main>

    <footer className="border-t border-border bg-card">
      <div className="container py-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <p className="text-sm text-muted-foreground font-body max-w-sm">
            Built for education officials, LGA secretaries, school administrators & partners in Kebbi State.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-foreground hover:text-accent transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-secondary-foreground" />
            </span>
            {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-foreground hover:text-accent transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Linkedin className="w-4 h-4 text-secondary-foreground" />
            </span>
            LinkedIn {LINKEDIN_HANDLE}
          </a>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-display font-semibold text-primary hover:text-accent transition-colors"
          >
            Clarity for education reform
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="border-t border-border pt-3 space-y-1">
          <p className="text-xs text-muted-foreground font-body">{DATA_SOURCE}</p>
          <p className="text-xs text-muted-foreground font-body">
            Access to the dashboard is restricted to authorised officials. Sign in or request an account to continue.
          </p>
        </div>
      </div>
    </footer>
    <ChatWidget />
  </div>
);

export default Landing;
