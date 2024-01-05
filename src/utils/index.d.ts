// utils/index.d.ts

declare module '/src/utils/index' {
  export function startWeek(year: number, month: number): number;
  export function getMonthDays(year: number, month: number): number;
  export function getYearDays(year: number): number;
  export function addDays(date: string, days: number): string;
}
