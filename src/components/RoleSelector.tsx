import { Info } from "lucide-react";
import { useAuth, roleLabels } from "@/hooks/useAuth";
import { DATA_SOURCE, PARTIAL_DATA_NOTE } from "@/data/kebbiData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const RoleSelector = () => {
  const { role, profile } = useAuth();

  return (
    <div className="bg-kebbi-light border-b border-border">
      <div className="container flex items-center justify-end py-2 flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs text-muted-foreground font-body flex items-center gap-1 cursor-help max-w-xl text-right">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              {DATA_SOURCE}
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">{PARTIAL_DATA_NOTE}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default RoleSelector;
