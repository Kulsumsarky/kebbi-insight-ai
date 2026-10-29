import PilotBadge from "@/components/PilotBadge";
import { AlertTriangle } from "lucide-react";
import ExplainCard from "@/components/ExplainCard";
import { DNEMIS_LTR_STANDARD, estimatedCoreGapsFromDnemis } from "@/data/kebbiData";
import { useYearData } from "@/hooks/useYear";

const urgencyClass = {
  Low: "bg-secondary/15 text-secondary",
  Moderate: "bg-accent/20 text-accent",
  High: "bg-warning/15 text-warning",
  Critical: "bg-destructive/10 text-destructive",
};

const TeacherGapsTab = () => {
  const { lgas: dnemisLgaData, totals: dnemisTotals } = useYearData();
  const stateLtr = dnemisTotals.learners / dnemisTotals.teachers;
  const aboveStandard = dnemisLgaData.filter(r => r.ltr > DNEMIS_LTR_STANDARD).length;
  const subjectSum = (k: "maths" | "english" | "science") => dnemisLgaData.reduce((n, r) => n + estimatedCoreGapsFromDnemis(r)[k], 0);

  const summaryCards = [
    {
      label: "Extra teachers needed (est.)", value: dnemisTotals.subjectGaps.toLocaleString(), border: "border-l-warning",
      rows: [
        { label: "The number", value: `${dnemisTotals.subjectGaps.toLocaleString()} (est.)`, explain: `Added up across all LGAs: the teachers needed to reach 1:${DNEMIS_LTR_STANDARD}, minus the teachers already in place.` },
        { label: "Split by subject (est.)", explain: `Maths ${subjectSum("maths").toLocaleString()}, English ${subjectSum("english").toLocaleString()}, Science ${subjectSum("science").toLocaleString()}. The census has no subject data, so EduMap splits the total 36%, 34% and 30%.` },
      ],
    },
    {
      label: "State learners per teacher", value: `1:${stateLtr.toFixed(1)}`, border: "border-l-destructive",
      rows: [
        { label: "The number", value: `1:${stateLtr.toFixed(1)}`, explain: `${dnemisTotals.learners.toLocaleString()} learners divided by ${dnemisTotals.teachers.toLocaleString()} teachers across Kebbi State.` },
        { label: "Compared with the standard", explain: `The Kebbi UBE standard is 1:${DNEMIS_LTR_STANDARD}. A state average can hide LGAs that are far worse, which is why the table below is by LGA.` },
      ],
    },
    {
      label: "LGAs above the standard", value: `${aboveStandard} of ${dnemisLgaData.length}`, border: "border-l-accent",
      rows: [
        { label: "The number", value: `${aboveStandard} of ${dnemisLgaData.length}`, explain: `LGAs where learners per teacher is higher than 1:${DNEMIS_LTR_STANDARD}.` },
        { label: "What it means", explain: "In these LGAs there are more learners for each teacher than the standard allows, so classes are likely larger than planned." },
      ],
    },
  ];
  return (
  <div className="space-y-5 animate-fade-in">
    <div className="bg-accent/15 border border-accent/40 rounded-md p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      <p className="text-sm font-body text-foreground">
        <strong>Subject-level breakdown is estimated.</strong> Verified data pending State Ministry approval.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {summaryCards.map(c => (
        <ExplainCard key={c.label} className={`bg-card rounded-md p-4 shadow-sm border-l-4 ${c.border}`} title={`${c.label}: what this number means`} description="DNEMIS Annual School Census 2024." rows={c.rows}>
          <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{c.label}</p>
          <p className="text-2xl font-display font-bold text-card-foreground mt-1">{c.value}</p>
        </ExplainCard>
      ))}
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
};

export default TeacherGapsTab;