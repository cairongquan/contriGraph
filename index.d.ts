declare module '/utils/index.ts' {
  export function startWeek(year: number, month: number): number;
  export function getMonthDays(year: number, month: number): number;
  export function getYearDays(year: number): number;
  export function addDays(date: string, days: number): string;
}

type ColorParseFunction = (value: number) => string;

interface ContriGraphOption {
  canvas: CanvasRenderingContext2D;
  size?: number;
  gapSize?: number;
  data?: Record<string, number>;
  colorParse?: ColorParseFunction;
  year?: number;
}

declare class ContriGraph {
  private canvas: CanvasRenderingContext2D;
  private size: number;
  private gapSize: number;
  private data: Record<string, number>;
  private colorParse: ColorParseFunction;
  private year: number;

  constructor(option: ContriGraphOption);
  render(month?: number): void;
  private createCanvas(x: number, y: number, color: string): void;
  private renderMonth(month: number): void;
  private renderYear(): void;
}
