import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { dnemisLgaData, DNEMIS_LTR_STANDARD, DATA_SOURCE_SHORT } from "@/data/kebbiData";

const tileColour = (urgency: string) => {
  if (urgency === "Critical") return "hsl(var(--destructive))";
  if (urgency === "High") return "hsl(var(--warning))";
  if (urgency === "Moderate") return "hsl(var(--accent))";
  return "hsl(var(--secondary))";
};

const perThousand = (r: { teachers: number; learners: number }) => Math.round((r.teachers / r.learners) * 1000);

const legend = [
  ["Critical", "hsl(var(--destructive))"],
  ["High", "hsl(var(--warning))"],
  ["Moderate", "hsl(var(--accent))"],
  ["Lower", "hsl(var(--secondary))"],
] as const;

const HeatMapTab = () => {
  const rows = [...dnemisLgaData].sort((a, b) => b.ltr - a.ltr);
  const density = dnemisLgaData.map(r => ({ name: r.lga, density: perThousand(r), urgency: r.urgency })).sort((a, b) => b.density - a.density);
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h3 className="font-display font-semibold text-sm text-foreground">Learners per teacher, all 21 LGAs ({DATA_SOURCE_SHORT})</h3>
        <p className="text-xs text-muted-foreground font-body mt-1">
          Tiles are ordered from the most learners per teacher (red) to the fewest (green). The national standard is 1:{DNEMIS_LTR_STANDARD}.
        </p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {rows.map(r => (
          <div key={r.lga} className="rounded-md p-3 text-center text-white" style={{ backgroundColor: tileColour(r.urgency) }}>
            <p className="text-[10px] font-display font-bold leading-tight">{r.lga}</p>
            <p className="text-lg font-display font-bold">1:{Math.round(r.ltr)}</p>
            <p className="text-[9px] opacity-90">{perThousand(r)} per 1,000 learners</p>
            <p className="text-[9px] opacity-90">{r.teachers.toLocaleString()} teachers</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-xs font-body flex-wrap">
        {legend.map(([label, colour]) => (
          <span key={label} className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: colour }} />{label}</span>
        ))}
      </div>
      <div className="bg-card rounded-md p-4 shadow-sm">
        <h3 className="font-display font-semibold text-sm mb-1 text-card-foreground">LGA Density Ranking: Teachers per 1,000 Learners</h3>
        <p className="text-xs text-muted-foreground font-body mb-3">The standard of 1 teacher to {DNEMIS_LTR_STANDARD} learners is about {Math.round(1000 / DNEMIS_LTR_STANDARD)} teachers per 1,000.</p>
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={density} layout="vertical" margin={{ left: 60, right: 16 }}>
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} interval={0} />
            <Tooltip formatter={(v: number) => [v, "Teachers per 1,000 learners"]} />
            <Bar dataKey="density" radius={[0, 2, 2, 0]}>{density.map(d => <Cell key={d.name} fill={tileColour(d.urgency)} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeatMapTab;
