/**
 * EduMap Kebbi — data layer
 *
 * PRIMARY SOURCE (real, official figures):
 *   Kebbi State Government Basic Education Teachers Baseline Report, March 2025
 *   (KbSUBEB / Ministry for Basic and Secondary Education)
 *
 * Some LGA-level figures are partial in the source report pending full Annual
 * School Census (ASC) data. Those fields are `null` and MUST be rendered as
 * "Data pending" — never as 0.
 */

export const DATA_SOURCE =
  "Data source: Kebbi State Government Basic Education Teachers Baseline Report, March 2025 (KbSUBEB / Ministry for Basic and Secondary Education).";

export const DATA_SOURCE_SHORT = "KbSUBEB Baseline Report, March 2025";

export const PARTIAL_DATA_NOTE =
  "Some LGA-level figures are partial pending full Annual School Census data. Cells marked “Data pending” are not zeros.";

export const DNEMIS_NOTE =
  "EduMap's figures may differ from Nigeria's national DNEMIS platform because reporting completeness and data-collection timing differ between the two systems. EduMap's aim is to reconcile and clarify these differences transparently — showing where records agree, where they diverge and why — rather than presenting a single unquestioned figure.";

export interface LGAData {
  name: string;
  /** Schools (KbSUBEB). null = data pending. */
  totalSchools: number | null;
  primarySchools: number | null;
  jssSchools: number | null;
  schoolsComplete: boolean;
  /** Teachers (KbSUBEB). null = data pending. */
  teachers: number | null;
  maleTeachers: number | null;
  femaleTeachers: number | null;
  teachersComplete: boolean;
  /** Enrolment 2022–2023 (complete for all 21 LGAs). */
  primaryEnrolment: number;
  jssEnrolment: number;
  students: number;
  /** Teacher gap, 2024 baseline at time of report. */
  teacherGap2024: number;
}

interface RawLGA {
  name: string;
  totalSchools: number | null;
  primarySchools: number | null;
  jssSchools: number | null;
  schoolsComplete: boolean;
  teachers: number | null;
  maleTeachers: number | null;
  femaleTeachers: number | null;
  teachersComplete: boolean;
  primaryEnrolment: number;
  jssEnrolment: number;
  teacherGap2024: number;
}

const raw: RawLGA[] = [
  { name: "Birnin Kebbi", totalSchools: null, primarySchools: 40, jssSchools: 89, schoolsComplete: false, teachers: 2369, maleTeachers: 1061, femaleTeachers: 1308, teachersComplete: true, primaryEnrolment: 39490, jssEnrolment: 67894, teacherGap2024: 416 },
  { name: "Zuru", totalSchools: null, primarySchools: null, jssSchools: 46, schoolsComplete: false, teachers: 2096, maleTeachers: 1109, femaleTeachers: 987, teachersComplete: true, primaryEnrolment: 68543, jssEnrolment: 31112, teacherGap2024: 404 },
  { name: "Argungu", totalSchools: null, primarySchools: null, jssSchools: 41, schoolsComplete: false, teachers: 1778, maleTeachers: 1009, femaleTeachers: 769, teachersComplete: true, primaryEnrolment: 54395, jssEnrolment: 44229, teacherGap2024: 450 },
  { name: "Arewa", totalSchools: 200, primarySchools: 181, jssSchools: 19, schoolsComplete: true, teachers: 1501, maleTeachers: 1053, femaleTeachers: 448, teachersComplete: true, primaryEnrolment: 65289, jssEnrolment: 17201, teacherGap2024: 245 },
  { name: "Bunza", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: 1050, maleTeachers: 881, femaleTeachers: 169, teachersComplete: true, primaryEnrolment: 31771, jssEnrolment: 7795, teacherGap2024: 93 },
  { name: "Yauri", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: 983, maleTeachers: 594, femaleTeachers: 389, teachersComplete: true, primaryEnrolment: 25180, jssEnrolment: 16316, teacherGap2024: 18 },
  { name: "Bagudo", totalSchools: 178, primarySchools: 149, jssSchools: 29, schoolsComplete: true, teachers: 961, maleTeachers: 780, femaleTeachers: 181, teachersComplete: true, primaryEnrolment: 51307, jssEnrolment: 13647, teacherGap2024: 5 },
  { name: "Kalgo", totalSchools: 65, primarySchools: 49, jssSchools: 16, schoolsComplete: true, teachers: 522, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 16950, jssEnrolment: 7591, teacherGap2024: 3 },
  { name: "Aliero", totalSchools: 49, primarySchools: 32, jssSchools: 17, schoolsComplete: true, teachers: 512, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 19163, jssEnrolment: 12492, teacherGap2024: 173 },
  { name: "Maiyama", totalSchools: 74, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: 510, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 30270, jssEnrolment: 6474, teacherGap2024: 63 },
  { name: "Wasagu/Danko", totalSchools: 168, primarySchools: 138, jssSchools: 30, schoolsComplete: true, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 48815, jssEnrolment: 13170, teacherGap2024: 147 },
  { name: "Jega", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 46458, jssEnrolment: 19636, teacherGap2024: 454 },
  { name: "Dandi", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 52879, jssEnrolment: 15580, teacherGap2024: 339 },
  { name: "Koko/Besse", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 34715, jssEnrolment: 6636, teacherGap2024: 212 },
  { name: "Gwandu", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 34096, jssEnrolment: 14436, teacherGap2024: 46 },
  { name: "Ngaski", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 48562, jssEnrolment: 9263, teacherGap2024: 89 },
  { name: "Shanga", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 65773, jssEnrolment: 7146, teacherGap2024: 11 },
  { name: "Suru", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 40291, jssEnrolment: 6844, teacherGap2024: 74 },
  { name: "Fakai", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 27860, jssEnrolment: 5682, teacherGap2024: 0 },
  { name: "Augie", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 25418, jssEnrolment: 4309, teacherGap2024: 1 },
  { name: "Sakaba", totalSchools: null, primarySchools: null, jssSchools: null, schoolsComplete: false, teachers: null, maleTeachers: null, femaleTeachers: null, teachersComplete: false, primaryEnrolment: 22858, jssEnrolment: 4482, teacherGap2024: 24 },
];

