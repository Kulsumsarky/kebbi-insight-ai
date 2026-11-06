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
  Heart,
  HandHeart,
  FileText,
  Lock,
} from "lucide-react";
import logo from "@/assets/edumap-logo.png";
import nigeriaMap from "@/assets/nigeria-kebbi-map.png";
import logoReversed from "@/assets/edumap-logo-reversed.png";
import { Button } from "@/components/ui/button";
import { DATA_SOURCE } from "@/data/kebbiData";
import ChatWidget from "@/components/ChatWidget";
import { PUBLIC_DEMO_MODE } from "@/config";

const CONTACT_EMAIL = "hello@edumap.com.ng";
const LINKEDIN_HANDLE = "@edumap";
const LINKEDIN_URL = "https://www.linkedin.com/company/edumap";

// Opens the chat panel on the contact form, so the request is saved and appears on the admin page.
const openBriefing = () => window.dispatchEvent(new CustomEvent("edumap:open-chat", { detail: "contact" }));

const problemPoints = [
  { icon: MapPin, title: "Where teachers are actually deployed" },
  { icon: BarChart3, title: "Which subjects are short, LGA by LGA" },
  { icon: CheckCircle2, title: "Current evidence" },
];

const pilotLgas = ["Birnin Kebbi", "Kalgo", "Argungu", "Gwandu", "Aliero"];

const faqs = [
  { q: "What is EduMap?", a: "A platform that turns school-level teacher data into clear evidence for planning and posting decisions in Kebbi State." },
  { q: "Where does the data come from?", a: "It is built on DNEMIS data, and school-level records collected with local government education authorities." },
  {
    q: "Who can see it?",
    a: PUBLIC_DEMO_MODE
      ? "For a short feedback window, a preview of the dashboard is open to everyone. After that, access is for authorised officials only. Data is handled with the consent of the relevant authorities."
      : "Only authorised officials. Data is handled with the consent of the relevant authorities.",
  },
  { q: "Is it free during the pilot?", a: "We will confirm pilot terms with your office during a short briefing. Write to us to arrange one." },
  { q: "How do LGEAs take part?", a: "We begin with five pilot LGAs and work with their education authorities to collect and verify school-level data." },
  { q: "Is our data safe?", a: "Data is held securely and shared only with authorised officials, with the consent of the relevant authorities." },
  { q: "How do I contact you?", a: "Email hello@edumap.com.ng or message us on LinkedIn at @edumap." },
];

const whatItDoes = [
  {
    icon: School,
    title: "Maps every LGA in one view",
    text: "State-level figures for all 21 LGAs, with school-level detail growing as the pilot expands.",
  },
  {
    icon: BarChart3,
    title: "Pinpoints where the gaps are",
    text: "Urgency ratings, learner–teacher ratios and subject shortfalls show which areas are under-resourced, and how badly.",
  },
  {
    icon: Users,
    title: "Checks whether deployment adds up",
    text: "Separates teachers actually in classrooms from those in administrative offices and those whose posting is not yet verified.",
  },
  {
    icon: Target,
    title: "Shows where to act first",
    text: "A priority-ordered list of recommended actions, so limited recruitment capacity goes where the need is greatest.",
  },
  {
    icon: FileText,
    title: "Ready-to-share summaries",
    text: "Clear written summaries you can circulate to the Ministry, LGA secretaries and partners.",
  },
];

