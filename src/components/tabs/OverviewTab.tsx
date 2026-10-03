import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  dnemisLgaData, dnemisTotals, DNEMIS_LTR_STANDARD, DNEMIS_NOTE, statewideDeployment,
} from "@/data/kebbiData";
import { ChevronDown, ChevronUp, Scale } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const gapColour = (urgency: string) => {
  if (urgency === "Critical") return "hsl(var(--destructive))";
  if (urgency === "High") return "hsl(var(--warning))";
  if (urgency === "Moderate") return "hsl(var(--accent))";
  return "hsl(var(--secondary))";
};

const MetricCard = ({ title, value, note, border }: { title: string; value: number; note: string; border: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className={`bg-card rounded-md p-4 shadow-sm border-l-4 ${border} transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}>
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-display font-bold mt-1 text-card-foreground">{count.toLocaleString()}</p>
      <p className="text-xs mt-2 text-muted-foreground font-body">{note}</p>
    </div>
  );
};

const OverviewTab = () => {
  const [dnemisOpen, setDnemisOpen] = useState(false);
  const gapChartData = [...dnemisLgaData].sort((a, b) => b.ltr - a.ltr).map(lga => ({ name: lga.lga, ltr: lga.ltr, urgency: lga.urgency }));
  const topTeachers = [...dnemisLgaData].sort((a, b) => b.teachers - a.teachers).slice(0, 8).map(lga => ({ name: lga.lga, teachers: lga.teachers }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Teachers Deployed" value={dnemisTotals.teachers} note="DNEMIS Annual School Census 2024" border="border-l-secondary" />
        <MetricCard title="LGAs at Critical Shortage" value={dnemisTotals.criticalLgas} note="DNEMIS urgency classification" border="border-l-destructive" />
        <MetricCard title="Subject Gaps Identified" value={dnemisTotals.subjectGaps} note="Estimated Maths, English and Science shortfalls" border="border-l-warning" />
        <MetricCard title="Teachers Misdeployed" value={statewideDeployment.admin} note="Estimated in admin or area offices" border="border-l-accent" />
      </div>

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
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Top 8 LGAs by Teacher Count</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topTeachers} layout="vertical" margin={{ left: 55 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={85} />
              <Tooltip formatter={(value: number) => [value.toLocaleString(), "Teachers"]} />
              <Bar dataKey="teachers" fill="hsl(var(--secondary))" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;