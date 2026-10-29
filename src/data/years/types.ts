export type Urgency = "Low" | "Moderate" | "High" | "Critical";

export interface DnemisLgaData {
  lga: string;
  schools: number;
  learners: number;
  teachers: number;
  ltr: number;
  femaleTeachersPct: number;
  urgency: Urgency;
}

/** Everything the dashboard needs for one data year. Add a year by adding one file like 2024.ts. */
export interface YearData {
  year: number;
  /** Full source line shown in the footer. */
  source: string;
  /** Short source name used in pop-ups. */
  sourceShort: string;
  lgas: DnemisLgaData[];
}
