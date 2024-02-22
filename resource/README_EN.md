# ContriGraph

**中文文档: [中文](README.md).**

ContriGraph is a class designed to render GitHub contribution graphs on Canvas.

## Official Website
[ContriGraph Official Website Introduction](https://www.warriro10.top/contriGraphIntro/)

## Installation

Install via npm:
```bash
npm install contrib-graph
```

Usage:
``` javascript

import ContriGraph from 'contrib-graph';

// Create a Canvas element
const canvas = document.getElementById('myCanvas');

// Or
const svg = document.getElementById("mySvg")

// Create ContriGraph instance for canvas rendering
const contribGraph = new ContriGraph({
  canvas: canvas,
  size: 10,
  gapSize: 5,
  data: { /* data */ },
  year: 2022,
  colorParse: /* custom color parsing function */,
});

// Create ContriGraph instance for SVG rendering
const contribGraph = new ContriGraph({
  svg: svg,
  size: 10,
  gapSize: 5,
  data: { /* data */ },
  year: 2022,
  colorParse: /* custom color parsing function */,
  radius: 2
});

// Render contribution graph for a month or the entire year
contribGraph.render(1); // Render for January
// Or
contribGraph.render(); // Render for the whole year
```

Option.data Format:
``` json
{
  "2023-01-05": 1,
  "2023-03-01": 10,
}
```

Constructor:
``` javascript
new ContriGraph({
  canvas?: HTMLCanvasElement, // Canvas element (preferred) or SVG element for SVG rendering
  svg?: SVGSVGElement, 
  size?: number, // Size of squares, default is 10
  gapSize?: number, // Size of gap between squares, default is 5
  data?: Record<string, number>, // Contribution data, default is an empty object
  year?: number, // Year, default is the current year
  colorParse?: (value: number) => string, // Color parsing function, default is built-in color parsing function
  radius?: string // Effective only in SVG mode, default is 2
});
```

Methods:
``` javascript
// Render the contribution graph, optionally for a specified month (1 to 12) or the entire year.
render(month?: 1|2|3|4|5|6|7|8|9|10|11|12): void

```

Attributes:
``` javascript
width: number // Width of the generated canvas
height: number // Height of the generated canvas

```
