/** Plain-language helpers so numbers read the same way everywhere. */

/** 119.9 becomes "120 learners for every teacher". */
export const ratioWords = (ltr: number) => `${Math.round(ltr)} learners for every teacher`;

/** The status word shown with its colour. The data calls the lowest band "Low"; the dashboard says "Lower". */
export const statusWord = (urgency: string) => (urgency === "Low" ? "Lower" : urgency);

/** 1 becomes "1st", 12 becomes "12th". */
export const ordinal = (n: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]}`;
};

/** A number with thousands separators, or the word "Pending" when it is not available. */
export const numberOrPending = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n) ? "Pending" : n.toLocaleString();
