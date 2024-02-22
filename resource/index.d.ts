// contrib-graph/index.d.ts
type ColorParseFunction = (value: number) => string;

interface ContriGraphOption {
  svg?: SVGSVGElement;
  canvas?: HTMLCanvasElement;
  size?: number;
  gapSize?: number;
  data?: Record<string, number>;
  colorParse?: ColorParseFunction;
  year?: number;
  colorParse?: (value: number) => string;
  isSvgOrCanvas: "canvas" | "svg"
  radius?: number
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
  render(month?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12): void;
  private createCanvas(x: number, y: number, color: string): void;
  private createRect(x: number, y: number, color: string): void;
  private getSizeOfCanvas(): void;
  private getSizeOfSvg(): void;
}


export default ContriGraph
