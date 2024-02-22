import { startWeek, getMonthDays, getYearDays, addDays } from './utils/index'

const defineColorParseHandle = (value: number): string => {
  const intValue = isNaN(value) ? 0 : Number(value)
  if (intValue === 0) return '#1e1f2a'
  else if (intValue <= 5) return '#c6e48b'
  else if (intValue <= 10) return '#7bc96f'
  else return '#2dce49'
}

interface ContriGraphOption {
  canvas?: HTMLCanvasElement;
  svg?: SVGElement;
  size?: number;
  gapSize?: number;
  data?: Record<string, number>;
  year?: number;
  colorParse?: (value: number) => string;
  radius?: number;
}

class ContriGraph {
  canvas: CanvasRenderingContext2D | null = null
  svg: SVGSVGElement | null = null
  canvasDom: HTMLCanvasElement | null = null
  size: number
  year: number
  gapSize: number
  data: Record<string, number>
  colorParse: (value: number) => string
  isSvgOrCanvas: "canvas" | "svg"
  radius: number


  public width: number = 0;
  public height: number = 0;

  constructor(option: ContriGraphOption) {
    const { canvas, svg, size = 10, gapSize = 5, data = {}, colorParse, year, radius = 2 } = option
    if (canvas instanceof HTMLCanvasElement) {
      this.isSvgOrCanvas = 'canvas'
      this.canvas = canvas.getContext('2d')
      this.canvasDom = canvas
    }
    else if (svg instanceof SVGSVGElement) {
      this.isSvgOrCanvas = "svg"
      this.svg = svg
    }
    else throw new Error("miss required param: canvas or svg")

    this.size = size
    this.gapSize = gapSize
    this.data = data
    this.colorParse = typeof colorParse === 'function' && colorParse || defineColorParseHandle
    this.year = year || new Date().getFullYear()
    this.radius = radius
  }
  render(month: number): void {
    let renderPieces = [], dateNow = '';
    if (month && !isNaN(month)) {
      const daysOfMonth = getMonthDays(this.year, month);
      const startWeekNum = startWeek(this.year, month);
      renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfMonth).fill(1))
      dateNow = `${this.year}-${String(month).padStart(2, '0')}-01`
    } else {
      const startWeekNum = startWeek(this.year, 1);
      const dayOfYear = getYearDays(this.year);
      renderPieces = new Array(startWeekNum).fill(0).concat(new Array(dayOfYear).fill(1))
      dateNow = `${this.year}-01-01`
    }
    this.isSvgOrCanvas === 'canvas' ? this.getSizeOfCanvas(renderPieces.length) : this.getSizeOfSvg(renderPieces.length)
    let renderRectsStringCode = this.isSvgOrCanvas === 'svg' ? '' : null
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
      this.isSvgOrCanvas === 'canvas' ? this.createCanvas(col, row, color) : renderRectsStringCode += this.createRect(col, row, color)
    })
    this.isSvgOrCanvas === 'svg' && ((this.svg as SVGElement).innerHTML = renderRectsStringCode as string)
  }
  ['createCanvas'](x: number, y: number, color: string): void {
    if (this.canvas !== null) {
      this.canvas.fillStyle = color;
      this.canvas.fillRect(x * (this.size + this.gapSize), y * (this.size + this.gapSize), this.size, this.size);
    }
  }
  ['createRect'](x: number, y: number, color: string): string {
    const xAttrValue = x * this.size + this.gapSize * x
    const yAttrValue = y * this.size + this.gapSize * y
    return `<rect width="${this.size}" height="${this.size}" x="${xAttrValue}" y="${yAttrValue}" rx="${this.radius}" ry="${this.radius}" style="fill:${color}"></rect>`
  }
  ['getSizeOfCanvas'](length: number): void {
    if (this.isSvgOrCanvas === 'canvas') {
      const row = Math.ceil(length / 7)
      const col = 7
      this.width = (row * this.size) + ((row - 1) * this.gapSize);
      this.height = (col * this.size) + ((col - 1) * this.gapSize);

      (this.canvasDom as HTMLCanvasElement).width = this.width;
      (this.canvasDom as HTMLCanvasElement).height = this.height;
    }
  }
  ['getSizeOfSvg'](length: number): void {
    if (this.isSvgOrCanvas === 'svg') {
      const row = Math.ceil(length / 7)
      const col = 7
      this.width = (row * this.size) + ((row - 1) * this.gapSize);
      this.height = (col * this.size) + ((col - 1) * this.gapSize);
      Object.assign((this.svg as SVGSVGElement).style, {
        width: this.width,
        height: this.height
      })
    }
  }
}

export default ContriGraph
