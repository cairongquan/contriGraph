# ContriGraph

ContriGraph 是一个用于在 Canvas 上渲染 GitHub 贡献图的类。

## 官网地址
[ContriGraph官网简介地址](https://www.warriro10.top/contriGraphIntro/)

## 安装 Install

使用 npm 安装：
```bash
npm install contrib-graph
```

## 使用 Use
``` javascript
import ContriGraph from 'contrib-graph';

// 创建一个 Canvas 元素
const canvas = document.getElementById('myCanvas');

// 创建 ContriGraph 实例
const contribGraph = new ContriGraph({
  canvas: canvas,
  size: 10,
  gapSize: 5,
  data: { /* 数据 */ },
  year: 2022,
  colorParse: /* 自定义颜色解析函数 */,
});

// 渲染月份或整年的贡献图
contribGraph.render(1); // 渲染一月份
// 或
contribGraph.render(); // 渲染整年
```

### Option.data 格式
``` json
  {
    "2023-01-05":1,
    "2023-03-01":10,
  }
```

## 构造函数 Constructor
``` javascript
new ContriGraph({
  canvas: HTMLCanvasElement, // Canvas 元素
  size?: number, // 方块大小，默认为 10
  gapSize?: number, // 方块间隙大小，默认为 5
  data?: Record<string, number>, // 贡献数据，默认为空对象
  year?: number, // 年份，默认为当前年份
  colorParse?: (value: number) => string, // 颜色解析函数，默认为内置的颜色解析函数
});
```

## 方法 Methods
``` typescript
// 渲染贡献图，可选择渲染指定月份（1 到 12）或整年。
render(month?: number): void
```

## 属性 Attribute
``` typescript
width:number // 生成canvas的宽
height:number //生成canvas的高
```

