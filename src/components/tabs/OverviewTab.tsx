import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  lgaData,
  statewide,
  enrolmentTotal,
  reportedSchools,
  lgasWithSchoolData,
  reportedTeachers,
  lgasWithTeacherData,
  pupilTeacherRatio,
  DATA_SOURCE,
  PARTIAL_DATA_NOTE,
  DNEMIS_NOTE,
} from "@/data/kebbiData";
import { ChevronDown, ChevronUp, Info, Scale } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import PendingBadge from "@/components/PendingBadge";

const getGapColor = (gap: number) => {
  if (gap >= 400) return "#d63031";
  if (gap >= 200) return "#e67e22";
  if (gap >= 50) return "#c9a227";
  return "#1a6e2e";
};

const getGapLabel = (gap: number) => {
  if (gap >= 400) return "Critical";
  if (gap >= 200) return "High";
  if (gap >= 50) return "Moderate";
  return "Low";
};

const MetricCard = ({
  title,
  value,
  border,
  extra,
}: {
  title: string;
  value: number;
  border: string;
  extra?: React.ReactNode;
}) => {
  const { count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="bg-card rounded-md p-4 shadow-sm border-l-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]"
      style={{ borderLeftColor: border }}
    >
      <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-display font-bold mt-1 text-card-foreground">{count.toLocaleString()}</p>
      {extra}
    </div>
  );
};

const OverviewTab = () => {
  const [tableOpen, setTableOpen] = useState(false);
  const [dnemisOpen, setDnemisOpen] = useState(false);

  const senRatio = Math.round(statewide.senLearners / statewide.senTeachers);
  const stateRatio = Math.round(statewide.students / statewide.teachers);

  const gapChartData = [...lgaData]
    .sort((a, b) => b.teacherGap2024 - a.teacherGap2024)
    .map(l => ({ name: l.name, gap: l.teacherGap2024 }));

  const top8 = [...lgaData]
    .sort((a, b) => b.students - a.students)
    .slice(0, 8)
    .map(l => ({ name: l.name, learners: l.students }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Teachers Statewide"
          value={statewide.teachers}
          border="#1a6e2e"
          extra={
            <p className="text-xs mt-2 text-muted-foreground font-body">
              LGA records complete for {lgasWithTeacherData} of {lgaData.length} LGAs ({reportedTeachers.toLocaleString()} attributed)
            </p>
          }
        />
        <MetricCard
          title="Learners Enrolled"
          value={statewide.students}
          border="#0f4a1e"
          extra={
            <p className="text-xs mt-2 text-muted-foreground font-body">
              Pre-primary/primary + JSS, 2022–2023 · ratio 1:{stateRatio}
            </p>
          }
        />
        <MetricCard
          title="Teacher Gap (2024 Baseline)"
          value={statewide.teacherGap2024}
          border="#d63031"
          extra={<p className="text-xs mt-2 text-muted-foreground font-body">Shortfall against subject staffing norms</p>}
        />
        <MetricCard
          title="Special Needs Learners"
          value={statewide.senLearners}
          border="#c9a227"
          extra={
            <p className="text-xs mt-2 text-muted-foreground font-body">
              {statewide.senTeachers} specialist staff · ratio 1:{senRatio}
            </p>
          }
        />
      </div>

      {/* DNEMIS reconciliation note */}
      <div className="bg-card rounded-md shadow-sm border-l-4 border-l-accent">
        <button
          onClick={() => setDnemisOpen(!dnemisOpen)}
          className="w-full flex items-center justify-between gap-2 p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="flex items-center gap-2 font-display font-semibold text-sm text-card-foreground">
            <Scale className="w-4 h-4 text-accent" />
            Why these figures may differ from DNEMIS
          </span>
          {dnemisOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {dnemisOpen && (
          <div className="px-4 pb-4 animate-fade-in space-y-2">
            <p className="text-sm font-body text-muted-foreground">{DNEMIS_NOTE}</p>
            <p className="text-xs font-body text-muted-foreground">{DATA_SOURCE}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">
            Teacher Gap by LGA — 2024 Baseline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gapChartData} margin={{ left: 0, right: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [`${v} teachers`, "Gap"]} />
              <Bar dataKey="gap" radius={[2, 2, 0, 0]}>
                {gapChartData.map((entry, i) => (
                  <Cell key={i} fill={getGapColor(entry.gap)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Top 8 LGAs by Learner Enrolment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top8} layout="vertical" margin={{ left: 60 }}>
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
              <Bar dataKey="learners" fill="#1a6e2e" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-md shadow-sm">
        <button
          onClick={() => setTableOpen(!tableOpen)}
          className="w-full flex items-center justify-between p-4 font-display font-semibold text-sm text-card-foreground hover:bg-muted/50 transition-colors"
        >
          <span>All {lgaData.length} LGAs — Full Data Table</span>
          {tableOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {tableOpen && (
          <div className="overflow-x-auto animate-fade-in">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="bg-muted text-left">
                  <th className="px-4 py-2 font-display font-semibold">LGA</th>
                  <th className="px-4 py-2 font-display font-semibold">Schools</th>
                  <th className="px-4 py-2 font-display font-semibold">Teachers</th>
                  <th className="px-4 py-2 font-display font-semibold">Learners</th>
                  <th className="px-4 py-2 font-display font-semibold">Ratio (1:x)</th>
                  <th className="px-4 py-2 font-display font-semibold">Teacher Gap 2024</th>
                </tr>
              </thead>
              <tbody>
                {lgaData.map((lga, i) => {
                  const ratio = pupilTeacherRatio(lga);
                  return (
                    <tr key={lga.name} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="px-4 py-2 font-semibold">{lga.name}</td>
                      <td className="px-4 py-2">
                        {lga.totalSchools !== null ? lga.totalSchools.toLocaleString() : <PendingBadge />}
                      </td>
                      <td className="px-4 py-2">
                        {lga.teachers !== null ? lga.teachers.toLocaleString() : <PendingBadge />}
                      </td>
                      <td className="px-4 py-2">{lga.students.toLocaleString()}</td>
                      <td className="px-4 py-2">{ratio !== null ? `1:${ratio}` : <PendingBadge />}</td>
                      <td className="px-4 py-2">
                        <span
                          className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: getGapColor(lga.teacherGap2024) + "20",
                            color: getGapColor(lga.teacherGap2024),
                          }}
                        >
                          {getGapLabel(lga.teacherGap2024)} · {lga.teacherGap2024}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground font-body p-4 pt-3 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>
                Schools reported for {lgasWithSchoolData} of {lgaData.length} LGAs ({reportedSchools.toLocaleString()} schools);
                enrolment complete for all {lgaData.length} LGAs ({enrolmentTotal.toLocaleString()} learners). {PARTIAL_DATA_NOTE}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;