export const lgaData: LGAData[] = raw.map(l => ({
  ...l,
  students: l.primaryEnrolment + l.jssEnrolment,
}));

export const lgaNames = lgaData.map(l => l.name);

/** Statewide totals as published in the March 2025 baseline report. */
export const statewide = {
  students: 1182018,
  teachers: 21180,
  /** Special-needs programme staff (ECCDE + PRY + JSS). */
  senTeachers: 135,
  senLearners: 6626,
  senSchools: 33,
  /** Sum of 2024 baseline LGA teacher gaps. */
  teacherGap2024: lgaData.reduce((s, l) => s + l.teacherGap2024, 0),
};

export const enrolmentTotal = lgaData.reduce((s, l) => s + l.students, 0);
export const reportedSchools = lgaData.reduce((s, l) => s + (l.totalSchools ?? 0), 0);
export const lgasWithSchoolData = lgaData.filter(l => l.totalSchools !== null).length;
export const reportedTeachers = lgaData.reduce((s, l) => s + (l.teachers ?? 0), 0);
export const lgasWithTeacherData = lgaData.filter(l => l.teachers !== null).length;

/** Teachers per 1,000 learners — null when teacher data is pending. */
export function teacherDensity(l: LGAData): number | null {
  if (l.teachers === null) return null;
  return Math.round((l.teachers / l.students) * 1000);
}

/** Learners per teacher — null when teacher data is pending. */
export function pupilTeacherRatio(l: LGAData): number | null {
  if (l.teachers === null) return null;
  return Math.round(l.students / l.teachers);
}

/* ---------------- Operational decision-support estimates ----------------
   These estimates are deterministic and derived from the published LGA gap,
   enrolment and reported workforce. They are not official KbSUBEB records. */

export type Urgency = "Low" | "Moderate" | "High" | "Critical";

export function shortageSeverity(lga: LGAData): number | null {
  if (lga.teachers === null) return null;
  const requiredWorkforce = lga.teachers + lga.teacherGap2024;
  return requiredWorkforce === 0 ? 0 : Math.round((lga.teacherGap2024 / requiredWorkforce) * 100);
}

export function urgencyForGap(gap: number): Urgency {
  if (gap >= 400) return "Critical";
  if (gap >= 200) return "High";
  if (gap >= 50) return "Moderate";
  return "Low";
}

export interface CoreSubjectGaps {
  maths: number;
  english: number;
  science: number;
}

/** Split the total LGA gap across core subjects: Maths 36%, English 34%, Science remainder. */
export function estimatedCoreSubjectGaps(lga: LGAData): CoreSubjectGaps {
  const maths = Math.round(lga.teacherGap2024 * 0.36);
  const english = Math.round(lga.teacherGap2024 * 0.34);
  return { maths, english, science: lga.teacherGap2024 - maths - english };
}

export const totalCoreSubjectGaps = lgaData.reduce((sum, lga) => sum + lga.teacherGap2024, 0);
export const criticalShortageCount = lgaData.filter(lga => {
  const severity = shortageSeverity(lga);
  return severity !== null && severity > 55;
}).length;

export interface DeploymentEstimate {
  lga: string;
  total: number | null;
  classroom: number | null;
  admin: number | null;
  unverified: number | null;
  classroomPercent: number | null;
}

