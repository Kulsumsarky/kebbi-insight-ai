import { useState, type ReactNode } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

export const ExplainRow = ({ label, value, explain }: { label: string; value?: string; explain: string }) => (
  <div className="border-b border-border last:border-0 py-3">
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-xs uppercase tracking-wide text-muted-foreground font-body">{label}</span>
      {value && <span className="font-display font-bold text-card-foreground">{value}</span>}
    </div>
    <p className="text-sm text-muted-foreground font-body mt-1">{explain}</p>
  </div>
);

interface ExplainCardProps {
  /** Card face. */
  children: ReactNode;
  className?: string;
  /** Dialog heading, e.g. "Total teachers: what this number means". */
  title: string;
  description?: string;
  /** Plain-language rows shown when the card is clicked. */
  rows: { label: string; value?: string; explain: string }[];
  note?: string;
}

/** A card that opens a plain-language explanation of its numbers when clicked. */
const ExplainCard = ({ children, className = "", title, description, rows, note }: ExplainCardProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`text-left cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
      >
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div>{rows.map((r) => <ExplainRow key={r.label} {...r} />)}</div>
          {note && <p className="text-xs text-muted-foreground font-body">{note}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExplainCard;
