import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, MapPin, School, Sparkles, Users } from "lucide-react";
import kebbiSeal from "@/assets/kebbi-seal.jpg";
import kebbiMap from "@/assets/kebbi-map.jpg";
import { Button } from "@/components/ui/button";
import { DATA_SOURCE } from "@/data/kebbiData";

const highlights = [
  {
    icon: School,
    title: "21 LGAs, one picture",
    text: "Schools, learners and teachers for every local government area in Kebbi State, drawn from the DNEMIS Annual School Census.",
  },
  {
    icon: BarChart3,
    title: "Gap intelligence",
    text: "See where the shortages sit — urgency ratings, learner–teacher ratios and estimated subject gaps at a glance.",
  },
  {
    icon: Users,
    title: "Deployment that adds up",
    text: "Track whether posted teachers are actually in classrooms or sitting in administrative offices.",
  },
  {
    icon: Sparkles,
    title: "AI recommendations",
    text: "Priority-ranked actions for the LGAs that need teachers most, generated from the gap data.",
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
            EduMap Kebbi turns official education census data into clear, decision-ready intelligence for the
            Ministry, LGA secretaries and school administrators.
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
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
        <div className="container py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-display font-bold text-3xl text-secondary-foreground">3,463</p>
            <p className="text-sm text-secondary-foreground/80 font-body">Schools</p>
          </div>
          <div>
            <p className="font-display font-bold text-3xl text-secondary-foreground">1,023,860</p>
            <p className="text-sm text-secondary-foreground/80 font-body">Learners</p>
          </div>
          <div>
            <p className="font-display font-bold text-3xl text-secondary-foreground">18,491</p>
            <p className="text-sm text-secondary-foreground/80 font-body">Teachers</p>
          </div>
        </div>
      </section>
    </main>

    <footer className="border-t border-border bg-card">
      <div className="container py-4 space-y-1">
        <p className="text-xs text-muted-foreground font-body">{DATA_SOURCE}</p>
        <p className="text-xs text-muted-foreground font-body">
          Access to the dashboard is restricted to authorised officials. Sign in or request an account to continue.
        </p>
      </div>
    </footer>
  </div>
);

export default Landing;
