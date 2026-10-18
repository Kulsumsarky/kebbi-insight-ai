import { useState } from "react";
import {
  dnemisLgaData, DNEMIS_LTR_STANDARD, DATA_SOURCE_SHORT, type DnemisLgaData,
} from "@/data/kebbiData";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

const criticalLgas = dnemisLgaData.filter((row) => row.urgency === "Critical");

const fmt = (n: number) => n.toLocaleString();

/** Teachers needed to reach the standard ratio, minus those already in place. */
const extraTeachersNeeded = (row: DnemisLgaData) =>
  Math.max(0, Math.ceil(row.learners / DNEMIS_LTR_STANDARD) - row.teachers);

const Row = ({ label, value, explain }: { label: string; value: string; explain: string }) => (
  <div className="border-b border-border last:border-0 py-3">
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs uppercase tracking-wide text-muted-foreground font-body">{label}</span>
      <span className="font-display font-bold text-card-foreground">{value}</span>
    </div>
    <p className="text-sm text-muted-foreground font-body mt-1">{explain}</p>
  </div>
);

const CriticalLgaCards = () => {
  const [selected, setSelected] = useState<DnemisLgaData | null>(null);

  return (
    <section aria-labelledby="critical-lgas-heading" className="space-y-3">
      <div>
        <h3 id="critical-lgas-heading" className="font-display font-semibold text-sm text-card-foreground">
          The {criticalLgas.length} LGAs at critical shortage
        </h3>
        <p className="text-xs text-muted-foreground font-body">Select a card to see what its numbers mean.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {criticalLgas.map((row) => (
          <button
            key={row.lga}
            type="button"
            onClick={() => setSelected(row)}
            className="text-left bg-card rounded-md p-4 shadow-sm border-l-4 border-l-destructive transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <p className="text-xs text-muted-foreground font-body uppercase tracking-wide">{row.lga}</p>
            <p className="text-2xl font-display font-bold mt-1 text-card-foreground">{fmt(row.teachers)}</p>
            <p className="text-xs text-muted-foreground font-body">teachers in total</p>
            <p className="text-xs mt-2 font-body text-destructive font-semibold">1:{row.ltr.toFixed(1)} learners per teacher</p>
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display">{selected.lga}: what these numbers mean</DialogTitle>
                <DialogDescription>
                  {DATA_SOURCE_SHORT}. Figures are LGA totals.
                </DialogDescription>
              </DialogHeader>
              <div>
                <Row
                  label="Teachers"
                  value={fmt(selected.teachers)}
                  explain={`The census counts ${fmt(selected.teachers)} teachers across ${fmt(selected.schools)} schools in ${selected.lga}.`}
                />
                <Row
                  label="Learners"
                  value={fmt(selected.learners)}
                  explain="The total number of learners enrolled in those schools."
                />
                <Row
                  label="Learners per teacher"
                  value={`1:${selected.ltr.toFixed(1)}`}
                  explain={`${fmt(selected.learners)} learners divided by ${fmt(selected.teachers)} teachers. The standard is 1:${DNEMIS_LTR_STANDARD}, so ${selected.lga} is ${(selected.ltr / DNEMIS_LTR_STANDARD).toFixed(1)} times the standard. That is why it is marked Critical.`}
                />
                <Row
                  label="Teachers to reach the standard"
                  value={`about ${fmt(extraTeachersNeeded(selected))} more`}
                  explain={`To reach 1:${DNEMIS_LTR_STANDARD}, ${selected.lga} would need about ${fmt(Math.ceil(selected.learners / DNEMIS_LTR_STANDARD))} teachers (${fmt(selected.learners)} ÷ ${DNEMIS_LTR_STANDARD}). It has ${fmt(selected.teachers)}. This is a calculation from census totals, not a school-by-school count.`}
                />
                <Row
                  label="Female teachers"
                  value={`${selected.femaleTeachersPct.toFixed(1)}%`}
                  explain="The share of the LGA's teachers who are women."
                />
              </div>
              <p className="text-xs text-muted-foreground font-body">
                Subject-level and school-level figures are still being collected, and any shown elsewhere on this dashboard are marked (est.).
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CriticalLgaCards;
