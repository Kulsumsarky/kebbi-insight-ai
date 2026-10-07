import PilotBadge from "@/components/PilotBadge";
import { AlertTriangle } from "lucide-react";
import {
  dnemisLgaData, DNEMIS_LTR_STANDARD, estimatedCoreGapsFromDnemis,
} from "@/data/kebbiData";

const urgencyClass = {
  Low: "bg-secondary/15 text-secondary",
  Moderate: "bg-accent/20 text-accent",
  High: "bg-warning/15 text-warning",
  Critical: "bg-destructive/10 text-destructive",
};

const TeacherGapsTab = () => (
  <div className="space-y-5 animate-fade-in">
    <div className="bg-accent/15 border border-accent/40 rounded-md p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      <p className="text-sm font-body text-foreground">
        <strong>Subject-level breakdown is estimated.</strong> Verified data pending State Ministry approval.
      </p>
    </div>

    <div className="bg-card rounded-md shadow-sm overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="bg-muted text-left">
            <th className="px-4 py-3 font-display font-semibold">LGA</th>
            <th className="px-4 py-3 font-display font-semibold">Schools</th>
            <th className="px-4 py-3 font-display font-semibold">Learners</th>
            <th className="px-4 py-3 font-display font-semibold">Teachers</th>
            <th className="px-4 py-3 font-display font-semibold">Female Teachers</th>
            <th className="px-4 py-3 font-display font-semibold">Maths Gap</th>
            <th className="px-4 py-3 font-display font-semibold">English Gap</th>
            <th className="px-4 py-3 font-display font-semibold">Science Gap</th>
            <th className="px-4 py-3 font-display font-semibold">Learner-Teacher Ratio</th>
            <th className="px-4 py-3 font-display font-semibold">Urgency</th>
          </tr>
        </thead>
        <tbody>
          {dnemisLgaData.map((lga, index) => {
            const gaps = estimatedCoreGapsFromDnemis(lga);
            return (
              <tr key={lga.lga} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-3 font-semibold">{lga.lga}<PilotBadge lga={lga.lga} /></td>
                <td className="px-4 py-3">{lga.schools.toLocaleString()}</td>
                <td className="px-4 py-3">{lga.learners.toLocaleString()}</td>
                <td className="px-4 py-3">{lga.teachers.toLocaleString()}</td>
                <td className="px-4 py-3">{lga.femaleTeachersPct.toFixed(1)}%</td>
                <td className="px-4 py-3">{gaps.maths.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">{gaps.english.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">{gaps.science.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">1:{lga.ltr.toFixed(1)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${urgencyClass[lga.urgency]}`}>{lga.urgency}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-muted-foreground font-body">
      Subject-gap estimate only: additional teachers needed to reach the Kebbi UBE standard of 1:{DNEMIS_LTR_STANDARD} are allocated 36% to Maths, 34% to English and 30% to Science. DNEMIS does not publish subject-level staffing in this dataset.
    </p>
  </div>
);

export default TeacherGapsTab;