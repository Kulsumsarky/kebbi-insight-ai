import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { lgaData } from "@/data/kebbiData";

const getDensityColor = (density: number) => {
  if (density >= 18) return "#0f4a1e";
  if (density >= 14) return "#1a6e2e";
  if (density >= 10) return "#4caf50";
  if (density >= 7) return "#e67e22";
  return "#d63031";
};

const getSenStatus = (ratio: number) => {
  if (ratio > 50) return { label: "Critical", color: "#d63031" };
  if (ratio > 25) return { label: "High", color: "#e67e22" };
  return { label: "OK", color: "#1a6e2e" };
};

const TeacherDensityTab = () => {
  const tiles = lgaData.map(l => ({
    name: l.name,
    density: Math.round((l.teachers / l.students) * 1000),
  }));

  const ranked = [...tiles].sort((a, b) => b.density - a.density);
  const senTable = lgaData.map(l => ({
    name: l.name,
    senTeachers: l.senTeachers,
    disabled: l.disabledStudents,
    ratio: Math.round(l.disabledStudents / l.senTeachers),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display font-semibold text-sm mb-3 text-foreground">Teacher Density Heatmap — Teachers per 1,000 Students</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {tiles.map(t => (
            <div
              key={t.name}
              className="rounded-md p-3 text-center"
              style={{ backgroundColor: getDensityColor(t.density), color: t.density >= 7 ? "#fff" : "#fff" }}
            >
              <p className="text-[10px] font-display font-bold leading-tight">{t.name}</p>
              <p className="text-lg font-display font-bold">{t.density}</p>
              <p className="text-[9px] opacity-80">per 1,000</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3 text-xs font-body">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#0f4a1e" }} /> ≥18</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#1a6e2e" }} /> ≥14</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#4caf50" }} /> ≥10</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#e67e22" }} /> ≥7</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded" style={{ backgroundColor: "#d63031" }} /> {"<7"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">LGA Density Ranking</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={ranked} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Bar dataKey="density" fill="#1a6e2e" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-sm text-card-foreground">SEN Teacher Ratio by LGA</h3>
            <span className="text-[10px] font-display font-semibold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">Recommended max: 1:25</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-3 py-2 font-display font-semibold">LGA</th>
                  <th className="px-3 py-2 font-display font-semibold">SEN Teachers</th>
                  <th className="px-3 py-2 font-display font-semibold">Disabled Students</th>
                  <th className="px-3 py-2 font-display font-semibold">Ratio</th>
                  <th className="px-3 py-2 font-display font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {senTable.map((s, i) => {
                  const status = getSenStatus(s.ratio);
                  return (
                    <tr key={s.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="px-3 py-2 font-semibold">{s.name}</td>
                      <td className="px-3 py-2">{s.senTeachers}</td>
                      <td className="px-3 py-2">{s.disabled}</td>
                      <td className="px-3 py-2">1:{s.ratio}</td>
                      <td className="px-3 py-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: status.color + "20", color: status.color }}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDensityTab;
