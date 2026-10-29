import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { YEAR_DATA, resolveYear } from "@/data/years";
import { buildYearView, type YearView } from "@/data/yearView";

interface YearContextValue {
  year: number;
  setYear: (year: number) => void;
  view: YearView;
}

const YearContext = createContext<YearContextValue | null>(null);

/** Keeps the selected data year in the URL (?year=2024) and hands every tab that year's figures. */
export const YearProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const year = resolveYear(params.get("year"));
  const setYear = useCallback(
    (next: number) => {
      const copy = new URLSearchParams(params);
      copy.set("year", String(resolveYear(next)));
      setParams(copy, { replace: true });
    },
    [params, setParams],
  );
  const view = useMemo(() => buildYearView(YEAR_DATA[year]), [year]);
  const value = useMemo(() => ({ year, setYear, view }), [year, setYear, view]);
  return <YearContext.Provider value={value}>{children}</YearContext.Provider>;
};

export const useYear = () => {
  const ctx = useContext(YearContext);
  if (!ctx) throw new Error("useYear must be used inside YearProvider");
  return ctx;
};

/** The figures for the selected data year. */
export const useYearData = () => useYear().view;
