import { dnemisLgaData, DNEMIS_LTR_STANDARD, DATA_SOURCE_SHORT } from "@/data/kebbiData";

const tileColour = (urgency: string) => {
  if (urgency === "Critical") return "hsl(var(--destructive))";
  if (urgency === "High") return "hsl(var(--warning))";
  if (urgency === "Moderate") return "hsl(var(--accent))";
  return "hsl(var(--secondary))";
};

const legend = [
  ["Critical", "hsl(var(--destructive))"],
  ["High", "hsl(var(--warning))"],
  ["Moderate", "hsl(var(--accent))"],
  ["Lower", "hsl(var(--secondary))"],
] as const;

const HeatMapTab = () => {
  const rows = [...dnemisLgaData].sort((a, b) => b.ltr - a.ltr);
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
            <p className="text-[9px] opacity-90">{r.teachers.toLocaleString()} teachers</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-xs font-body flex-wrap">
        {legend.map(([label, colour]) => (
          <span key={label} className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: colour }} />{label}</span>
        ))}
      </div>
    </div>
  );
};

export default HeatMapTab;