const howItWorks = [
  {
    step: "1",
    icon: ClipboardList,
    title: "Collect and verify",
    text: "We work with local education authorities to gather school-level teacher data, checked against official records.",
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
    text: "Leave with a defensible shortlist of where to post, recruit or intervene, with a written summary to back it.",
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

const helpWays = [
  { icon: Linkedin, title: "Follow", text: "linkedin.com/company/edumap", href: LINKEDIN_URL },
  { icon: Heart, title: "Volunteer", text: "Give your time, skills or local knowledge.", href: `mailto:${CONTACT_EMAIL}?subject=Volunteering%20with%20EduMap` },
  { icon: HandHeart, title: "Support", text: "Partner with us or back the pilot in any way you can.", href: `mailto:${CONTACT_EMAIL}?subject=Supporting%20EduMap` },
];

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-[11px] font-body font-bold uppercase tracking-[0.18em] mb-3 ${light ? "text-[#E9A24F]" : "text-[#C26F1A]"}`}>
    {children}
  </p>
);

const Landing = () => (
  <div className="min-h-screen bg-[#F7F5EE] flex flex-col">
    {/* Top bar */}
    <header className="bg-[#F7F5EE]/95 border-b border-[#DDE8DE] sticky top-0 z-30 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <a href="#top" aria-label="EduMap home">
          <img src={logo} alt="EduMap" className="h-9 md:h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-body font-medium text-[#123524]/70">
          <a href="#what" className="hover:text-[#123524] transition-colors">What it does</a>
          <a href="#pilot" className="hover:text-[#123524] transition-colors">Pilot</a>
          <a href="#faq" className="hover:text-[#123524] transition-colors">FAQ</a>
        </nav>
      </div>
    </header>

    <main className="flex-1" id="top">
      {/* Hero */}
      <section className="border-b border-[#DDE8DE]">
        <div className="container py-12 md:py-20 grid gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <div>
            <Eyebrow>Teacher deployment and gap intelligence</Eyebrow>
            <h1 className="font-display font-bold text-4xl md:text-5xl xl:text-6xl leading-[1.08] tracking-tight text-[#123524] mb-5">
              The right teacher in the right <span className="text-[#1B6E36]">classroom.</span>
            </h1>
            <p className="font-body text-base md:text-lg text-[#123524]/70 max-w-lg mb-4 leading-relaxed">
              EduMap shows education officials where teachers are needed, LGA by LGA, so that every school is staffed fairly.
            </p>
            <p className="font-display font-semibold text-[#123524] text-sm mb-7">Map gaps. Align action. Strengthen schools.</p>
            <div className="flex flex-wrap items-center gap-3">
              {PUBLIC_DEMO_MODE && (
                <Button asChild size="lg" className="bg-[#123524] text-white hover:bg-[#1B6E36] font-display font-semibold rounded-full px-7">
                  <Link to="/dashboard">
                    Explore the dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="bg-white border-2 border-[#DDE8DE] text-[#123524] hover:bg-[#EAF2EA] hover:text-[#123524] font-display font-semibold rounded-full px-7">
                <Link to="/auth">
                  <Lock className="w-4 h-4 mr-2 text-[#1B6E36]" />
                  Official sign in
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-[#123524]/60 font-body max-w-md">
              {PUBLIC_DEMO_MODE ? (
                <>Open preview for feedback. Figures marked (est.) are estimates. Full access is for approved officials with an account, behind a secure login.</>
              ) : (
                <>Access is for approved officials with an account, behind a secure login.</>
              )}
            </p>
          </div>

          {/* Map card, kept separate from the text so nothing overlaps */}
          <div>
            <div className="relative rounded-3xl border-2 border-[#DDE8DE] bg-white p-6 md:p-8">
              <div className="relative mx-auto w-full max-w-sm aspect-square">
                <img src={nigeriaMap} alt="Map of Nigeria with Kebbi State highlighted in gold" width={1024} height={1024} className="w-full h-full object-contain" />
                <div className="absolute left-[15.5%] top-[27%] -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 rounded-full bg-[#E9A24F]/50 animate-ping" />
                  <img src="/favicon.svg" alt="" className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg bg-white" />
                </div>
                <span className="absolute left-[15.5%] top-[40%] -translate-x-1/2 bg-[#123524] text-white text-[10px] font-display font-semibold px-2.5 py-0.5 rounded-full shadow">
                  Kebbi State
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white border-y border-[#DDE8DE]">
        <div className="container py-14 md:py-20">
          <div className="max-w-2xl mb-10">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-3">
              Teacher gaps are hard to see without current school-level data
            </h2>
            <p className="text-[#123524]/70 font-body">
              Planning and posting decisions are only as good as the evidence behind them. EduMap brings it into one place.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {problemPoints.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl bg-[#EAF2EA] p-5">
                <span className="w-11 h-11 rounded-full bg-[#123524] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#E9A24F]" />
                </span>
                <p className="font-display font-semibold text-[#123524]">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What EduMap does */}
      <section id="what" className="container py-14 md:py-20 scroll-mt-20">
        <Eyebrow>What EduMap does</Eyebrow>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-10 max-w-xl">
          Teacher gaps in every LGA, in one place
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whatItDoes.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group bg-white border-2 border-[#DDE8DE] rounded-2xl p-6 hover:border-[#E9A24F] transition-colors">
              <Icon className="w-6 h-6 text-[#1B6E36] mb-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              <h3 className="font-display font-semibold text-[#123524] mb-2">{title}</h3>
              <p className="text-sm text-[#123524]/70 font-body leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-[#DDE8DE] max-w-xl">
          <Eyebrow>How it works</Eyebrow>
          <ol className="relative">
            {howItWorks.map(({ step, title, text }, i) => (
              <li key={step} className={`relative flex gap-5 ${i < howItWorks.length - 1 ? "pb-9" : ""}`}>
                {i < howItWorks.length - 1 && (
                  <span aria-hidden className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-[#E9A24F]" />
                )}
                <div className="relative z-10 w-11 h-11 rounded-full bg-[#E9A24F] text-[#123524] flex items-center justify-center shrink-0 font-display font-bold">
                  {step}
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display font-semibold text-[#123524] mb-1">{title}</h3>
                  <p className="text-sm text-[#123524]/70 font-body leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it's built for */}
      <section className="bg-[#EAF2EA]">
        <div className="container py-14 md:py-20">
          <div>
            <div className="mb-9">
              <Eyebrow>Who it is built for</Eyebrow>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-2">One platform, three users</h2>
              <p className="text-sm text-[#123524]/70 font-body max-w-md">Everyone sees the same facts, each from their own point of view.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {whoFor.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                  <span className="w-11 h-11 rounded-full bg-[#123524] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#E9A24F]" />
                  </span>
                  <h3 className="font-display font-semibold text-[#123524] mb-2">{title}</h3>
                  <p className="text-sm text-[#123524]/70 font-body leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pilot */}
      <section id="pilot" className="container py-14 md:py-20 scroll-mt-20">
        <Eyebrow>Pilot</Eyebrow>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-4">Starting in 5 LGAs</h2>
        <p className="text-[#123524]/70 font-body max-w-2xl mb-6">
          In these LGAs we work with education authorities to collect and verify school-level data, so officials see current figures for their own area.
        </p>
        <div className="flex flex-wrap gap-2">
          {pilotLgas.map((l) => (
            <span key={l} className="bg-white border-2 border-[#DDE8DE] rounded-full px-5 py-2 text-sm font-display font-semibold text-[#123524]">
              {l}
            </span>
          ))}
        </div>
        <p className="mt-8 text-sm text-[#123524]/60 font-body max-w-2xl">
          {PUBLIC_DEMO_MODE
            ? "A preview is open for a short feedback window. Full access is for authorised officials, and data is handled with the consent of the relevant authorities."
            : "Data is handled with the consent of the relevant authorities and shared only with authorised officials."}
        </p>
      </section>

      {/* Help us get there */}
      <section className="bg-white border-y border-[#DDE8DE]">
        <div className="container py-14 md:py-20">
          <Eyebrow>Join us</Eyebrow>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-9">Help us get there</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {helpWays.map(({ icon: Icon, title, text, href }) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="group rounded-2xl border-2 border-[#DDE8DE] bg-[#F7F5EE] p-6 hover:border-[#E9A24F] transition-colors">
                <Icon className="w-6 h-6 text-[#1B6E36] mb-4" />
                <h3 className="font-display font-semibold text-[#1B6E36] text-lg mb-1.5">{title}</h3>
                <p className="text-sm text-[#123524]/70 font-body leading-relaxed">{text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-14 md:py-20 scroll-mt-20">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-[#123524] mb-6">Frequently asked questions</h2>
        <div className="divide-y divide-[#DDE8DE] border-y border-[#DDE8DE] max-w-3xl">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="cursor-pointer list-none font-display font-semibold text-[#123524] flex justify-between items-center">
                {q}
                <span className="text-[#C26F1A] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-2 text-sm text-[#123524]/70 font-body leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container pb-16">
        <div className="rounded-3xl bg-[#123524] text-white px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">Want a short briefing for your office?</h2>
            <p className="text-[#CFE0D1] font-body max-w-xl">
              Write to us at {CONTACT_EMAIL}, use the chat button at the bottom right, or find us on LinkedIn {LINKEDIN_HANDLE}.
            </p>
          </div>
          <Button size="lg" onClick={openBriefing} className="bg-[#E9A24F] text-[#123524] hover:bg-[#F0B36B] font-display font-semibold rounded-full px-7 shrink-0">
            Request a briefing
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </main>

    <footer className="bg-[#123524] text-white">
      <div className="container py-9 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <img src={logoReversed} alt="EduMap" className="h-9 w-auto mb-3" />
            <p className="text-sm text-[#E9A24F] font-display font-semibold">The right teacher in the right classroom.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-body">
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 hover:text-[#E9A24F] transition-colors">
              <Mail className="w-4 h-4" /> {CONTACT_EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#E9A24F] transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn {LINKEDIN_HANDLE}
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 pt-4 space-y-1 text-xs text-[#CFE0D1]/80 font-body">
          <p>{DATA_SOURCE}</p>
          <p>
            {PUBLIC_DEMO_MODE
              ? `A preview of the dashboard is open for a short feedback window. For full access, email ${CONTACT_EMAIL}.`
              : `Access to the dashboard is restricted to authorised officials. To request an account, email ${CONTACT_EMAIL}.`}
          </p>
        </div>
      </div>
    </footer>
    <ChatWidget />
  </div>
);

export default Landing;
