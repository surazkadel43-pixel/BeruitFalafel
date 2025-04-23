export enum Days {
  Sunday = 0,
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