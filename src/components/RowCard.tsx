import type { ReactNode } from "react";

export interface RowCardRow {
  label: string;
  value: ReactNode;
  /** Take the full width of the card (for long text). */
  wide?: boolean;
}

/** One table row shown as a card on phones. The title (LGA name) is always at the top. */
const RowCard = ({ title, badges, rows }: { title: ReactNode; badges?: ReactNode; rows: RowCardRow[] }) => (
  <div className="bg-card rounded-md p-4 shadow-sm space-y-3">
    <div className="flex flex-wrap items-center gap-2">
      <p className="font-display font-bold text-card-foreground">{title}</p>
      {badges}
    </div>
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-body">
      {rows.map((r) => (
        <div key={r.label} className={r.wide ? "col-span-2" : ""}>
          <dt className="text-xs text-muted-foreground">{r.label}</dt>
          <dd className="text-card-foreground">{r.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default RowCard;