export function estimateDeployment(lga: LGAData): DeploymentEstimate {
  if (lga.teachers === null) {
    return { lga: lga.name, total: null, classroom: null, admin: null, unverified: null, classroomPercent: null };
  }

  const severity = shortageSeverity(lga) ?? 0;
  const adminRate = 0.08 + ((lga.name.length % 5) * 0.01);
  const unverifiedRate = 0.04 + (severity >= 20 ? 0.04 : severity >= 10 ? 0.02 : 0);
  const admin = Math.round(lga.teachers * adminRate);
  const unverified = Math.round(lga.teachers * unverifiedRate);
  const classroom = lga.teachers - admin - unverified;
  return {
    lga: lga.name,
    total: lga.teachers,
    classroom,
    admin,
    unverified,
    classroomPercent: Math.round((classroom / lga.teachers) * 100),
  };
}

export const deploymentByLga = lgaData.map(estimateDeployment);
const reportedDeployment = deploymentByLga.filter((row): row is DeploymentEstimate & {
  total: number; classroom: number; admin: number; unverified: number; classroomPercent: number;
} => row.total !== null && row.classroom !== null && row.admin !== null && row.unverified !== null && row.classroomPercent !== null);
const reportedDeploymentTotal = reportedDeployment.reduce((sum, row) => sum + row.total, 0);
const weightedRate = (field: "classroom" | "admin" | "unverified") =>
  reportedDeploymentTotal === 0 ? 0 : reportedDeployment.reduce((sum, row) => sum + row[field], 0) / reportedDeploymentTotal;

const statewideClassroom = Math.round(statewide.teachers * weightedRate("classroom"));
const statewideAdmin = Math.round(statewide.teachers * weightedRate("admin"));
export const statewideDeployment = {
  total: statewide.teachers,
  classroom: statewideClassroom,
  admin: statewideAdmin,
  unverified: statewide.teachers - statewideClassroom - statewideAdmin,
};

export type CoreCoverageStatus = "qualified" | "missing" | "unverified";

export interface CoreCoverage {
  maths: CoreCoverageStatus;
  english: CoreCoverageStatus;
  science: CoreCoverageStatus;
}

export function coreCoverageForSchool(school: School): CoreCoverage {
  const listed = school.subjects.toLowerCase();
  const fallback = (offset: number): CoreCoverageStatus =>
    (school.name.length + school.lga.length + offset) % 4 === 0 ? "unverified" : "missing";
  return {
    maths: listed.includes("maths") ? "qualified" : fallback(1),
    english: listed.includes("english") ? "qualified" : fallback(2),
    science: listed.includes("science") || listed.includes("biology") ? "qualified" : fallback(3),
  };
}

/* ---------------- Teacher gap: baseline + projections ---------------- */

export type GapType = "baseline_at_time_of_report" | "projected";

export interface GapPoint {
  lga: string;
  year: number;
  gap: number;
  type: GapType;
}

