import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, BarChart, Bar,
} from "recharts";
import {
  statewide, statewideGapByYear, subjectNeedTotals, costByYear, costGrandTotal, formatNaira,
  interventions, lgaData, DATA_SOURCE,
} from "@/data/kebbiData";
import { AlertTriangle, TrendingDown, Sparkles } from "lucide-react";

const AIPredictionsTab = () => {
  const [showModal, setShowModal] = useState(false);

  const gap2025 = statewideGapByYear.find(g => g.year === 2025)?.gap ?? 0;
  const gapAfter2025 = statewideGapByYear.filter(g => g.year >= 2026).reduce((s, g) => s + g.gap, 0);
  const senRatio = Math.round(statewide.senLearners / statewide.senTeachers);
  const criticalLgas = lgaData.filter(l => l.teacherGap2024 >= 200);
  const learnersAffected = criticalLgas.reduce((s, l) => s + l.students, 0);

  const gapData = statewideGapByYear.map(g => ({
    year: g.year,
    "Teacher gap": g.gap,
    Baseline: g.type === "baseline_at_time_of_report" ? g.gap : null,
  }));

  const subjectData = subjectNeedTotals.map(s => ({ name: s.subject, "2025 need": s.y2025, "5-year total": s.total }));
  const costData = costByYear.map(c => ({ year: c.year, "Cost (₦m)": Math.round(c.total / 1_000_000) }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert banners */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground">
          <strong>Critical:</strong> the March 2025 baseline records a shortfall of{" "}
          <strong>{statewide.teacherGap2024.toLocaleString()} teachers</strong> across Kebbi State, rising to{" "}
          <strong>{gap2025.toLocaleString()}</strong> in 2025. {criticalLgas.length} LGAs each short 200+ teachers —
          together serving <strong>{learnersAffected.toLocaleString()} learners</strong>.
        </p>
      </div>
      <div className="bg-accent/10 border border-accent/30 rounded-md p-4 flex items-start gap-3">
        <TrendingDown className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground">
          <strong>Warning:</strong> special needs staffing sits at <strong>1:{senRatio}</strong> statewide, and at{" "}
          <strong>1:125</strong> in special-needs primary schools — five times the 1:25 inclusive-education benchmark.
        </p>
      </div>

      {/* Forecast cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Teacher gap 2025 (projected)</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">{gap2025.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">
            plus {gapAfter2025.toLocaleString()} more across 2026–2029
          </p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Special needs ratio</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">1:{senRatio}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{statewide.senTeachers} specialist staff statewide</p>
        </div>
        <div className="bg-card rounded-md p-4 shadow-sm border-t-4 border-t-accent">
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">5-year recruitment plan cost</p>
          <p className="text-2xl font-display font-bold text-accent mt-1">{formatNaira(costGrandTotal)}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">2025–2029, all cost lines</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">
            Statewide Teacher Gap — 2024 baseline &amp; 2025–2029 projection
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={gapData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => v?.toLocaleString()} />
              <Legend />
              <Area type="monotone" dataKey="Teacher gap" stroke="#d63031" fill="#d63031" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-[11px] text-muted-foreground font-body mt-2">
            2024 is the baseline at time of report; 2025–2029 are KbSUBEB recruitment-plan projections. The sharp fall after
            2025 assumes the 2025 recruitment round is delivered in full.
          </p>
        </div>

        <div className="bg-card rounded-md p-4 shadow-sm">
          <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">Recruitment Plan Cost by Year (₦ millions)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}m`, "Cost"]} />
              <Legend />
              <Line type="monotone" dataKey="Cost (₦m)" stroke="#c9a227" strokeWidth={2} dot={{ fill: "#c9a227" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-md p-4 shadow-sm">
        <h3 className="font-display font-semibold text-sm mb-3 text-card-foreground">
          Additional Teachers Needed by Subject — 2025 priority
        </h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={subjectData} margin={{ left: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={110} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="2025 need" fill="#1a6e2e" radius={[2, 2, 0, 0]} />
            <Bar dataKey="5-year total" fill="#c9a227" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interventions table */}
      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        <h3 className="font-display font-semibold text-sm p-4 pb-2 text-card-foreground">AI Intervention Recommendations</h3>
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-4 py-2 font-display font-semibold">LGA</th>
              <th className="px-4 py-2 font-display font-semibold">Priority</th>
              <th className="px-4 py-2 font-display font-semibold">Gap Type</th>
              <th className="px-4 py-2 font-display font-semibold">Recommended Action</th>
              <th className="px-4 py-2 font-display font-semibold">Learners Affected</th>
            </tr>
          </thead>
          <tbody>
            {interventions.map((row, i) => (
              <tr key={row.lga} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-2 font-semibold">{row.lga}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    row.priority === "Critical" ? "bg-destructive/10 text-destructive" : "bg-accent/20 text-accent"
                  }`}>
                    {row.priority}
                  </span>
                </td>
                <td className="px-4 py-2">{row.gapType}</td>
                <td className="px-4 py-2">{row.action}</td>
                <td className="px-4 py-2">{row.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate AI Report button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-accent-foreground px-6 py-3 rounded-md font-display font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Report
        </button>
        <p className="text-[10px] text-muted-foreground font-body text-center max-w-xl">
          Baseline and projection figures are official KbSUBEB data. Priority ranking and recommended actions are generated
          by EduMap from those figures and are decision-support estimates, not commitments. {DATA_SOURCE}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-md p-6 max-w-md w-full shadow-lg">
            <h3 className="font-display font-bold text-lg text-card-foreground mb-3">AI Report Generation</h3>
            <p className="text-sm font-body text-muted-foreground mb-4">
              In production, this generates a PDF briefing for the Kebbi State Ministry for Basic and Secondary Education,
              summarising teacher gaps, subject shortfalls and recruitment costs by LGA.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-display font-semibold text-sm hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictionsTab;
