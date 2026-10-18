import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  dnemisLgaData, dnemisTotals, DNEMIS_LTR_STANDARD, DNEMIS_NOTE, DATA_SOURCE_SHORT, statewideDeployment,
} from "@/data/kebbiData";
import { ChevronDown, ChevronUp, Scale } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import CriticalLgaCards from "@/components/CriticalLgaCards";
import ExplainCard from "@/components/ExplainCard";

const gapColour = (urgency: string) => {
  if (urgency === "Critical") return "hsl(var(--destructive))";
  if (urgency === "High") return "hsl(var(--warning))";
  if (urgency === "Moderate") return "hsl(var(--accent))";
  return "hsl(var(--secondary))";
};

const MetricCard = ({ title, value, note, border, explain }: { title: string; value: number; note: string; border: string; explain: { label: string; value?: string; explain: string }[] }) => {
  const { count, ref } = useCountUp(value);
  return (
    <ExplainCard
      className={`bg-card rounded-md p-4 shadow-sm border-l-4 ${border}`}
      title={`${title}: what this number means`}
      description="Select any card on this dashboard to see how its number is worked out."
      rows={explain}
    >
      <div ref={ref}>
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-display font-bold mt-1 text-card-foreground">{count.toLocaleString()}</p>
        <p className="text-xs mt-2 text-muted-foreground font-body">{note}</p>
      </div>
    </ExplainCard>
  );
};

const OverviewTab = () => {
  const [dnemisOpen, setDnemisOpen] = useState(false);
  const gapChartData = [...dnemisLgaData].sort((a, b) => b.ltr - a.ltr).map(lga => ({ name: lga.lga, ltr: lga.ltr, urgency: lga.urgency }));
  const topTeachers = [...dnemisLgaData]
    .map(lga => ({ name: lga.lga, teachers: Math.max(0, Math.ceil(lga.learners / DNEMIS_LTR_STANDARD) - lga.teachers) }))
    .sort((a, b) => b.teachers - a.teachers)
    .slice(0, 8);
  const above = dnemisLgaData.filter(l => l.ltr > DNEMIS_LTR_STANDARD).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm font-body text-foreground bg-card rounded-md p-4 shadow-sm border-l-4 border-l-primary">
        {above} of {dnemisLgaData.length} LGAs have more than {DNEMIS_LTR_STANDARD} learners per teacher. {dnemisTotals.criticalLgas} are at critical shortage.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Teachers Deployed" value={dnemisTotals.teachers} note="DNEMIS Annual School Census, 2024 data" border="border-l-secondary" explain={[
          { label: "What it counts", value: dnemisTotals.teachers.toLocaleString(), explain: `All teachers recorded in the ${DATA_SOURCE_SHORT} across the ${dnemisLgaData.length} LGAs of Kebbi State, added together.` },
          { label: "What it does not tell you", explain: "It is a head count from census totals. It does not say which school each teacher is in, or what subject they teach." },
        ]} />
        <MetricCard title="LGAs at Critical Shortage" value={dnemisTotals.criticalLgas} note="DNEMIS urgency classification" border="border-l-destructive" explain={[
          { label: "How an LGA becomes Critical", value: `${dnemisTotals.criticalLgas} of ${dnemisLgaData.length}`, explain: `EduMap compares learners per teacher with the standard of 1:${DNEMIS_LTR_STANDARD}. LGAs with the highest ratios are rated Critical, then High, Moderate and Lower.` },
          { label: "Which ones", explain: `${dnemisLgaData.filter(r => r.urgency === "Critical").map(r => r.lga).join(", ")}. Select any of the cards below to see each LGA's figures.` },
        ]} />
        <MetricCard title="Subject Gaps Identified" value={dnemisTotals.subjectGaps} note="Estimated Maths, English and Science shortfalls" border="border-l-warning" explain={[
          { label: "What it counts", value: `${dnemisTotals.subjectGaps.toLocaleString()} (est.)`, explain: `For each LGA, EduMap works out how many more teachers are needed to reach 1:${DNEMIS_LTR_STANDARD}, then adds the LGAs up.` },
          { label: "Why it is an estimate", explain: "The census does not list teachers by subject. EduMap splits the shortfall 36% Maths, 34% English and 30% Science. Real subject figures will replace this once schools report them." },
        ]} />
        <MetricCard title="Teachers in Admin Offices (est.)" value={statewideDeployment.admin} note="Estimate: posted to admin or area offices, not classrooms" border="border-l-accent" explain={[
          { label: "What it counts", value: `${statewideDeployment.admin.toLocaleString()} (est.)`, explain: "Teachers estimated to be posted to administrative or area offices instead of classrooms." },
          { label: "Why it is an estimate", explain: "The census gives LGA totals only. EduMap assumes about 8 to 12% of teachers are in offices, adjusted by how severe the shortage is. School-level posting records are needed to confirm it." },
        ]} />
      </div>

      <CriticalLgaCards />

      <div className="bg-card rounded-md shadow-sm border-l-4 border-l-accent">
        <button onClick={() => setDnemisOpen(!dnemisOpen)} className="w-full flex items-center justify-between gap-2 p-4 text-left hover:bg-muted/50 transition-colors">
          <span className="flex items-center gap-2 font-display font-semibold text-sm text-card-foreground"><Scale className="w-4 h-4 text-accent" />About the DNEMIS figures</span>
          {dnemisOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {dnemisOpen && <p className="px-4 pb-4 text-sm font-body text-muted-foreground animate-fade-in">{DNEMIS_NOTE}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Gap Severity by LGA — DNEMIS 2024 LTR</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={gapChartData} margin={{ left: 0, right: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={85} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(value: number) => [`1:${value.toFixed(1)}`, `LTR (standard 1:${DNEMIS_LTR_STANDARD})`]} />
              <Bar dataKey="ltr" radius={[2, 2, 0, 0]}>{gapChartData.map(entry => <Cell key={entry.name} fill={gapColour(entry.urgency)} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Extra Teachers Needed to Reach 1:35 (Top 8 LGAs)</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topTeachers} layout="vertical" margin={{ left: 55 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={85} />
              <Tooltip formatter={(value: number) => [value.toLocaleString(), "More teachers needed"]} />
              <Bar dataKey="teachers" fill="hsl(var(--secondary))" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;