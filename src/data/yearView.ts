import { estimateDeployment, estimatedCoreGapsFromDnemis } from "@/data/kebbiData";
import type { YearData } from "@/data/years";

/** Everything the dashboard tabs show for one year, worked out with the same calculations as before. */
export const buildYearView = (data: YearData) => {
  const lgas = data.lgas;
  const deployment = lgas.map(estimateDeployment);
  const sum = (f: "total" | "classroom" | "admin" | "unverified") => deployment.reduce((n, r) => n + (r[f] ?? 0), 0);
  return {
    year: data.year,
    source: data.source,
    sourceShort: data.sourceShort,
    lgas,
    totals: {
      schools: lgas.reduce((n, r) => n + r.schools, 0),
      learners: lgas.reduce((n, r) => n + r.learners, 0),
      teachers: lgas.reduce((n, r) => n + r.teachers, 0),
      criticalLgas: lgas.filter((r) => r.urgency === "Critical").length,
      subjectGaps: lgas.reduce((n, r) => {
        const g = estimatedCoreGapsFromDnemis(r);
        return n + g.maths + g.english + g.science;
      }, 0),
    },
    deployment,
    statewideDeployment: { total: sum("total"), classroom: sum("classroom"), admin: sum("admin"), unverified: sum("unverified") },
  };
};

export type YearView = ReturnType<typeof buildYearView>;
