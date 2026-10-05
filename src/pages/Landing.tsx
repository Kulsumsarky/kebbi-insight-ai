import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardList,
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
import kebbiMap from "@/assets/kebbi-map.jpg";
import { Button } from "@/components/ui/button";
import { DATA_SOURCE } from "@/data/kebbiData";

const CONTACT_EMAIL = "edumapng.kebbi@gmail.com";
const LINKEDIN_HANDLE = "@edumapng";
const LINKEDIN_URL = "https://www.linkedin.com/in/edumapng";

const whatItDoes = [
  {
    icon: School,
    title: "Maps every LGA in one view",
    text: "Bring schools, learners and teachers for all 21 local government areas together in a single, consistent picture — no more reconciling separate spreadsheets.",
  },
  {
    icon: BarChart3,
    title: "Pinpoints where the gaps are",
    text: "Urgency ratings, learner–teacher ratios and estimated subject shortfalls show which areas are under-resourced, and how badly, before the next recruitment round.",
  },
  {
    icon: Users,
    title: "Checks whether deployment adds up",
    text: "Follows posted teachers through to the classroom, separating those actually teaching from those sitting in administrative offices and those unaccounted for.",
  },
  {
    icon: Target,
    title: "Ranks what to act on first",
    text: "Turns the analysis into a priority-ordered list of recommended actions, so limited recruitment capacity goes to the areas with the greatest need.",
  },
  {
    icon: Sparkles,
    title: "Writes the brief for you",
    text: "Generates a structured intelligence report from the current figures, ready to circulate to the Ministry, LGA secretaries and development partners.",
  },
];

const howItWorks = [
  {
    step: "1",
    icon: ClipboardList,
    title: "Load the official records",
    text: "Verified census and ministry data is imported once and held centrally, so every user is looking at the same numbers.",
  },
  {
    step: "2",
    icon: Search,
    title: "Filter and investigate",
    text: "Narrow by local government area, school type, location or subject, and compare areas side by side until the pattern is clear.",
  },
  {
    step: "3",
    icon: CheckCircle2,
    title: "Decide and act",
    text: "Leave with a defensible shortlist of where to post, recruit or intervene — and a written report to back the decision.",
  },
];

const whoFor = [
  {
    icon: Building2,
    title: "State Ministry & SUBEB",
    text: "Set recruitment priorities, track progress against targets, and brief partners with one authoritative view.",
  },
  {
    icon: MapPin,
    title: "LGA Secretaries",
    text: "See your own area's shortages and staffing gaps in context, and make the case for support with evidence.",
  },
  {
    icon: School,
    title: "School Administrators",
    text: "Understand how your school's coverage compares with neighbouring areas and what your staffing position means for learners.",
  },
];

const Landing = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <header className="bg-primary border-b-[3px] border-accent">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <img src={kebbiSeal} alt="Kebbi State Seal" className="w-[52px] h-[52px] rounded-full border-2 border-accent object-cover" />
        </div>
        <div className="text-center flex-1 px-4">
          <h1 className="text-primary-foreground font-display font-bold text-lg md:text-xl tracking-tight">EduMap Kebbi</h1>
          <p className="text-accent text-xs md:text-sm font-display">Teacher Deployment & Gap Intelligence — Kebbi State</p>
        </div>
        <div className="flex items-center gap-3">
          <img src={kebbiMap} alt="Kebbi State Map" className="w-[52px] h-[52px] rounded-md border-2 border-accent object-cover" />
        </div>
      </div>
    </header>

    <main className="flex-1">
      <section className="bg-primary text-primary-foreground">
        <div className="container py-14 md:py-20 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-body bg-secondary text-accent rounded-full px-3 py-1 mb-5">
            <MapPin className="w-3.5 h-3.5" />
            Kebbi State, Nigeria
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-4">
            Know exactly where Kebbi's teachers are — and where they're missing.
          </h2>
          <p className="text-primary-foreground/90 font-body text-base md:text-lg mb-8">
            EduMap Kebbi turns official education records into clear, decision-ready intelligence. It shows
            where teachers are deployed, where the gaps are worst, and what to do about it first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-accent text-primary hover:bg-accent/90 font-display font-semibold">
              <Link to="/dashboard">
                Access the Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-secondary hover:text-accent font-display">
              <Link to="/auth">Sign in / Register</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-9">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">What EduMap does</h2>
          <p className="text-muted-foreground font-body">
            Five jobs, done properly — from raw census records to a decision you can defend.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatItDoes.map(({ icon: Icon, title, text }) => (
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
      </section>

      <section className="bg-secondary">
        <div className="container py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center mb-9">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-secondary-foreground mb-3">How it works</h2>
            <p className="text-secondary-foreground/80 font-body">
              Three steps between a pile of census returns and a prioritised action list.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map(({ step, icon: Icon, title, text }) => (
              <div
                key={step}
                className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-display font-semibold text-accent uppercase tracking-wider mb-1">Step {step}</p>
                <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground font-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-9">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">Who it's built for</h2>
          <p className="text-muted-foreground font-body">
            One platform, three vantage points — each sees the same facts from the angle that matters to them.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {whoFor.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="border border-border border-l-4 border-l-accent bg-card rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground font-body">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">Ready to see your LGA?</h2>
          <p className="text-primary-foreground/85 font-body mb-7">
            Access is restricted to authorised officials. Sign in with your account, or register to request access.
          </p>
          <Button asChild size="lg" className="bg-accent text-primary hover:bg-accent/90 font-display font-semibold">
            <Link to="/dashboard">
              Access the Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>

    <footer className="border-t border-border bg-card">
      <div className="container py-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-foreground text-sm">Get in touch</p>
            <p className="text-xs text-muted-foreground font-body">
              Questions, access requests or partnership enquiries — we reply to every message.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm font-body text-foreground hover:text-accent transition-colors"
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
              className="inline-flex items-center gap-2 text-sm font-body text-foreground hover:text-accent transition-colors"
            >
              <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Linkedin className="w-4 h-4 text-secondary-foreground" />
              </span>
              LinkedIn {LINKEDIN_HANDLE}
            </a>
          </div>
        </div>
        <div className="border-t border-border pt-3 space-y-1">
          <p className="text-xs text-muted-foreground font-body">{DATA_SOURCE}</p>
          <p className="text-xs text-muted-foreground font-body">
            Access to the dashboard is restricted to authorised officials. Sign in or request an account to continue.
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Landing;