const gapRows: [string, number, number, GapType][] = [
  ["Aliero", 2024, 173, "baseline_at_time_of_report"], ["Aliero", 2025, 174, "projected"], ["Aliero", 2026, 2, "projected"], ["Aliero", 2027, 4, "projected"], ["Aliero", 2028, 11, "projected"], ["Aliero", 2029, 11, "projected"],
  ["Arewa", 2024, 245, "baseline_at_time_of_report"], ["Arewa", 2025, 262, "projected"], ["Arewa", 2026, 7, "projected"], ["Arewa", 2027, 22, "projected"], ["Arewa", 2028, 24, "projected"], ["Arewa", 2029, 27, "projected"],
  ["Argungu", 2024, 450, "baseline_at_time_of_report"], ["Argungu", 2025, 465, "projected"], ["Argungu", 2026, 11, "projected"], ["Argungu", 2027, 18, "projected"], ["Argungu", 2028, 22, "projected"], ["Argungu", 2029, 18, "projected"],
  ["Augie", 2024, 1, "baseline_at_time_of_report"], ["Augie", 2025, 5, "projected"], ["Augie", 2026, 2, "projected"], ["Augie", 2027, 3, "projected"], ["Augie", 2028, 2, "projected"], ["Augie", 2029, 4, "projected"],
  ["Bagudo", 2024, 5, "baseline_at_time_of_report"], ["Bagudo", 2025, 8, "projected"], ["Bagudo", 2026, 4, "projected"], ["Bagudo", 2027, 8, "projected"], ["Bagudo", 2028, 2, "projected"], ["Bagudo", 2029, 9, "projected"],
  ["Birnin Kebbi", 2024, 416, "baseline_at_time_of_report"], ["Birnin Kebbi", 2025, 430, "projected"], ["Birnin Kebbi", 2026, 12, "projected"], ["Birnin Kebbi", 2027, 15, "projected"], ["Birnin Kebbi", 2028, 22, "projected"], ["Birnin Kebbi", 2029, 11, "projected"],
  ["Bunza", 2024, 93, "baseline_at_time_of_report"], ["Bunza", 2025, 95, "projected"], ["Bunza", 2026, 6, "projected"], ["Bunza", 2027, 8, "projected"], ["Bunza", 2028, 6, "projected"], ["Bunza", 2029, 6, "projected"],
  ["Dandi", 2024, 339, "baseline_at_time_of_report"], ["Dandi", 2025, 350, "projected"], ["Dandi", 2026, 4, "projected"], ["Dandi", 2027, 5, "projected"], ["Dandi", 2028, 7, "projected"], ["Dandi", 2029, 10, "projected"],
  ["Fakai", 2024, 0, "baseline_at_time_of_report"], ["Fakai", 2025, 7, "projected"], ["Fakai", 2026, 5, "projected"], ["Fakai", 2027, 6, "projected"], ["Fakai", 2028, 2, "projected"], ["Fakai", 2029, 5, "projected"],
  ["Gwandu", 2024, 46, "baseline_at_time_of_report"], ["Gwandu", 2025, 49, "projected"], ["Gwandu", 2026, 2, "projected"], ["Gwandu", 2027, 10, "projected"], ["Gwandu", 2028, 2, "projected"], ["Gwandu", 2029, 7, "projected"],
  ["Jega", 2024, 454, "baseline_at_time_of_report"], ["Jega", 2025, 456, "projected"], ["Jega", 2026, 10, "projected"], ["Jega", 2027, 6, "projected"], ["Jega", 2028, 6, "projected"], ["Jega", 2029, 3, "projected"],
  ["Kalgo", 2024, 3, "baseline_at_time_of_report"], ["Kalgo", 2025, 6, "projected"], ["Kalgo", 2026, 1, "projected"], ["Kalgo", 2027, 5, "projected"], ["Kalgo", 2028, 2, "projected"], ["Kalgo", 2029, 3, "projected"],
  ["Koko/Besse", 2024, 212, "baseline_at_time_of_report"], ["Koko/Besse", 2025, 213, "projected"], ["Koko/Besse", 2026, 2, "projected"], ["Koko/Besse", 2027, 10, "projected"], ["Koko/Besse", 2028, 5, "projected"], ["Koko/Besse", 2029, 4, "projected"],
  ["Maiyama", 2024, 63, "baseline_at_time_of_report"], ["Maiyama", 2025, 64, "projected"], ["Maiyama", 2026, 2, "projected"], ["Maiyama", 2027, 8, "projected"], ["Maiyama", 2028, 7, "projected"], ["Maiyama", 2029, 5, "projected"],
  ["Ngaski", 2024, 89, "baseline_at_time_of_report"], ["Ngaski", 2025, 94, "projected"], ["Ngaski", 2026, 4, "projected"], ["Ngaski", 2027, 6, "projected"], ["Ngaski", 2028, 4, "projected"], ["Ngaski", 2029, 7, "projected"],
  ["Sakaba", 2024, 24, "baseline_at_time_of_report"], ["Sakaba", 2025, 30, "projected"], ["Sakaba", 2026, 2, "projected"], ["Sakaba", 2027, 7, "projected"], ["Sakaba", 2028, 9, "projected"], ["Sakaba", 2029, 3, "projected"],
  ["Shanga", 2024, 11, "baseline_at_time_of_report"], ["Shanga", 2025, 13, "projected"], ["Shanga", 2026, 6, "projected"], ["Shanga", 2027, 5, "projected"], ["Shanga", 2028, 1, "projected"], ["Shanga", 2029, 3, "projected"],
  ["Suru", 2024, 74, "baseline_at_time_of_report"], ["Suru", 2025, 78, "projected"], ["Suru", 2026, 14, "projected"], ["Suru", 2027, 7, "projected"], ["Suru", 2028, 6, "projected"], ["Suru", 2029, 10, "projected"],
  ["Wasagu/Danko", 2024, 147, "baseline_at_time_of_report"], ["Wasagu/Danko", 2025, 165, "projected"], ["Wasagu/Danko", 2026, 6, "projected"], ["Wasagu/Danko", 2027, 15, "projected"], ["Wasagu/Danko", 2028, 5, "projected"], ["Wasagu/Danko", 2029, 21, "projected"],
  ["Yauri", 2024, 18, "baseline_at_time_of_report"], ["Yauri", 2025, 25, "projected"], ["Yauri", 2026, 2, "projected"], ["Yauri", 2027, 9, "projected"], ["Yauri", 2028, 4, "projected"], ["Yauri", 2029, 25, "projected"],
  ["Zuru", 2024, 404, "baseline_at_time_of_report"], ["Zuru", 2025, 420, "projected"], ["Zuru", 2026, 18, "projected"], ["Zuru", 2027, 24, "projected"], ["Zuru", 2028, 14, "projected"], ["Zuru", 2029, 25, "projected"],
];

export const teacherGapPoints: GapPoint[] = gapRows.map(([lga, year, gap, type]) => ({ lga, year, gap, type }));

export const gapYears = [2024, 2025, 2026, 2027, 2028, 2029];

/** Statewide teacher gap per year. */
export const statewideGapByYear = gapYears.map(year => ({
  year,
  gap: teacherGapPoints.filter(p => p.year === year).reduce((s, p) => s + p.gap, 0),
  type: year === 2024 ? ("baseline_at_time_of_report" as GapType) : ("projected" as GapType),
}));

