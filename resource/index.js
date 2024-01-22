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
        this.width = 0;
        this.height = 0;
        const { canvas, size = 10, gapSize = 5, data = {}, colorParse, year } = option;
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Miss required param: canvas');
        }
        this.canvas = canvas.getContext('2d');
        this.canvasDom = canvas;
        this.size = size;
        this.gapSize = gapSize;
        this.data = data;
        this.colorParse = typeof colorParse === 'function' && colorParse || defineColorParseHandle;
        this.year = year || new Date().getFullYear();
    }
    render(month) {
        if (month)
            this.renderMonth(month);
        else
            this.renderYear();
    }
    ['createCanvas'](x, y, color) {
        if (this.canvas !== null) {
            this.canvas.fillStyle = color;
            this.canvas.fillRect(x * (this.size + this.gapSize), y * (this.size + this.gapSize), this.size, this.size);
        }
    }
    ['renderMonth'](month) {
        const daysOfMonth = getMonthDays(this.year, month);
        const startWeekNum = startWeek(this.year, month);
        const renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfMonth).fill(1));
        let dateNow = `${this.year}-${String(month).padStart(2, '0')}-01`;
        this.getSizeOfCanvas(renderPieces.length);
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
            this.createCanvas(col, row, color);
        });
    }
    ['renderYear']() {
        const startWeekNum = startWeek(this.year, 1);
        const daysOfYear = getYearDays(this.year);
        const renderPieces = new Array(startWeekNum).fill(0).concat(new Array(daysOfYear).fill(1));
        let dateNow = `${this.year}-01-01`;
        this.getSizeOfCanvas(renderPieces.length);
        renderPieces.forEach((piece, index) => {
            const col = Math.floor(index / 7);
            const row = index % 7;
            let color = '';
            if (piece !== 0) {
                color = this.colorParse(this.data[dateNow] ? this.data[dateNow] : 0);
                dateNow = addDays(dateNow, 1);
            }
            else {
                color = 'rgba(255, 0, 255, 0)';
            }
            this.createCanvas(col, row, color);
        });
    }
    ['getSizeOfCanvas'](length) {
        const row = Math.ceil(length / 7);
        const col = 7;
        this.width = (row * this.size) + ((row - 1) * this.gapSize);
        this.height = (col * this.size) + ((col - 1) * this.gapSize);
        this.canvasDom.width = this.width;
        this.canvasDom.height = this.height;
    }
}

export { ContriGraph as default };
