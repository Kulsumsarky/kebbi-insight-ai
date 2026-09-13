import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/** Shown wherever the KbSUBEB baseline report has no figure — never render 0. */
const PendingBadge = ({ label = "Data pending" }: { label?: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-dashed border-border cursor-help">
        <HelpCircle className="w-3 h-3" />
        {label}
      </span>
    </TooltipTrigger>
    <TooltipContent className="max-w-xs">
      Not reported in the March 2025 baseline report — pending full Annual School Census returns. This is not a zero.
    </TooltipContent>
  </Tooltip>
);

export default PendingBadge;
