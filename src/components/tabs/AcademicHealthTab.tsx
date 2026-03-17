import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { lgaData, curriculumData, subjects, getReadiness, performanceData } from "@/data/kebbiData";

const getCellColor = (val: string) => {
  if (val === "Yes") return "bg-secondary/20 text-secondary font-semibold";
  if (val === "Partial") return "bg-accent/20 text-accent font-semibold";
  return "bg-destructive/10 text-destructive font-semibold";
};

const AcademicHealthTab = () => {
  const [subTab, setSubTab] = useState<"curriculum" | "performance">("curriculum");

  const readinessData = lgaData.map(l => ({ name: l.name, readiness: getReadiness(l.name) }));

  const passRateData = performanceData.years.map((y, i) => ({
    year: y,
    ...Object.fromEntries(Object.entries(performanceData.lgaPass).map(([lga, vals]) => [lga, vals[i]])),
  }));

  const subjectData = performanceData.years.map((y, i) => ({
    year: y,
    ...Object.fromEntries(Object.entries(performanceData.subjectTrend).map(([sub, vals]) => [sub, vals[i]])),
  }));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setSubTab("curriculum")}
          className={`px-4 py-2 text-sm font-display font-semibold rounded-md transition-colors ${
            subTab === "curriculum" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Curriculum Coverage
        </button>
        <button
          onClick={() => setSubTab("performance")}
          className={`px-4 py-2 text-sm font-display font-semibold rounded-md transition-colors ${
            subTab === "performance" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Student Performance
        </button>
      </div>

      {subTab === "curriculum" && (
        <div className="space-y-4">
          <div className="bg-card rounded-md shadow-sm overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-3 py-2 font-display font-semibold">LGA</th>
                  {subjects.map(s => <th key={s} className="px-3 py-2 font-display font-semibold text-center">{s}</th>)}
                  <th className="px-3 py-2 font-display font-semibold text-center">Readiness %</th>
                </tr>
              </thead>
              <tbody>
                {lgaData.map((l, i) => (
                  <tr key={l.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-3 py-2 font-semibold">{l.name}</td>
                    {subjects.map(s => (
                      <td key={s} className="px-3 py-1 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded ${getCellColor(curriculumData[l.name]?.[s] || "No")}`}>
                          {curriculumData[l.name]?.[s] || "No"}
                        </span>
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center font-display font-bold">{getReadiness(l.name)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-card rounded-md p-4 shadow-sm">
            <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Curriculum Readiness by LGA</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={readinessData} margin={{ left: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="readiness" fill="#1a6e2e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {subTab === "performance" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card rounded-md p-4 shadow-sm">
              <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">WAEC/NECO Pass Rates — Top 4 LGAs</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={passRateData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[40, 80]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Birnin Kebbi" stroke="#0f4a1e" strokeWidth={2} />
                  <Line type="monotone" dataKey="Argungu" stroke="#1a6e2e" strokeWidth={2} />
                  <Line type="monotone" dataKey="Yauri" stroke="#c9a227" strokeWidth={2} />
                  <Line type="monotone" dataKey="Gwandu" stroke="#e67e22" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-md p-4 shadow-sm">
              <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Subject Trend 2022–2024</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={subjectData}>
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[20, 70]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Mathematics" stroke="#0f4a1e" strokeWidth={2} />
                  <Line type="monotone" dataKey="English" stroke="#1a6e2e" strokeWidth={2} />
                  <Line type="monotone" dataKey="Science" stroke="#c9a227" strokeWidth={2} />
                  <Line type="monotone" dataKey="Vocational" stroke="#d63031" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-md shadow-sm overflow-x-auto">
            <h3 className="font-display font-semibold text-sm p-4 pb-2 text-card-foreground">Declining LGAs — Action Needed</h3>
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-4 py-2 font-display font-semibold">LGA</th>
                  <th className="px-4 py-2 font-display font-semibold">2022%</th>
                  <th className="px-4 py-2 font-display font-semibold">2023%</th>
                  <th className="px-4 py-2 font-display font-semibold">2024%</th>
                  <th className="px-4 py-2 font-display font-semibold">Change</th>
                  <th className="px-4 py-2 font-display font-semibold">Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.decliningLGAs.map((d, i) => (
                  <tr key={d.lga} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-2 font-semibold">{d.lga}</td>
                    <td className="px-4 py-2">{d.y2022}%</td>
                    <td className="px-4 py-2">{d.y2023}%</td>
                    <td className="px-4 py-2">{d.y2024}%</td>
                    <td className="px-4 py-2 text-destructive font-semibold">{d.change}%</td>
                    <td className="px-4 py-2">{d.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicHealthTab;