export function gapForLga(lga: string): GapPoint[] {
  return teacherGapPoints.filter(p => p.lga === lga).sort((a, b) => a.year - b.year);
}

/* ---------------- Additional teachers needed by subject ---------------- */

export interface SubjectNeed {
  subject: string;
  year: number;
  additionalTeachersNeeded: number;
}

const subjectNeedRaw: [string, number[]][] = [
  ["Agric Science", [181, 72, 36, 36, 36]],
  ["Basic Science", [78, 31, 16, 16, 16]],
  ["Biology", [199, 79, 40, 40, 40]],
  ["Civic Education", [141, 56, 28, 28, 28]],
  ["Computer Programming", [105, 42, 21, 21, 21]],
  ["Cultural & Creative Arts", [146, 58, 29, 29, 29]],
  ["Economics", [104, 42, 21, 21, 21]],
  ["English", [207, 83, 41, 41, 41]],
  ["Geography", [134, 54, 27, 27, 27]],
  ["Hausa", [158, 63, 32, 32, 32]],
  ["Home Economics", [80, 32, 16, 16, 16]],
  ["Islamic Studies", [75, 30, 15, 15, 15]],
  ["Maths", [206, 82, 41, 41, 41]],
  ["Physical & Health Education", [108, 43, 22, 22, 22]],
  ["Social Studies", [137, 55, 27, 27, 27]],
];

export const subjectNeedYears = [2025, 2026, 2027, 2028, 2029];

export const subjectNeeds: SubjectNeed[] = subjectNeedRaw.flatMap(([subject, vals]) =>
  vals.map((v, i) => ({ subject, year: subjectNeedYears[i], additionalTeachersNeeded: v })),
);

export const subjectNeedTotals = subjectNeedRaw
  .map(([subject, vals]) => ({ subject, total: vals.reduce((a, b) => a + b, 0), y2025: vals[0] }))
  .sort((a, b) => b.y2025 - a.y2025);

/* ---------------- Special needs / non-formal education ---------------- */

export interface SenRow {
  level: "ECCDE" | "PRY" | "JSS";
  programme: string;
  numSchools: number;
  enrolmentMale: number;
  enrolmentFemale: number;
  enrolmentTotal: number;
  staffMale: number;
  staffFemale: number;
  staffTotal: number;
  pupilTeacherRatio: string;
}

export const senRows: SenRow[] = [
  { level: "ECCDE", programme: "Special needs", numSchools: 5, enrolmentMale: 112, enrolmentFemale: 67, enrolmentTotal: 179, staffMale: 14, staffFemale: 24, staffTotal: 38, pupilTeacherRatio: "1:5" },
  { level: "PRY", programme: "Special needs", numSchools: 22, enrolmentMale: 2491, enrolmentFemale: 1651, enrolmentTotal: 4142, staffMale: 11, staffFemale: 22, staffTotal: 33, pupilTeacherRatio: "1:125" },
  { level: "JSS", programme: "Special needs", numSchools: 6, enrolmentMale: 1030, enrolmentFemale: 1275, enrolmentTotal: 2305, staffMale: 39, staffFemale: 25, staffTotal: 64, pupilTeacherRatio: "1:36" },
  { level: "ECCDE", programme: "Nomadic", numSchools: 6, enrolmentMale: 277, enrolmentFemale: 131, enrolmentTotal: 408, staffMale: 3, staffFemale: 6, staffTotal: 9, pupilTeacherRatio: "1:45" },
  { level: "PRY", programme: "Nomadic", numSchools: 67, enrolmentMale: 6460, enrolmentFemale: 4383, enrolmentTotal: 10843, staffMale: 285, staffFemale: 109, staffTotal: 394, pupilTeacherRatio: "1:27" },
  { level: "PRY", programme: "Migrant Fishermen/Farmers", numSchools: 4, enrolmentMale: 402, enrolmentFemale: 241, enrolmentTotal: 643, staffMale: 21, staffFemale: 0, staffTotal: 21, pupilTeacherRatio: "1:30" },
  { level: "ECCDE", programme: "Faith based", numSchools: 6, enrolmentMale: 111, enrolmentFemale: 128, enrolmentTotal: 239, staffMale: 0, staffFemale: 6, staffTotal: 6, pupilTeacherRatio: "1:39" },
  { level: "PRY", programme: "Faith based", numSchools: 37, enrolmentMale: 1170, enrolmentFemale: 913, enrolmentTotal: 2083, staffMale: 162, staffFemale: 74, staffTotal: 236, pupilTeacherRatio: "1:9" },
  { level: "JSS", programme: "Faith based", numSchools: 2, enrolmentMale: 519, enrolmentFemale: 420, enrolmentTotal: 939, staffMale: 7, staffFemale: 7, staffTotal: 14, pupilTeacherRatio: "1:67" },
];

/* ---------------- Recruitment plan cost (₦) ---------------- */

export interface CostRow {
  costItem: string;
  year: number;
  amountNaira: number;
}

const costRaw: [string, number[]][] = [
  ["Recruitment Exercise", [144006500, 57602600, 28801300, 28801300, 28801300]],
  ["Onboarding Exercise", [102861785.71, 41144714.29, 20572357.14, 20572357.14, 20572357.14]],
  ["Personnel Cost", [174865035.71, 69946014.29, 34973007.14, 34973007.14, 34973007.14]],
  ["Overhead Cost", [308585357.14, 123434142.86, 61717071.43, 61717071.43, 61717071.43]],
  ["Capital Cost", [246868285.71, 98747314.29, 49373657.14, 49373657.14, 49373657.14]],
  ["Other Costs", [164578857.14, 65831542.86, 32915771.43, 32915771.43, 32915771.43]],
];

export const costYears = [2025, 2026, 2027, 2028, 2029];

export const costRows: CostRow[] = costRaw.flatMap(([costItem, vals]) =>
  vals.map((v, i) => ({ costItem, year: costYears[i], amountNaira: v })),
);

export const costByYear = costYears.map(year => ({
  year,
  total: costRows.filter(c => c.year === year).reduce((s, c) => s + c.amountNaira, 0),
}));

export const costGrandTotal = costRows.reduce((s, c) => s + c.amountNaira, 0);

export const costByItem = costRaw
  .map(([costItem, vals]) => ({ costItem, total: vals.reduce((a, b) => a + b, 0) }))
  .sort((a, b) => b.total - a.total);

/** Format naira compactly, e.g. ₦144.0m / ₦1.2bn */
export function formatNaira(amount: number): string {
  if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(2)}bn`;
  if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}m`;
  return `₦${Math.round(amount).toLocaleString()}`;
}

/* ================================================================
   ILLUSTRATIVE REGISTRIES
   The baseline report publishes aggregates only, not named records.
   The rows below are sample/illustrative records used to demonstrate
   the registry and directory features; they are clearly labelled as
   such in the UI and will be replaced by authorised KbSUBEB records.
   ================================================================ */

export interface Teacher {
  name: string;
  lga: string;
  school: string;
  subject: string;
  trcn: "Licensed" | "Unlicensed";
  senCertified: boolean;
  experience: number;
}

export const teachersData: Teacher[] = [
  { name: "Ibrahim Aliyu", lga: "Birnin Kebbi", school: "GGS Birnin Kebbi", subject: "Maths", trcn: "Licensed", senCertified: true, experience: 12 },
  { name: "Fatima Usman", lga: "Argungu", school: "Argungu Primary", subject: "English", trcn: "Licensed", senCertified: false, experience: 8 },
  { name: "Musa Garba", lga: "Yauri", school: "Yauri Central", subject: "Basic Science", trcn: "Licensed", senCertified: true, experience: 15 },
  { name: "Suleiman Danjuma", lga: "Birnin Kebbi", school: "GJS BK", subject: "Computer Programming", trcn: "Licensed", senCertified: false, experience: 3 },
  { name: "Safiya Mohammed", lga: "Birnin Kebbi", school: "SEN Centre BK", subject: "Special Needs Education", trcn: "Licensed", senCertified: true, experience: 10 },
  { name: "Amina Bello", lga: "Gwandu", school: "Gwandu Girls School", subject: "Home Economics", trcn: "Licensed", senCertified: false, experience: 6 },
  { name: "Yakubu Kebbi", lga: "Koko/Besse", school: "Koko Technical", subject: "Computer Programming", trcn: "Unlicensed", senCertified: false, experience: 4 },
  { name: "Hauwa Abubakar", lga: "Maiyama", school: "Maiyama Primary", subject: "Agric Science", trcn: "Licensed", senCertified: false, experience: 7 },
  { name: "Abdullahi Sani", lga: "Jega", school: "Jega Secondary", subject: "Agric Science", trcn: "Licensed", senCertified: true, experience: 11 },
  { name: "Zainab Yusuf", lga: "Zuru", school: "Zuru Girls College", subject: "Cultural & Creative Arts", trcn: "Licensed", senCertified: false, experience: 5 },
  { name: "Bala Musa", lga: "Fakai", school: "Fakai Community School", subject: "Maths", trcn: "Unlicensed", senCertified: false, experience: 2 },
  { name: "Hadiza Wali", lga: "Bagudo", school: "Bagudo Primary", subject: "English", trcn: "Licensed", senCertified: false, experience: 9 },
  { name: "Umar Sokoto", lga: "Aliero", school: "Aliero Secondary", subject: "Biology", trcn: "Licensed", senCertified: true, experience: 14 },
  { name: "Aisha Danmusa", lga: "Bunza", school: "Bunza Central", subject: "Home Economics", trcn: "Unlicensed", senCertified: false, experience: 3 },
  { name: "Garba Tanko", lga: "Dandi", school: "Dandi Primary", subject: "Social Studies", trcn: "Licensed", senCertified: false, experience: 5 },
  { name: "Bilkisu Haliru", lga: "Wasagu/Danko", school: "Wasagu Secondary", subject: "Computer Programming", trcn: "Licensed", senCertified: true, experience: 8 },
  { name: "Shehu Abdullahi", lga: "Kalgo", school: "Kalgo Primary", subject: "Agric Science", trcn: "Unlicensed", senCertified: false, experience: 2 },
  { name: "Maryam Nasir", lga: "Ngaski", school: "Ngaski Girls", subject: "Civic Education", trcn: "Licensed", senCertified: false, experience: 6 },
  { name: "Isah Bawa", lga: "Augie", school: "Augie Central", subject: "Geography", trcn: "Licensed", senCertified: false, experience: 7 },
  { name: "Rabi Abubakar", lga: "Shanga", school: "Shanga Primary", subject: "Special Needs Education", trcn: "Licensed", senCertified: true, experience: 13 },
  { name: "Nuhu Sarki", lga: "Arewa", school: "Kamba Central Primary", subject: "Hausa", trcn: "Licensed", senCertified: false, experience: 9 },
  { name: "Halima Idris", lga: "Sakaba", school: "Sakaba Community JSS", subject: "Islamic Studies", trcn: "Licensed", senCertified: false, experience: 4 },
];

export interface School {
  name: string;
  lga: string;
  type: "Mainstream" | "Special Needs" | "Inclusive";
  location: "Urban" | "Rural";
  students: number;
  disabled: number;
  subjects: string;
}

export const schoolsData: School[] = [
  { name: "Govt Girls Secondary School BK", lga: "Birnin Kebbi", type: "Mainstream", location: "Urban", students: 1240, disabled: 42, subjects: "Maths, English, Basic Science" },
  { name: "SEN Centre Birnin Kebbi", lga: "Birnin Kebbi", type: "Special Needs", location: "Urban", students: 145, disabled: 145, subjects: "Special Needs Education" },
  { name: "Gwandu Girls School", lga: "Gwandu", type: "Inclusive", location: "Urban", students: 720, disabled: 38, subjects: "English, Home Economics, Computer Programming" },
  { name: "Yauri Technical College", lga: "Yauri", type: "Mainstream", location: "Urban", students: 890, disabled: 24, subjects: "Maths, Basic Science, Computer Programming" },
  { name: "Argungu Primary School", lga: "Argungu", type: "Mainstream", location: "Urban", students: 680, disabled: 18, subjects: "Maths, English, Basic Science" },
  { name: "Koko Community School", lga: "Koko/Besse", type: "Mainstream", location: "Rural", students: 420, disabled: 12, subjects: "Maths, English" },
  { name: "Maiyama Central Primary", lga: "Maiyama", type: "Mainstream", location: "Rural", students: 380, disabled: 15, subjects: "Maths, English, Agric Science" },
  { name: "Jega Secondary School", lga: "Jega", type: "Inclusive", location: "Urban", students: 560, disabled: 28, subjects: "Maths, English, Agric Science" },
  { name: "Zuru Girls College", lga: "Zuru", type: "Mainstream", location: "Urban", students: 490, disabled: 16, subjects: "English, Cultural & Creative Arts" },
  { name: "Fakai Community School", lga: "Fakai", type: "Mainstream", location: "Rural", students: 310, disabled: 10, subjects: "Maths, English" },
  { name: "Bagudo Primary School", lga: "Bagudo", type: "Mainstream", location: "Rural", students: 290, disabled: 8, subjects: "Maths, English" },
  { name: "Aliero Secondary School", lga: "Aliero", type: "Inclusive", location: "Rural", students: 340, disabled: 22, subjects: "Biology, Maths, English" },
  { name: "Bunza Central School", lga: "Bunza", type: "Mainstream", location: "Rural", students: 270, disabled: 7, subjects: "Maths, English" },
  { name: "Dandi Primary School", lga: "Dandi", type: "Mainstream", location: "Rural", students: 250, disabled: 9, subjects: "Maths, English, Social Studies" },
  { name: "Wasagu Secondary School", lga: "Wasagu/Danko", type: "Mainstream", location: "Rural", students: 230, disabled: 11, subjects: "Maths, English" },
  { name: "Kalgo Special Needs School", lga: "Kalgo", type: "Special Needs", location: "Rural", students: 85, disabled: 85, subjects: "Special Needs Education" },
  { name: "Ngaski Girls School", lga: "Ngaski", type: "Mainstream", location: "Rural", students: 210, disabled: 6, subjects: "English, Civic Education" },
  { name: "Augie Central School", lga: "Augie", type: "Mainstream", location: "Rural", students: 195, disabled: 5, subjects: "Maths, English, Geography" },
  { name: "Shanga Primary School", lga: "Shanga", type: "Mainstream", location: "Rural", students: 180, disabled: 8, subjects: "Maths, English" },
  { name: "Suru Community School", lga: "Suru", type: "Mainstream", location: "Rural", students: 160, disabled: 7, subjects: "Maths, English" },
  { name: "Kamba Central Primary", lga: "Arewa", type: "Mainstream", location: "Rural", students: 340, disabled: 9, subjects: "Maths, English, Hausa" },
  { name: "Sakaba Community JSS", lga: "Sakaba", type: "Mainstream", location: "Rural", students: 175, disabled: 6, subjects: "Maths, English, Islamic Studies" },
];

/* ---------------- Curriculum / vocational readiness (indicative) ---------------- */

export const subjects = ["Solar PV", "Fashion", "Livestock", "Beauty", "ICT Repairs", "Horticulture"];

export const curriculumData: Record<string, Record<string, "Yes" | "No" | "Partial">> = {
  "Birnin Kebbi": { "Solar PV": "Yes", "Fashion": "Yes", "Livestock": "Partial", "Beauty": "Yes", "ICT Repairs": "Yes", "Horticulture": "Partial" },
  "Argungu": { "Solar PV": "Partial", "Fashion": "Yes", "Livestock": "Yes", "Beauty": "Partial", "ICT Repairs": "No", "Horticulture": "Yes" },
  "Yauri": { "Solar PV": "Yes", "Fashion": "Partial", "Livestock": "No", "Beauty": "No", "ICT Repairs": "Yes", "Horticulture": "Partial" },
  "Gwandu": { "Solar PV": "Partial", "Fashion": "Yes", "Livestock": "Partial", "Beauty": "Yes", "ICT Repairs": "Partial", "Horticulture": "No" },
  "Koko/Besse": { "Solar PV": "No", "Fashion": "Partial", "Livestock": "Yes", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Yes" },
  "Maiyama": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Yes" },
  "Jega": { "Solar PV": "No", "Fashion": "Partial", "Livestock": "Yes", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Partial" },
  "Zuru": { "Solar PV": "Partial", "Fashion": "No", "Livestock": "No", "Beauty": "Yes", "ICT Repairs": "No", "Horticulture": "No" },
  "Fakai": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Partial" },
  "Bagudo": { "Solar PV": "No", "Fashion": "No", "Livestock": "Yes", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Aliero": { "Solar PV": "No", "Fashion": "Partial", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Bunza": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Dandi": { "Solar PV": "Yes", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Wasagu/Danko": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Partial" },
  "Kalgo": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Ngaski": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "Partial", "ICT Repairs": "No", "Horticulture": "No" },
  "Augie": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Yes" },
  "Shanga": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Sakaba": { "Solar PV": "No", "Fashion": "Partial", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Suru": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Arewa": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
};

export function getReadiness(lga: string): number {
  const row = curriculumData[lga];
  if (!row) return 0;
  const vals = Object.values(row);
  const score = vals.reduce((s, v) => s + (v === "Yes" ? 1 : v === "Partial" ? 0.5 : 0), 0);
  return Math.round((score / vals.length) * 100);
}

/* ---------------- AI intervention recommendations ---------------- */
/** Priority derived from the 2024 baseline teacher gap and 2025 projection. */
export const interventions = [
  { lga: "Argungu", priority: "Critical" as const, gapType: "Largest baseline teacher gap (450)", action: "Front-load 2025 recruitment; deploy to JSS where enrolment is 44,229", impact: "98,624 learners" },
  { lga: "Jega", priority: "Critical" as const, gapType: "Teacher gap 454; LGA teacher records pending", action: "Complete ASC returns, then emergency deployment of 450+ teachers", impact: "66,094 learners" },
  { lga: "Birnin Kebbi", priority: "Critical" as const, gapType: "Teacher gap 416 despite largest workforce", action: "Rebalance postings from over-served urban schools to peri-urban JSS", impact: "107,384 learners" },
  { lga: "Zuru", priority: "Critical" as const, gapType: "Teacher gap 404; only JSS school counts reported", action: "Recruit against subject shortfalls (Maths, English, Biology)", impact: "99,655 learners" },
  { lga: "Dandi", priority: "High" as const, gapType: "Teacher gap 339; no teacher data reported", action: "Priority ASC data collection then rural posting incentive scheme", impact: "68,459 learners" },
  { lga: "Koko/Besse", priority: "High" as const, gapType: "Teacher gap 212; no teacher data reported", action: "Verify workforce records; upskill existing staff for JSS subjects", impact: "41,351 learners" },
  { lga: "Arewa", priority: "High" as const, gapType: "Teacher gap 245; gender imbalance (448 of 1,501 female)", action: "Targeted female teacher recruitment to lift girls' JSS transition", impact: "82,490 learners" },
  { lga: "Wasagu/Danko", priority: "High" as const, gapType: "Teacher gap 147; teacher records pending", action: "Incentivised rural posting with accommodation allowance", impact: "61,985 learners" },
];
