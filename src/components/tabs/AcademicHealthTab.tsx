import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import {
  lgaData, curriculumData, subjects, getReadiness, subjectNeedTotals, subjectNeeds, subjectNeedYears,
} from "@/data/kebbiData";
import { Info } from "lucide-react";

const getCellColor = (val: string) => {
  if (val === "Yes") return "bg-secondary/20 text-secondary font-semibold";
  if (val === "Partial") return "bg-accent/20 text-accent font-semibold";
  return "bg-destructive/10 text-destructive font-semibold";
};

const topSubjects = subjectNeedTotals.slice(0, 4).map(s => s.subject);
const lineColours = ["#0f4a1e", "#1a6e2e", "#c9a227", "#d63031"];

const AcademicHealthTab = () => {
  const [subTab, setSubTab] = useState<"curriculum" | "subjects">("curriculum");

  const readinessData = lgaData.map(l => ({ name: l.name, readiness: getReadiness(l.name) }));

  const subjectTrend = subjectNeedYears.map(year => ({
    year,
    ...Object.fromEntries(
      topSubjects.map(s => [s, subjectNeeds.find(n => n.subject === s && n.year === year)?.additionalTeachersNeeded ?? 0]),
    ),
  }));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSubTab("curriculum")}
          className={`px-4 py-2 text-sm font-display font-semibold rounded-md transition-colors ${
            subTab === "curriculum" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Vocational &amp; Curriculum Readiness
        </button>
        <button
          onClick={() => setSubTab("subjects")}
          className={`px-4 py-2 text-sm font-display font-semibold rounded-md transition-colors ${
            subTab === "subjects" ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Subject Teacher Needs
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
            <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Vocational Readiness by LGA</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={readinessData} margin={{ left: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip formatter={(v: number) => [`${v}%`, "Readiness"]} />
                <Bar dataKey="readiness" fill="#1a6e2e" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground font-body mt-2 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                Trade-subject coverage is an indicative EduMap assessment for the 2025 curriculum rollout, not a KbSUBEB
                published figure. It will be replaced by verified school-level returns.
              </span>
            </p>
          </div>
        </div>
      )}

      {subTab === "subjects" && (
        <div className="space-y-4">
          <div className="bg-card rounded-md shadow-sm overflow-x-auto">
            <h3 className="font-display font-semibold text-sm p-4 pb-2 text-card-foreground">
              Additional Teachers Needed by Subject (2025–2029)
            </h3>
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-4 py-2 font-display font-semibold">Subject</th>
                  {subjectNeedYears.map(y => <th key={y} className="px-4 py-2 font-display font-semibold text-center">{y}</th>)}
                  <th className="px-4 py-2 font-display font-semibold text-center">5-year total</th>
                </tr>
              </thead>
              <tbody>
                {subjectNeedTotals.map((s, i) => (
                  <tr key={s.subject} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                    <td className="px-4 py-2 font-semibold">{s.subject}</td>
                    {subjectNeedYears.map(y => (
                      <td key={y} className="px-4 py-2 text-center">
                        {subjectNeeds.find(n => n.subject === s.subject && n.year === y)?.additionalTeachersNeeded ?? 0}
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center font-display font-bold">{s.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-card rounded-md p-4 shadow-sm">
            <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">
              Highest-Demand Subjects, 2025–2029
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subjectTrend}>
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                {topSubjects.map((s, i) => (
                  <Line key={s} type="monotone" dataKey={s} stroke={lineColours[i]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicHealthTab;
