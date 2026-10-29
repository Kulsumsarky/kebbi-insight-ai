import type { YearData, DnemisLgaData } from "./types";

/** Official DNEMIS ASC 2024 LGA figures. Official Kebbi spellings are normalised. */
const lgas: DnemisLgaData[] = [
  { lga: "Koko/Besse", schools: 138, learners: 46394, teachers: 387, ltr: 119.9, femaleTeachersPct: 31.0, urgency: "Critical" },
  { lga: "Maiyama", schools: 160, learners: 60370, teachers: 587, ltr: 102.8, femaleTeachersPct: 17.2, urgency: "Critical" },
  { lga: "Shanga", schools: 133, learners: 35032, teachers: 408, ltr: 85.9, femaleTeachersPct: 22.3, urgency: "Critical" },
  { lga: "Wasagu/Danko", schools: 370, learners: 98000, teachers: 1191, ltr: 82.3, femaleTeachersPct: 27.0, urgency: "Critical" },
  { lga: "Gwandu", schools: 178, learners: 54007, teachers: 683, ltr: 79.1, femaleTeachersPct: 18.7, urgency: "Critical" },
  { lga: "Bagudo", schools: 234, learners: 62919, teachers: 828, ltr: 76.0, femaleTeachersPct: 23.8, urgency: "Critical" },
  { lga: "Suru", schools: 165, learners: 41792, teachers: 654, ltr: 63.9, femaleTeachersPct: 28.7, urgency: "High" },
  { lga: "Sakaba", schools: 118, learners: 30164, teachers: 473, ltr: 63.8, femaleTeachersPct: 20.5, urgency: "High" },
  { lga: "Dandi", schools: 182, learners: 30256, teachers: 533, ltr: 56.8, femaleTeachersPct: 26.5, urgency: "High" },
  { lga: "Aliero", schools: 69, learners: 17156, teachers: 325, ltr: 52.8, femaleTeachersPct: 24.9, urgency: "High" },
  { lga: "Jega", schools: 144, learners: 51574, teachers: 988, ltr: 52.2, femaleTeachersPct: 34.1, urgency: "High" },
  { lga: "Argungu", schools: 185, learners: 74761, teachers: 1463, ltr: 51.1, femaleTeachersPct: 40.8, urgency: "High" },
  { lga: "Arewa", schools: 214, learners: 51832, teachers: 1049, ltr: 49.4, femaleTeachersPct: 29.6, urgency: "Moderate" },
  { lga: "Zuru", schools: 216, learners: 65498, teachers: 1357, ltr: 48.3, femaleTeachersPct: 49.2, urgency: "Moderate" },
  { lga: "Ngaski", schools: 121, learners: 33822, teachers: 721, ltr: 46.9, femaleTeachersPct: 24.7, urgency: "Moderate" },
  { lga: "Birnin Kebbi", schools: 288, learners: 126878, teachers: 2723, ltr: 46.6, femaleTeachersPct: 54.3, urgency: "Moderate" },
  { lga: "Fakai", schools: 134, learners: 24937, teachers: 663, ltr: 37.6, femaleTeachersPct: 33.2, urgency: "Moderate" },
  { lga: "Yauri", schools: 118, learners: 41751, teachers: 1127, ltr: 37.0, femaleTeachersPct: 42.2, urgency: "Moderate" },
  { lga: "Kalgo", schools: 90, learners: 24080, teachers: 665, ltr: 36.2, femaleTeachersPct: 25.7, urgency: "Moderate" },
  { lga: "Bunza", schools: 108, learners: 28269, teachers: 847, ltr: 33.4, femaleTeachersPct: 19.5, urgency: "Low" },
  { lga: "Augie", schools: 98, learners: 24368, teachers: 819, ltr: 29.8, femaleTeachersPct: 23.8, urgency: "Low" },
];

export const data2024: YearData = {
  year: 2024,
  source: "Source: DNEMIS Annual School Census 2024, Nigeria Federal Ministry of Education, retrieved 22 September 2026.",
  sourceShort: "DNEMIS Annual School Census 2024",
  lgas,
};
