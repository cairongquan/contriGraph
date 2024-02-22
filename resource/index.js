function startWeek(year, month) {
    return new Date(Date.parse(year + `-${month}-01`)).getDay();
}
function getMonthDays(year, month) {
    if (month === 12)
        return 31;
    return Math.trunc(Math.ceil(Date.parse(year + `-${month + 1}`) - Date.parse(year +
        `-${month}`)) /
        86400000);
}
function getYearDays(year) {
    return Math.trunc(Math.ceil(Date.parse(`${(year + 1)}-1-31`) - Date.parse(`${year}-1-31`))) /
        86400000;
}
function addDays(dateString, daysToAdd) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + daysToAdd);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const defineColorParseHandle = (value) => {
    const intValue = isNaN(value) ? 0 : Number(value);
    if (intValue === 0)
        return '#1e1f2a';
    else if (intValue <= 5)
        return '#c6e48b';
    else if (intValue <= 10)
        return '#7bc96f';
    else
        return '#2dce49';
};
class ContriGraph {
    constructor(option) {
        this.canvas = null;
        this.svg = null;
        this.canvasDom = null;
        this.width = 0;
        this.height = 0;
        const { canvas, svg, size = 10, gapSize = 5, data = {}, colorParse, year, radius = 2 } = option;
        if (canvas instanceof HTMLCanvasElement) {
            this.isSvgOrCanvas = 'canvas';
            this.canvas = canvas.getContext('2d');
            this.canvasDom = canvas;
        }
        else if (svg instanceof SVGSVGElement) {
            this.isSvgOrCanvas = "svg";
            this.svg = svg;
        }
        else
            throw new Error("miss required param: canvas or svg");
        this.size = size;
        this.gapSize = gapSize;
        this.data = data;
        this.colorParse = typeof colorParse === 'function' && colorParse || defineColorParseHandle;
        this.year = year || new Date().getFullYear();
        this.radius = radius;
    }
    render(month) {
        let renderPieces = [], dateNow = '';
        if (month && !isNaN(month)) {
            const daysOfMonth = getMonthDays(this.year, month);
            const startWeekNum = startWeek(this.year, month);
            renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfMonth).fill(1));
            dateNow = `${this.year}-${String(month).padStart(2, '0')}-01`;
        }
        else {
            const startWeekNum = startWeek(this.year, 1);
            const dayOfYear = getYearDays(this.year);
            renderPieces = new Array(startWeekNum).fill(0).concat(new Array(dayOfYear).fill(1));
            dateNow = `${this.year}-01-01`;
        }
        this.isSvgOrCanvas === 'canvas' ? this.getSizeOfCanvas(renderPieces.length) : this.getSizeOfSvg(renderPieces.length);
        let renderRectsStringCode = this.isSvgOrCanvas === 'svg' ? '' : null;
        renderPieces.forEach((piece, index) => {
            const col = Math.floor(index / 7);
            const row = index % 7;
            let color = '';
            if (piece !== 0) {
                color = color = this.colorParse(this.data[dateNow] ? this.data[dateNow] : 0);
                dateNow = addDays(dateNow, 1);
            }
            else {
                color = 'rgba(255, 0, 255, 0)';
            }
            this.isSvgOrCanvas === 'canvas' ? this.createCanvas(col, row, color) : renderRectsStringCode += this.createRect(col, row, color);
        });
        this.isSvgOrCanvas === 'svg' && (this.svg.innerHTML = renderRectsStringCode);
    }
    ['createCanvas'](x, y, color) {
        if (this.canvas !== null) {
            this.canvas.fillStyle = color;
            this.canvas.fillRect(x * (this.size + this.gapSize), y * (this.size + this.gapSize), this.size, this.size);
        }
    }
    ['createRect'](x, y, color) {
        const xAttrValue = x * this.size + this.gapSize * x;
        const yAttrValue = y * this.size + this.gapSize * y;
        return `<rect width="${this.size}" height="${this.size}" x="${xAttrValue}" y="${yAttrValue}" rx="${this.radius}" ry="${this.radius}" style="fill:${color}"></rect>`;
    }
    ['getSizeOfCanvas'](length) {
        if (this.isSvgOrCanvas === 'canvas') {
            const row = Math.ceil(length / 7);
            const col = 7;
            this.width = (row * this.size) + ((row - 1) * this.gapSize);
            this.height = (col * this.size) + ((col - 1) * this.gapSize);
            this.canvasDom.width = this.width;
            this.canvasDom.height = this.height;
        }
    }
    ['getSizeOfSvg'](length) {
        if (this.isSvgOrCanvas === 'svg') {
            const row = Math.ceil(length / 7);
            const col = 7;
            this.width = (row * this.size) + ((row - 1) * this.gapSize);
            this.height = (col * this.size) + ((col - 1) * this.gapSize);
            Object.assign(this.svg.style, {
                width: this.width,
                height: this.height
            });
        }
    }
}

export { ContriGraph as default };
