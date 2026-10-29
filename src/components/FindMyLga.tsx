import { useState } from "react";
import PilotBadge from "@/components/PilotBadge";
import { LgaDetailDialog } from "@/components/CriticalLgaCards";
import { DNEMIS_LTR_STANDARD, estimateDeployment, estimatedCoreGapsFromDnemis } from "@/data/kebbiData";
import { useYearData } from "@/hooks/useYear";
import { numberOrPending, ordinal, statusWord } from "@/lib/wording";

const statusClass: Record<string, string> = {
  Low: "bg-secondary/15 text-secondary",
  Moderate: "bg-accent/20 text-accent",
  High: "bg-warning/15 text-warning",
  Critical: "bg-destructive/10 text-destructive",
};

const Fact = ({ value, label, est }: { value: string; label: string; est?: boolean }) => (
  <div>
    <p className="text-xl font-display font-bold text-card-foreground">
      {value}
      {est && <span className="text-xs font-normal text-muted-foreground"> (est.)</span>}
    </p>
    <p className="text-xs text-muted-foreground font-body">{label}</p>
  </div>
);

interface FindMyLgaProps {
  /** Name of the selected LGA. */
  lga: string;
  onChange: (lga: string) => void;
}

/** Pick an LGA, see its numbers in plain words. Follows the selected data year. */
const FindMyLga = ({ lga, onChange }: FindMyLgaProps) => {
  const { lgas } = useYearData();
  const [explainOpen, setExplainOpen] = useState(false);

  const ranked = [...lgas].sort((a, b) => b.ltr - a.ltr);
  const row = lgas.find((r) => r.lga === lga) ?? ranked[0];
  const rank = ranked.findIndex((r) => r.lga === row.lga) + 1;
  const needed = Math.max(0, Math.ceil(row.learners / DNEMIS_LTR_STANDARD) - row.teachers);
  const subjects = estimatedCoreGapsFromDnemis(row);
  const work = estimateDeployment(row);
  const femaleCount = Math.round((row.teachers * row.femaleTeachersPct) / 100);

  return (
    <section aria-labelledby="find-my-lga-heading" className="bg-card rounded-md p-4 md:p-6 shadow-sm border-l-4 border-l-primary space-y-5">
      <div className="space-y-2">
        <label htmlFor="find-my-lga" id="find-my-lga-heading" className="block font-display font-bold text-lg text-card-foreground">
          Find my LGA
        </label>
        <select
          id="find-my-lga"
          value={row.lga}
          onChange={(e) => onChange(e.target.value)}
          className="w-full sm:w-80 min-h-[48px] rounded-md border-2 border-border bg-background px-3 text-base font-display font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {[...lgas].sort((a, b) => a.lga.localeCompare(b.lga)).map((r) => (
            <option key={r.lga} value={r.lga}>{r.lga}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-display font-bold text-2xl text-card-foreground">{row.lga}</h3>
        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${statusClass[row.urgency]}`}>{statusWord(row.urgency)}</span>
        <PilotBadge lga={row.lga} />
        <span className="text-sm text-muted-foreground font-body">{ordinal(rank)} of {lgas.length} LGAs</span>
      </div>

      <div>
        <p className="font-display font-bold text-card-foreground">
          <span className="text-5xl">{Math.round(row.ltr)}</span>{" "}
          <span className="text-base font-body font-normal">learners for every 1 teacher</span>
        </p>
        <p className="text-sm text-muted-foreground font-body mt-1">The state standard is {DNEMIS_LTR_STANDARD}.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border pt-4">
        <Fact value={numberOrPending(row.teachers)} label="teachers" />
        <Fact value={`${numberOrPending(femaleCount)} (${row.femaleTeachersPct.toFixed(1)}%)`} label="female teachers" />
        <Fact value={numberOrPending(row.schools)} label="schools" />
        <Fact value={numberOrPending(row.learners)} label="learners" />
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <p className="font-display font-semibold text-sm text-card-foreground">Where its teachers work</p>
        <div className="grid grid-cols-3 gap-4">
          <Fact value={numberOrPending(work.classroom)} label="in the classroom" est />
          <Fact value={numberOrPending(work.admin)} label="in admin offices" est />
          <Fact value={numberOrPending(work.unverified)} label="not verified" est />
        </div>
      </div>

      <div className="border-t border-border pt-4 space-y-3">
        <p className="font-display font-semibold text-sm text-card-foreground">
          {needed > 0 ? `Needs about ${needed.toLocaleString()} more teachers` : "Has enough teachers for the standard in total"}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <Fact value={numberOrPending(subjects.maths)} label="more Maths teachers" est />
          <Fact value={numberOrPending(subjects.english)} label="more English teachers" est />
          <Fact value={numberOrPending(subjects.science)} label="more Science teachers" est />
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExplainOpen(true)}
        className="min-h-[44px] rounded-md border-2 border-primary px-4 text-sm font-display font-semibold text-primary hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        What do these numbers mean?
      </button>
      <LgaDetailDialog row={explainOpen ? row : null} onClose={() => setExplainOpen(false)} />
    </section>
  );
};

export default FindMyLga;
