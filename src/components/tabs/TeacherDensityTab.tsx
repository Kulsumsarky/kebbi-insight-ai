import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { lgaData, senRows, statewide, teacherDensity, pupilTeacherRatio, PARTIAL_DATA_NOTE } from "@/data/kebbiData";
import { Info } from "lucide-react";
import PendingBadge from "@/components/PendingBadge";

const getDensityColor = (density: number) => {
  if (density >= 30) return "#0f4a1e";
  if (density >= 25) return "#1a6e2e";
  if (density >= 20) return "#4caf50";
  if (density >= 15) return "#e67e22";
  return "#d63031";
};

const TeacherDensityTab = () => {
  const tiles = lgaData.map(l => ({ name: l.name, density: teacherDensity(l), ratio: pupilTeacherRatio(l) }));
  const ranked = tiles
    .filter(t => t.density !== null)
    .sort((a, b) => (b.density as number) - (a.density as number))
    .map(t => ({ name: t.name, density: t.density as number }));

  const senRatio = Math.round(statewide.senLearners / statewide.senTeachers);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="font-display font-semibold text-sm mb-3 text-foreground">
          Teacher Density — Teachers per 1,000 Learners (KbSUBEB, March 2025)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {tiles.map(t =>
            t.density === null ? (
              <div
                key={t.name}
                className="rounded-md p-3 text-center bg-muted border border-dashed border-border"
              >
                <p className="text-[10px] font-display font-bold leading-tight text-muted-foreground">{t.name}</p>
                <p className="text-sm font-display font-bold text-muted-foreground mt-1">—</p>
                <p className="text-[9px] text-muted-foreground">Data pending</p>
              </div>
            ) : (
              <div
                key={t.name}
                className="rounded-md p-3 text-center text-primary-foreground"
                style={{ backgroundColor: getDensityColor(t.density) }}
              >
                <p className="text-[10px] font-display font-bold leading-tight">{t.name}</p>
                <p className="text-lg font-display font-bold">{t.density}</p>
                <p className="text-[9px] opacity-80">per 1,000 · 1:{t.ratio}</p>
              </div>
            ),
          )}
        </div>
        <div className="flex items-center gap-3 mt-3 text-xs font-body flex-wrap">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#0f4a1e" }} /> ≥30</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#1a6e2e" }} /> ≥25</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#4caf50" }} /> ≥20</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#e67e22" }} /> ≥15</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#d63031" }} /> {"<15"}</span>
          <PendingBadge label="Not yet reported" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">
            LGA Density Ranking ({ranked.length} LGAs with reported teacher records)
          </h3>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart data={ranked} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip formatter={(v: number) => [`${v} per 1,000 learners`, "Density"]} />
              <Bar dataKey="density" fill="#1a6e2e" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground font-body mt-2 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{PARTIAL_DATA_NOTE}</span>
          </p>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-sm text-card-foreground">
              Special Needs &amp; Non-Formal Education Staffing
            </h3>
            <span className="text-[10px] font-display font-semibold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">
              Special needs statewide: 1:{senRatio}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-3 py-2 font-display font-semibold">Programme</th>
                  <th className="px-3 py-2 font-display font-semibold">Level</th>
                  <th className="px-3 py-2 font-display font-semibold">Schools</th>
                  <th className="px-3 py-2 font-display font-semibold">Learners</th>
                  <th className="px-3 py-2 font-display font-semibold">Staff</th>
                  <th className="px-3 py-2 font-display font-semibold">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {senRows.map((s, i) => (
                  <tr key={`${s.programme}-${s.level}`} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-3 py-2 font-semibold">{s.programme}</td>
                    <td className="px-3 py-2">{s.level}</td>
                    <td className="px-3 py-2">{s.numSchools}</td>
                    <td className="px-3 py-2">{s.enrolmentTotal.toLocaleString()}</td>
                    <td className="px-3 py-2">{s.staffTotal}</td>
                    <td className="px-3 py-2 font-semibold">{s.pupilTeacherRatio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDensityTab;
