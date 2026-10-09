import PilotBadge from "@/components/PilotBadge";
import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { dnemisLgaData, estimatedCoreGapsFromDnemis, DNEMIS_LTR_STANDARD } from "@/data/kebbiData";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const criticalLgas = dnemisLgaData.filter(row => row.urgency === "Critical");
const aggregateGap = (r: (typeof dnemisLgaData)[number]) => { const g = estimatedCoreGapsFromDnemis(r); return g.maths + g.english + g.science; };
const actionFor = (r: (typeof dnemisLgaData)[number]) => {
  if (r.femaleTeachersPct < 25) return "Prioritise recruitment with targeted female teacher intake to support girls' enrolment";
  if (r.urgency === "Critical") return "Emergency recruitment and rural posting incentives for core subjects";
  return "Rebalance postings from over-served schools and recruit for Maths, English and Science";
};
const interventions = dnemisLgaData
  .filter(r => r.urgency === "Critical" || r.urgency === "High")
  .sort((a, b) => b.ltr - a.ltr)
  .map(r => ({ row: r, gap: aggregateGap(r) }));

const subjectTotals = dnemisLgaData.reduce(
  (acc, row) => { const g = estimatedCoreGapsFromDnemis(row); acc.Mathematics += g.maths; acc.English += g.english; acc.Science += g.science; return acc; },
  { Mathematics: 0, English: 0, Science: 0 } as Record<string, number>,
);
const subjectLgaCounts = (key: "maths" | "english" | "science") => dnemisLgaData.filter(r => estimatedCoreGapsFromDnemis(r)[key] > 0).length;
const subjectKeys: Record<string, "maths" | "english" | "science"> = { Mathematics: "maths", English: "english", Science: "science" };
const recruitmentPriority = Object.entries(subjectTotals)
  .map(([subject, gap]) => ({ subject, gap, lgas: subjectLgaCounts(subjectKeys[subject]) }))
  .sort((a, b) => b.gap - a.gap);
const totalSubjectGap = recruitmentPriority.reduce((s, r) => s + r.gap, 0);

const AIPredictionsTab = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-accent/15 border border-accent/40 rounded-md p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm font-body text-foreground">
          <strong>Recommendations generated from gap severity, pupil:teacher ratios, and subject coverage data.</strong> Verify against current DNEMIS records before action.
        </p>
      </div>

      <div className="bg-secondary/40 border border-primary/30 rounded-md p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] font-display font-semibold uppercase tracking-widest text-primary mb-1">SUBEB corroboration</p>
          <p className="text-sm font-body text-foreground">The subject-specific teacher shortage pattern shown here has been independently corroborated by Kebbi State's SUBEB (Universal Basic Education Board), Directorate of Planning, Research and Statistics, based on their own internal data (October 2026).</p>
        </div>
      </div>

      <div className="bg-card rounded-md p-4 shadow-sm border-l-4 border-l-destructive max-w-sm">
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">Highest Urgency LGAs</p>
        <p className="text-3xl font-display font-bold text-destructive mt-1">{criticalLgas.length}</p>
        <p className="text-xs text-muted-foreground font-body mt-1">LGAs rated Critical in the DNEMIS 2024 census</p>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        <h3 className="font-display font-semibold text-sm p-4 pb-1 text-card-foreground">Recruitment Priority by Subject</h3>
        <p className="text-xs text-muted-foreground font-body px-4 pb-3">Ranked most urgent first, by estimated teachers needed to reach the 1:35 standard.</p>
        <table className="w-full text-sm font-body">
          <thead><tr className="bg-muted text-left">
            {['Priority', 'Subject', 'Est. Teachers Needed', 'Share of Shortfall', 'LGAs Affected'].map(label => <th key={label} className="px-4 py-3 font-display font-semibold">{label}</th>)}
          </tr></thead>
          <tbody>{recruitmentPriority.map((row, index) => (
            <tr key={row.subject} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
              <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${index === 0 ? "bg-destructive/10 text-destructive" : index === 1 ? "bg-warning/15 text-warning" : "bg-accent/15 text-foreground"}`}>#{index + 1}</span></td>
              <td className="px-4 py-3 font-semibold">{row.subject}</td>
              <td className="px-4 py-3">{row.gap.toLocaleString()} (est.)</td>
              <td className="px-4 py-3">{totalSubjectGap ? Math.round((row.gap / totalSubjectGap) * 100) : 0}%</td>
              <td className="px-4 py-3">{row.lgas} of 21</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-x-auto">
        <h3 className="font-display font-semibold text-sm p-4 pb-2 text-card-foreground">Intervention Recommendations</h3>
        <table className="w-full text-sm font-body">
          <thead><tr className="bg-muted text-left">
            {['LGA', 'Priority', 'Gap Type', 'Recommended Action', 'Est. Teachers Needed', 'Students Affected'].map(label => <th key={label} className="px-4 py-3 font-display font-semibold">{label}</th>)}
          </tr></thead>
          <tbody>{interventions.map(({ row, gap }, index) => (
              <tr key={row.lga} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-3 font-semibold">{row.lga}<PilotBadge lga={row.lga} /></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${row.urgency === "Critical" ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-warning"}`}>{row.urgency}</span></td>
                <td className="px-4 py-3">Learner-teacher ratio 1:{Math.round(row.ltr)} vs 1:{DNEMIS_LTR_STANDARD} standard; {row.femaleTeachersPct}% female teachers</td>
                <td className="px-4 py-3 min-w-64">{actionFor(row)}</td>
                <td className="px-4 py-3">{gap.toLocaleString()} (est.)</td>
                <td className="px-4 py-3">{row.learners.toLocaleString()} learners</td>
              </tr>
            ))}</tbody>
        </table>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button onClick={() => setShowModal(true)} className="bg-accent text-accent-foreground hover:bg-accent/90"><Sparkles />Download Report</Button>
        <p className="text-[10px] text-muted-foreground font-body text-center max-w-xl">Priority rankings and actions are decision-support estimates. Officials should validate school-level staffing and current DNEMIS records before deployment.</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <div className="bg-card rounded-md p-6 max-w-md w-full shadow-lg">
            <h3 id="report-title" className="font-display font-bold text-lg text-card-foreground mb-3">Download Report</h3>
            <p className="text-sm font-body text-muted-foreground mb-4">In production, this creates a Ministry briefing on urgent LGAs, core-subject shortages, deployment risks and recommended staffing actions.</p>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictionsTab;