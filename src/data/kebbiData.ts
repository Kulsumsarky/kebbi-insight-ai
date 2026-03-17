export interface LGAData {
  name: string;
  schools: number;
  teachers: number;
  senTeachers: number;
  students: number;
  disabledStudents: number;
  gapSeverity: number;
}

export const lgaData: LGAData[] = [
  { name: "Birnin Kebbi", schools: 98, teachers: 621, senTeachers: 42, students: 34200, disabledStudents: 1710, gapSeverity: 18 },
  { name: "Argungu", schools: 72, teachers: 387, senTeachers: 28, students: 22100, disabledStudents: 1105, gapSeverity: 24 },
  { name: "Yauri", schools: 58, teachers: 298, senTeachers: 19, students: 18400, disabledStudents: 920, gapSeverity: 31 },
  { name: "Gwandu", schools: 54, teachers: 276, senTeachers: 17, students: 17200, disabledStudents: 860, gapSeverity: 28 },
  { name: "Koko/Besse", schools: 42, teachers: 198, senTeachers: 11, students: 13400, disabledStudents: 670, gapSeverity: 38 },
  { name: "Maiyama", schools: 38, teachers: 176, senTeachers: 9, students: 12100, disabledStudents: 605, gapSeverity: 42 },
  { name: "Jega", schools: 35, teachers: 162, senTeachers: 8, students: 11300, disabledStudents: 565, gapSeverity: 44 },
  { name: "Zuru", schools: 33, teachers: 154, senTeachers: 7, students: 10800, disabledStudents: 540, gapSeverity: 46 },
  { name: "Fakai", schools: 30, teachers: 138, senTeachers: 6, students: 9800, disabledStudents: 490, gapSeverity: 50 },
  { name: "Bagudo", schools: 28, teachers: 124, senTeachers: 5, students: 8900, disabledStudents: 445, gapSeverity: 53 },
  { name: "Aliero", schools: 26, teachers: 118, senTeachers: 5, students: 8400, disabledStudents: 420, gapSeverity: 54 },
  { name: "Bunza", schools: 24, teachers: 112, senTeachers: 5, students: 7900, disabledStudents: 395, gapSeverity: 55 },
  { name: "Dandi", schools: 22, teachers: 98, senTeachers: 4, students: 7200, disabledStudents: 360, gapSeverity: 58 },
  { name: "Danko/Wasagu", schools: 21, teachers: 94, senTeachers: 4, students: 7000, disabledStudents: 350, gapSeverity: 61 },
  { name: "Kalgo", schools: 20, teachers: 88, senTeachers: 3, students: 6500, disabledStudents: 325, gapSeverity: 60 },
  { name: "Ngaski", schools: 19, teachers: 82, senTeachers: 3, students: 6200, disabledStudents: 310, gapSeverity: 62 },
  { name: "Augie", schools: 18, teachers: 76, senTeachers: 3, students: 5800, disabledStudents: 290, gapSeverity: 63 },
  { name: "Shanga", schools: 17, teachers: 68, senTeachers: 2, students: 5200, disabledStudents: 260, gapSeverity: 78 },
  { name: "Sakaba", schools: 16, teachers: 62, senTeachers: 2, students: 4900, disabledStudents: 245, gapSeverity: 65 },
  { name: "Suru", schools: 15, teachers: 54, senTeachers: 2, students: 4400, disabledStudents: 220, gapSeverity: 82 },
  { name: "Kamba", schools: 13, teachers: 48, senTeachers: 2, students: 3900, disabledStudents: 195, gapSeverity: 70 },
];

export const totalTeachers = lgaData.reduce((s, l) => s + l.teachers, 0);
export const totalSenTeachers = lgaData.reduce((s, l) => s + l.senTeachers, 0);
export const totalStudents = lgaData.reduce((s, l) => s + l.students, 0);
export const totalDisabled = lgaData.reduce((s, l) => s + l.disabledStudents, 0);
export const totalSchools = lgaData.reduce((s, l) => s + l.schools, 0);

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
  { name: "Ibrahim Aliyu", lga: "Birnin Kebbi", school: "GGS Birnin Kebbi", subject: "Mathematics", trcn: "Licensed", senCertified: true, experience: 12 },
  { name: "Fatima Usman", lga: "Argungu", school: "Argungu Primary", subject: "English Language", trcn: "Licensed", senCertified: false, experience: 8 },
  { name: "Musa Garba", lga: "Yauri", school: "Yauri Central", subject: "Science", trcn: "Licensed", senCertified: true, experience: 15 },
  { name: "Suleiman Danjuma", lga: "Birnin Kebbi", school: "GJS BK", subject: "Solar PV Installation", trcn: "Licensed", senCertified: false, experience: 3 },
  { name: "Safiya Mohammed", lga: "Birnin Kebbi", school: "SEN Centre BK", subject: "Special Needs Education", trcn: "Licensed", senCertified: true, experience: 10 },
  { name: "Amina Bello", lga: "Gwandu", school: "Gwandu Girls School", subject: "Fashion Design", trcn: "Licensed", senCertified: false, experience: 6 },
  { name: "Yakubu Kebbi", lga: "Koko/Besse", school: "Koko Technical", subject: "Computer Hardware", trcn: "Unlicensed", senCertified: false, experience: 4 },
  { name: "Hauwa Abubakar", lga: "Maiyama", school: "Maiyama Primary", subject: "Horticulture", trcn: "Licensed", senCertified: false, experience: 7 },
  { name: "Abdullahi Sani", lga: "Jega", school: "Jega Secondary", subject: "Livestock Farming", trcn: "Licensed", senCertified: true, experience: 11 },
  { name: "Zainab Yusuf", lga: "Zuru", school: "Zuru Girls College", subject: "Beauty & Cosmetology", trcn: "Licensed", senCertified: false, experience: 5 },
  { name: "Bala Musa", lga: "Fakai", school: "Fakai Community School", subject: "Mathematics", trcn: "Unlicensed", senCertified: false, experience: 2 },
  { name: "Hadiza Wali", lga: "Bagudo", school: "Bagudo Primary", subject: "English Language", trcn: "Licensed", senCertified: false, experience: 9 },
  { name: "Umar Sokoto", lga: "Aliero", school: "Aliero Secondary", subject: "Science", trcn: "Licensed", senCertified: true, experience: 14 },
  { name: "Aisha Danmusa", lga: "Bunza", school: "Bunza Central", subject: "Fashion Design", trcn: "Unlicensed", senCertified: false, experience: 3 },
  { name: "Garba Tanko", lga: "Dandi", school: "Dandi Primary", subject: "Solar PV Installation", trcn: "Licensed", senCertified: false, experience: 5 },
  { name: "Bilkisu Haliru", lga: "Danko/Wasagu", school: "Danko Secondary", subject: "Computer Hardware", trcn: "Licensed", senCertified: true, experience: 8 },
  { name: "Shehu Abdullahi", lga: "Kalgo", school: "Kalgo Primary", subject: "Livestock Farming", trcn: "Unlicensed", senCertified: false, experience: 2 },
  { name: "Maryam Nasir", lga: "Ngaski", school: "Ngaski Girls", subject: "Beauty & Cosmetology", trcn: "Licensed", senCertified: false, experience: 6 },
  { name: "Isah Bawa", lga: "Augie", school: "Augie Central", subject: "Horticulture", trcn: "Licensed", senCertified: false, experience: 7 },
  { name: "Rabi Abubakar", lga: "Shanga", school: "Shanga Primary", subject: "Special Needs Education", trcn: "Licensed", senCertified: true, experience: 13 },
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
  { name: "Govt Girls Secondary School BK", lga: "Birnin Kebbi", type: "Mainstream", location: "Urban", students: 1240, disabled: 42, subjects: "Maths, English, Science, Solar PV" },
  { name: "SEN Centre Birnin Kebbi", lga: "Birnin Kebbi", type: "Special Needs", location: "Urban", students: 145, disabled: 145, subjects: "Special Needs Education" },
  { name: "Gwandu Girls School", lga: "Gwandu", type: "Inclusive", location: "Urban", students: 720, disabled: 38, subjects: "English, Fashion Design, ICT" },
  { name: "Yauri Technical College", lga: "Yauri", type: "Mainstream", location: "Urban", students: 890, disabled: 24, subjects: "Maths, Science, Computer Hardware" },
  { name: "Argungu Primary School", lga: "Argungu", type: "Mainstream", location: "Urban", students: 680, disabled: 18, subjects: "Maths, English, Science" },
  { name: "Koko Community School", lga: "Koko/Besse", type: "Mainstream", location: "Rural", students: 420, disabled: 12, subjects: "Maths, English" },
  { name: "Maiyama Central Primary", lga: "Maiyama", type: "Mainstream", location: "Rural", students: 380, disabled: 15, subjects: "Maths, English, Horticulture" },
  { name: "Jega Secondary School", lga: "Jega", type: "Inclusive", location: "Urban", students: 560, disabled: 28, subjects: "Maths, English, Livestock" },
  { name: "Zuru Girls College", lga: "Zuru", type: "Mainstream", location: "Urban", students: 490, disabled: 16, subjects: "English, Beauty & Cosmetology" },
  { name: "Fakai Community School", lga: "Fakai", type: "Mainstream", location: "Rural", students: 310, disabled: 10, subjects: "Maths, English" },
  { name: "Bagudo Primary School", lga: "Bagudo", type: "Mainstream", location: "Rural", students: 290, disabled: 8, subjects: "Maths, English" },
  { name: "Aliero Secondary School", lga: "Aliero", type: "Inclusive", location: "Rural", students: 340, disabled: 22, subjects: "Science, Maths, English" },
  { name: "Bunza Central School", lga: "Bunza", type: "Mainstream", location: "Rural", students: 270, disabled: 7, subjects: "Maths, English" },
  { name: "Dandi Primary School", lga: "Dandi", type: "Mainstream", location: "Rural", students: 250, disabled: 9, subjects: "Maths, English, Solar PV" },
  { name: "Danko Secondary School", lga: "Danko/Wasagu", type: "Mainstream", location: "Rural", students: 230, disabled: 11, subjects: "Maths, English" },
  { name: "Kalgo Primary School", lga: "Kalgo", type: "Special Needs", location: "Rural", students: 85, disabled: 85, subjects: "Special Needs Education" },
  { name: "Ngaski Girls School", lga: "Ngaski", type: "Mainstream", location: "Rural", students: 210, disabled: 6, subjects: "English, Beauty & Cosmetology" },
  { name: "Augie Central School", lga: "Augie", type: "Mainstream", location: "Rural", students: 195, disabled: 5, subjects: "Maths, English, Horticulture" },
  { name: "Shanga Primary School", lga: "Shanga", type: "Mainstream", location: "Rural", students: 180, disabled: 8, subjects: "Maths, English" },
  { name: "Suru Community School", lga: "Suru", type: "Mainstream", location: "Rural", students: 160, disabled: 7, subjects: "Maths, English" },
];

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
  "Danko/Wasagu": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Partial" },
  "Kalgo": { "Solar PV": "No", "Fashion": "No", "Livestock": "Partial", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Ngaski": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "Partial", "ICT Repairs": "No", "Horticulture": "No" },
  "Augie": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "Yes" },
  "Shanga": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Sakaba": { "Solar PV": "No", "Fashion": "Partial", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Suru": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
  "Kamba": { "Solar PV": "No", "Fashion": "No", "Livestock": "No", "Beauty": "No", "ICT Repairs": "No", "Horticulture": "No" },
};

export const subjects = ["Solar PV", "Fashion", "Livestock", "Beauty", "ICT Repairs", "Horticulture"];

export function getReadiness(lga: string): number {
  const row = curriculumData[lga];
  if (!row) return 0;
  const vals = Object.values(row);
  const score = vals.reduce((s, v) => s + (v === "Yes" ? 1 : v === "Partial" ? 0.5 : 0), 0);
  return Math.round((score / vals.length) * 100);
}

export const performanceData = {
  years: [2022, 2023, 2024],
  lgaPass: {
    "Birnin Kebbi": [68, 71, 74],
    "Argungu": [62, 60, 63],
    "Yauri": [55, 53, 50],
    "Gwandu": [58, 56, 54],
  },
  subjectTrend: {
    "Mathematics": [42, 44, 46],
    "English": [55, 57, 59],
    "Science": [48, 46, 44],
    "Vocational": [30, 35, 38],
  },
  decliningLGAs: [
    { lga: "Yauri", y2022: 55, y2023: 53, y2024: 50, change: -5, action: "Targeted teacher training" },
    { lga: "Gwandu", y2022: 58, y2023: 56, y2024: 54, change: -4, action: "Curriculum support intervention" },
    { lga: "Zuru", y2022: 50, y2023: 47, y2024: 43, change: -7, action: "Emergency academic support" },
    { lga: "Fakai", y2022: 45, y2023: 42, y2024: 38, change: -7, action: "Full academic review needed" },
  ],
};

export const aiPredictions = {
  supplyDemand: {
    years: [2022, 2023, 2024, 2025, 2026],
    supply: [1820, 1940, 2080, 2180, 2250],
    demand: [2200, 2450, 2700, 2900, 3050],
  },
  senRatio: {
    years: [2022, 2023, 2024, 2025, 2026],
    actual: [38, 42, 46, 58, 73],
    recommended: [25, 25, 25, 25, 25],
  },
  interventions: [
    { lga: "Suru", priority: "Critical" as const, gapType: "Teacher shortage + SEN", action: "Emergency deployment of 45 teachers; prioritise SEN certification", impact: "~4,400 students" },
    { lga: "Shanga", priority: "Critical" as const, gapType: "Vocational + SEN gap", action: "Partner with NABTEB for trade teacher recruitment", impact: "~5,200 students" },
    { lga: "Sakaba", priority: "High" as const, gapType: "Curriculum readiness", action: "Enrol existing teachers in 6-week vocational upskilling", impact: "~4,900 students" },
    { lga: "Danko/Wasagu", priority: "High" as const, gapType: "Rural teacher access", action: "Incentivised rural posting scheme with accommodation allowance", impact: "~7,000 students" },
    { lga: "Kalgo", priority: "High" as const, gapType: "SEN ratio 1:65", action: "Train 5 mainstream teachers as SEN specialists via NCCE", impact: "~6,500 students" },
    { lga: "Kamba", priority: "High" as const, gapType: "All 6 trade subjects absent", action: "Establish vocational hub shared with Birnin Kebbi LGA", impact: "~3,900 students" },
  ],
};
