export enum Days {
  Sunday = 1,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export function getDayName(dayNumber: number): string {
  return Days[dayNumber] || "Invalid day";
}