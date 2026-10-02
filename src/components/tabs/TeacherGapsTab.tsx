import { AlertTriangle } from "lucide-react";
import {
  estimatedCoreSubjectGaps, lgaData, pupilTeacherRatio, urgencyForGap,
} from "@/data/kebbiData";
import PendingBadge from "@/components/PendingBadge";

const urgencyClass = {
  Low: "bg-secondary/15 text-secondary",
  Moderate: "bg-accent/20 text-accent",
  High: "bg-orange-100 text-orange-700",
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
            <th className="px-4 py-3 font-display font-semibold">Total Teachers</th>
            <th className="px-4 py-3 font-display font-semibold">Maths Gap</th>
            <th className="px-4 py-3 font-display font-semibold">English Gap</th>
            <th className="px-4 py-3 font-display font-semibold">Science Gap</th>
            <th className="px-4 py-3 font-display font-semibold">Pupil:Teacher Ratio</th>
            <th className="px-4 py-3 font-display font-semibold">Urgency</th>
          </tr>
        </thead>
        <tbody>
          {lgaData.map((lga, index) => {
            const gaps = estimatedCoreSubjectGaps(lga);
            const ratio = pupilTeacherRatio(lga);
            const urgency = urgencyForGap(lga.teacherGap2024);
            return (
              <tr key={lga.name} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-3 font-semibold">{lga.name}</td>
                <td className="px-4 py-3">{lga.totalSchools === null ? <PendingBadge /> : lga.totalSchools.toLocaleString()}</td>
                <td className="px-4 py-3">{lga.teachers === null ? <PendingBadge /> : lga.teachers.toLocaleString()}</td>
                <td className="px-4 py-3">{gaps.maths.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">{gaps.english.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">{gaps.science.toLocaleString()} <span className="text-xs text-muted-foreground">(est.)</span></td>
                <td className="px-4 py-3">{ratio === null ? <PendingBadge /> : `1:${ratio}`}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${urgencyClass[urgency]}`}>{urgency}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-muted-foreground font-body">
      Estimate method: each published LGA teacher gap is allocated 36% to Maths, 34% to English and 30% to Science; rounded values always reconcile to the published total gap.
    </p>
  </div>
);

export default TeacherGapsTab;