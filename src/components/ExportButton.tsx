import { Download } from "lucide-react";

interface ExportButtonProps {
  onClick: () => void;
  label?: string;
}

const ExportButton = ({ onClick, label = "Export CSV" }: ExportButtonProps) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-display font-semibold rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
  >
    <Download className="w-3.5 h-3.5" />
    {label}
  </button>
);

export default ExportButton;
