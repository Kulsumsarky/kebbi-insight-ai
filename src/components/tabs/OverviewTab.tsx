import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { lgaData, totalTeachers, totalSenTeachers, totalStudents, totalDisabled } from "@/data/kebbiData";
import { ChevronDown, ChevronUp } from "lucide-react";

const getGapColor = (gap: number) => {
  if (gap <= 25) return "#1a6e2e";
  if (gap <= 40) return "#c9a227";
  if (gap <= 55) return "#e67e22";
  return "#d63031";
};

const getGapLabel = (gap: number) => {
  if (gap <= 25) return "Low";
  if (gap <= 40) return "Moderate";
  if (gap <= 55) return "High";
  return "Critical";
};

const MetricCard = ({ title, value, border, extra }: { title: string; value: string | number; border: string; extra?: React.ReactNode }) => (
  <div className={`bg-card rounded-md p-4 shadow-sm border-l-4`} style={{ borderLeftColor: border }}>
    <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{title}</p>
    <p className="text-2xl font-display font-bold mt-1 text-card-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
    {extra}
  </div>
);

const ProgressBar = ({ pct, color }: { pct: number; color: string }) => (
  <div className="w-full h-2 bg-muted rounded-full mt-2">
    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
  </div>
);

const OverviewTab = () => {
  const [tableOpen, setTableOpen] = useState(false);
  const senRatio = Math.round(totalDisabled / totalSenTeachers);

  const gapChartData = lgaData.map(l => ({ name: l.name, gap: l.gapSeverity }));
  const top8 = [...lgaData].sort((a, b) => b.teachers - a.teachers).slice(0, 8).map(l => ({ name: l.name, teachers: l.teachers }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Licensed Teachers" value={totalTeachers.toLocaleString()} border="#1a6e2e" extra={<ProgressBar pct={79} color="#1a6e2e" />} />
        <MetricCard title="SEN-Certified Teachers" value={totalSenTeachers} border="#c9a227" extra={<ProgressBar pct={25} color="#c9a227" />} />
        <MetricCard title="Total Students" value={totalStudents.toLocaleString()} border="#1a6e2e" extra={<ProgressBar pct={68} color="#1a6e2e" />} />
        <MetricCard title="Students with Disabilities" value={totalDisabled.toLocaleString()} border="#d63031" extra={<p className="text-xs mt-2 text-muted-foreground">Current ratio {senRatio}:1</p>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Gap Severity by LGA (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gapChartData} margin={{ left: 0, right: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="gap" radius={[2, 2, 0, 0]}>
                {gapChartData.map((entry, i) => (
                  <Cell key={i} fill={getGapColor(entry.gap)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Top 8 LGAs by Teacher Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top8} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="teachers" fill="#1a6e2e" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-md shadow-sm">
        <button
          onClick={() => setTableOpen(!tableOpen)}
          className="w-full flex items-center justify-between p-4 font-display font-semibold text-sm text-card-foreground hover:bg-muted/50 transition-colors"
        >
          <span>All 21 LGAs — Full Data Table</span>
          {tableOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {tableOpen && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-4 py-2 font-display font-semibold">LGA</th>
                  <th className="px-4 py-2 font-display font-semibold">Schools</th>
                  <th className="px-4 py-2 font-display font-semibold">Teachers</th>
                  <th className="px-4 py-2 font-display font-semibold">SEN Teachers</th>
                  <th className="px-4 py-2 font-display font-semibold">Students</th>
                  <th className="px-4 py-2 font-display font-semibold">Ratio (1:x)</th>
                  <th className="px-4 py-2 font-display font-semibold">Gap Severity</th>
                </tr>
              </thead>
              <tbody>
                {lgaData.map((lga, i) => (
                  <tr key={lga.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-2 font-semibold">{lga.name}</td>
                    <td className="px-4 py-2">{lga.schools}</td>
                    <td className="px-4 py-2">{lga.teachers}</td>
                    <td className="px-4 py-2">{lga.senTeachers}</td>
                    <td className="px-4 py-2">{lga.students.toLocaleString()}</td>
                    <td className="px-4 py-2">1:{Math.round(lga.students / lga.teachers)}</td>
                    <td className="px-4 py-2">
                      <span
                        className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: getGapColor(lga.gapSeverity) + "20", color: getGapColor(lga.gapSeverity) }}
                      >
                        {getGapLabel(lga.gapSeverity)} {lga.gapSeverity}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
