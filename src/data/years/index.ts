import type { YearData } from "./types";
import { data2024 } from "./2024";

/**
 * Years shown in the "Data year" dropdown, in order.
 * A year with no entry in YEAR_DATA is shown greyed out and cannot be picked.
 *
 * To add a year: create src/data/years/<year>.ts (copy 2024.ts), then add it to YEAR_DATA below.
 */
export const YEARS = [2023, 2024, 2025, 2026];

export const YEAR_DATA: Record<number, YearData> = {
  2024: data2024,
};

export const hasYearData = (year: number) => year in YEAR_DATA;

/** The newest year that has data. This is what opens by default. */
export const LATEST_YEAR = Math.max(...Object.keys(YEAR_DATA).map(Number));

/** Turns any value (for example from the URL) into a year that has data. */
export const resolveYear = (value: string | number | null | undefined) => {
  const year = Number(value);
  return Number.isInteger(year) && hasYearData(year) ? year : LATEST_YEAR;
};

export type { YearData, DnemisLgaData, Urgency } from "./types";
