import { startWeek, getMonthDays } from './src/utils'

const defineColorParseHandle = (value) => {
  const intValue = isNaN(value) ? 0 : Number(value)
  if (intValue === 0) return '#ebedf0'
  else if (intValue <= 5) return '#c6e48b'
  else if (intValue <= 10) return '#7bc96f'
}

export class ContriGraph {
  constructor(option) {
    const { canvas, size = 10, gapSize = 5, data = [], colorParse, year } = option
    if (!canvas || !canvas.getContext) {
      throw new Error('Miss required param: canvas')
    }
    this.canvas = canvas.getContext('2d')
    this.size = size
    this.gapSize = gapSize
    this.data = Array.isArray(data) && data || []
    this.colorParse = typeof colorParse === 'function' && colorParse || defineColorParseHandle
    this.year = year || new Date().getFullYear()
  }
  createCanvas(x, y, color) {
    this.canvas.fillStyle = color;
    this.canvas.fillRect(x * (this.size + this.gapSize), y * (this.size + this.gapSize), this.size, this.size);
  }
  render(month) {
    if (month) return this.renderMonth(month)
    else return this.renderYear()
  }

  renderMonth(month) {
    const daysOfMonth = getMonthDays(this.year, month);
    const startWeekNum = startWeek(this.year, month);
    const renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfMonth).fill(1))
    console.log(renderPieces)
    renderPieces.forEach((piece, index) => {
      const col = Math.floor(index / 7)
      const row = index % 7
      const color = piece === 0 ? 'rgba(255, 0, 255, 0)' : '#32363d'
      this.createCanvas(col, row, color)
    })
  }
  renderYear() { }
}
