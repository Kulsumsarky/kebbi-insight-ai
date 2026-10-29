import { describe, expect, it } from "vitest";
import { YEARS, YEAR_DATA, LATEST_YEAR, hasYearData, resolveYear } from "@/data/years";
import { buildYearView } from "@/data/yearView";
import { dnemisLgaData, dnemisTotals, statewideDeployment } from "@/data/kebbiData";

describe("data years", () => {
  it("lists 2023 to 2026 and only 2024 has data", () => {
    expect(YEARS).toEqual([2023, 2024, 2025, 2026]);
    expect(hasYearData(2024)).toBe(true);
    [2023, 2025, 2026].forEach((y) => expect(hasYearData(y)).toBe(false));
    expect(LATEST_YEAR).toBe(2024);
  });

  it("falls back to the latest year for missing or unknown years", () => {
    expect(resolveYear(null)).toBe(2024);
    expect(resolveYear("2026")).toBe(2024);
    expect(resolveYear("abc")).toBe(2024);
    expect(resolveYear("2024")).toBe(2024);
  });

  it("2024 gives exactly the figures the dashboard showed before", () => {
    const view = buildYearView(YEAR_DATA[2024]);
    expect(view.lgas).toHaveLength(21);
    expect(view.totals.teachers).toBe(18491);
    expect(view.totals.learners).toBe(1023860);
    expect(view.totals.criticalLgas).toBe(6);
    expect(view.totals.subjectGaps).toBe(10933);
    expect(view.statewideDeployment).toMatchObject({ total: 18491, classroom: 15744, admin: 1754, unverified: 993 });
    expect(view.totals).toEqual(dnemisTotals);
    expect(view.statewideDeployment).toEqual(statewideDeployment);
    expect(view.lgas).toBe(dnemisLgaData);
  });
});
