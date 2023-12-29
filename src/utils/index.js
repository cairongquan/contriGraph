export function startWeek(year, month) {
  return new Date(Date.parse(year + `-${month}-01`)).getDay()
}

export function getMonthDays(year, month) {
  if (month === 12) return 31
  return Math.trunc(Math.ceil(new Date(Date.parse(year + `-${month + 1}`) - Date.parse(year +
    `-${month}`))) /
    86400000)
}
