import { startWeek, getMonthDays, getYearDays, addDays } from './utils'

const defineColorParseHandle = (value: number): string => {
  const intValue = isNaN(value) ? 0 : Number(value)
  if (intValue === 0) return '#1e1f2a'
  else if (intValue <= 5) return '#c6e48b'
  else if (intValue <= 10) return '#7bc96f'
  else return '#2dce49'
}

interface ContriGraphOption {
  canvas: HTMLCanvasElement;
  size?: number;
  gapSize?: number;
  data?: Record<string, number>;
  year?: number;
  colorParse?: (value: number) => string;
}

export class ContriGraph {
  canvas: CanvasRenderingContext2D | null
  size: number
  year: number
  gapSize: number
  data: Record<string, number>
  colorParse: (value: number) => string

  constructor(option: ContriGraphOption) {
    const { canvas, size = 10, gapSize = 5, data = {}, colorParse, year } = option
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Miss required param: canvas')
    }
    this.canvas = canvas.getContext('2d')
    this.size = size
    this.gapSize = gapSize
    this.data = data
    this.colorParse = typeof colorParse === 'function' && colorParse || defineColorParseHandle
    this.year = year || new Date().getFullYear()
  }
  render(month: number): void {
    if (month) return this.renderMonth(month)
    else return this.renderYear()
  }
  ['createCanvas'](x: number, y: number, color: string): void {
    if (this.canvas !== null) {
      this.canvas.fillStyle = color;
      this.canvas.fillRect(x * (this.size + this.gapSize), y * (this.size + this.gapSize), this.size, this.size);
    }
  }
  ['renderMonth'](month: number): void {
    const daysOfMonth = getMonthDays(this.year, month);
    const startWeekNum = startWeek(this.year, month);
    const renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfMonth).fill(1))
    let dateNow = `${this.year}-${month}-01`
    renderPieces.forEach((piece, index) => {
      const col = Math.floor(index / 7)
      const row = index % 7
      let color = ''
      if (piece !== 0) {
        color = color = this.colorParse(this.data[dateNow] ? this.data[dateNow] : 0)
        dateNow = addDays(dateNow, 1)
      } else {
        color = 'rgba(255, 0, 255, 0)'
      }
      this.createCanvas(col, row, color)
    })
  }
  ['renderYear'](): void {
    const startWeekNum = startWeek(this.year, 1);
    const daysOfYear = getYearDays(this.year)
    const renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfYear).fill(1))
    let dateNow = `${this.year}-01-01`
    renderPieces.forEach((piece, index) => {
      const col = Math.floor(index / 7)
      const row = index % 7
      let color = '';
      if (piece !== 0) {
        color = this.colorParse(this.data[dateNow] ? this.data[dateNow] : 0)
        dateNow = addDays(dateNow, 1)
      }
      else {
        color = 'rgba(255, 0, 255, 0)'
      }
      this.createCanvas(col, row, color)
    })
  }
}
