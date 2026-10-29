import { YEARS, hasYearData } from "@/data/years";
import { useYear } from "@/hooks/useYear";
import { FEEDBACK_FORM_URL, PUBLIC_DEMO_MODE } from "@/config";

/** "Data year" dropdown. Years without data are greyed out and cannot be picked. */
const YearSelect = () => {
  const { year, setYear } = useYear();
  return (
    <div className="bg-card border-b border-border">
      <div className="container py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div className="flex items-center gap-2">
        <label htmlFor="data-year" className="text-xs md:text-sm font-display font-semibold text-card-foreground">
          Data year
        </label>
        <select
          id="data-year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="min-h-[40px] rounded-md border-2 border-border bg-background px-3 text-sm font-display font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {YEARS.map((y) => (
            <option key={y} value={y} disabled={!hasYearData(y)}>
              {y}
            </option>
          ))}
        </select>
        </div>
        {PUBLIC_DEMO_MODE && (
          <a
            href={FEEDBACK_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm font-display font-semibold text-primary underline underline-offset-2 shrink-0"
          >
            Give feedback (1 minute)
          </a>
        )}
      </div>
    </div>
  );
};

export default YearSelect;
