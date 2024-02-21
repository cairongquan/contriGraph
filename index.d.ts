// contrib-graph/index.d.ts
type ColorParseFunction = (value: number) => string;

interface ContriGraphOption {
  svg?: SVGElement;
  canvas?: HTMLCanvasElement;
  size?: number;
  gapSize?: number;
  data?: Record<string, number>;
  colorParse?: ColorParseFunction;
  year?: number;
  colorParse?: (value: number) => string;
}

declare class ContriGraph {
  private canvas: HTMLCanvasElement;
  private size: number;
  private gapSize: number;
  private data: Record<string, number>;
  private colorParse: ColorParseFunction;
  private year: number;
  private canvasDom: Element;

  public width: number;
  public height: number;

  constructor(option: ContriGraphOption);
  render(month?: number): void;
  private createCanvas(x: number, y: number, color: string): void;
  private renderMonth(month: number): void;
  private renderYear(): void;
  private getSizeOfCanvas(): void;
}


export default ContriGraph
