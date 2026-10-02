import { AlertTriangle } from "lucide-react";
import { deploymentByLga, statewideDeployment } from "@/data/kebbiData";
import PendingBadge from "@/components/PendingBadge";

const percent = (value: number) => Math.round((value / statewideDeployment.total) * 100);

const statusFor = (classroomPercent: number) => {
  if (classroomPercent > 85) return { label: "Strong", className: "bg-secondary/15 text-secondary" };
  if (classroomPercent >= 65) return { label: "Review", className: "bg-accent/20 text-accent" };
  return { label: "Critical", className: "bg-destructive/10 text-destructive" };
};

const DeploymentTab = () => (
  <div className="space-y-5 animate-fade-in">
    <div className="bg-accent/15 border border-accent/40 rounded-md p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      <p className="text-sm font-body text-foreground">
        <strong>Deployment data is currently estimated.</strong> Real-time tracking requires school-level data submission.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        ["Classroom-posted teachers", statewideDeployment.classroom, percent(statewideDeployment.classroom), "border-l-secondary"],
        ["Admin/area office posted", statewideDeployment.admin, percent(statewideDeployment.admin), "border-l-accent"],
        ["Unaccounted / unverified", statewideDeployment.unverified, percent(statewideDeployment.unverified), "border-l-destructive"],
      ].map(([label, value, share, border]) => (
        <div key={String(label)} className={`bg-card rounded-md p-4 shadow-sm border-l-4 ${border}`}>
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-display font-bold text-card-foreground mt-1">{Number(value).toLocaleString()}</p>
          <p className="text-xs text-muted-foreground font-body mt-1">{share}% of deployed teachers · Estimated</p>
        </div>
      ))}
    </div>

    <div className="bg-card rounded-md shadow-sm overflow-x-auto">
      <table className="w-full text-sm font-body">
        <thead>
          <tr className="bg-muted text-left">
            <th className="px-4 py-3 font-display font-semibold">LGA</th>
            <th className="px-4 py-3 font-display font-semibold">Total Deployed</th>
            <th className="px-4 py-3 font-display font-semibold">In Classroom</th>
            <th className="px-4 py-3 font-display font-semibold">In Admin Office</th>
            <th className="px-4 py-3 font-display font-semibold">Unverified</th>
            <th className="px-4 py-3 font-display font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {deploymentByLga.map((row, index) => {
            const status = row.classroomPercent === null ? null : statusFor(row.classroomPercent);
            return (
              <tr key={row.lga} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                <td className="px-4 py-3 font-semibold">{row.lga}</td>
                <td className="px-4 py-3">{row.total === null ? <PendingBadge /> : row.total.toLocaleString()}</td>
                <td className="px-4 py-3">{row.classroom === null ? <PendingBadge /> : `${row.classroom.toLocaleString()} (est.)`}</td>
                <td className="px-4 py-3">{row.admin === null ? <PendingBadge /> : `${row.admin.toLocaleString()} (est.)`}</td>
                <td className="px-4 py-3">{row.unverified === null ? <PendingBadge /> : `${row.unverified.toLocaleString()} (est.)`}</td>
                <td className="px-4 py-3">
                  {status && row.classroomPercent !== null ? (
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                      {status.label} · {row.classroomPercent}%
                    </span>
                  ) : <PendingBadge />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <p className="text-xs text-muted-foreground font-body">
      Estimate method: reported LGA totals are allocated using a stable 8–12% administrative rate and a 4–8% verification allowance adjusted by shortage severity.
    </p>
  </div>
);

export default DeploymentTab;