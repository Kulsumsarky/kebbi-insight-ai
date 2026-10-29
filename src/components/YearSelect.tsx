import { YEARS, hasYearData } from "@/data/years";
import { useYear } from "@/hooks/useYear";

/** "Data year" dropdown. Years without data are greyed out and cannot be picked. */
const YearSelect = () => {
  const { year, setYear } = useYear();
  return (
    <div className="bg-card border-b border-border">
      <div className="container py-2 flex items-center justify-end gap-2">
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
    </div>
  );
};

export default YearSelect;
