export function startWeek(year: number, month: number): number {
  return new Date(Date.parse(year + `-${month}-01`)).getDay()
}

export function getMonthDays(year: number, month: number): number {
  if (month === 12) return 31
  return Math.trunc(Math.ceil(Date.parse(year + `-${month + 1}`) - Date.parse(year +
    `-${month}`)) /
    86400000)
}

export function getYearDays(year: number): number {
  return Math.trunc(Math.ceil(Date.parse(`${(year + 1)}-1-31`) - Date.parse(`${year}-1-31`))) /
    86400000
}

export function addDays(dateString: string, daysToAdd: number): string {
  const date = new Date(dateString);
  date.setDate(date.getDate() + daysToAdd);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
