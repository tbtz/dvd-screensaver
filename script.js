(function () {
    const COLORS = Object.freeze(['red', 'lime', 'yellow', 'fuchsia', 'blue', 'aqua']);
    const DIRECTIONS = Object.freeze({
        TR: { x: 1, y: 1 },
        BR: { x: 1, y: -1 },
        BL: { x: -1, y: -1 },
        TL: { x: -1, y: 1 }
    });

    const SPEED = 2;
    const FRAMERATE = 50;

    let DVD;
    let MAX_X, MAX_Y;

    let currentX, currentY, currentDir, currentColor;

    document.addEventListener('DOMContentLoaded', () => {
        DVD = document.getElementsByTagName('svg')[0];
        [MAX_X, MAX_Y] = getMaxCoords();

        init();
        startIv();
    });

    window.addEventListener('resize', () => {
        [MAX_X, MAX_Y] = getMaxCoords();
    });

    function init() {
        currentX = Math.round(Math.random() * MAX_X);
        currentY = Math.round(Math.random() * MAX_Y);
        currentDir = DIRECTIONS.TR;
        currentColor = getNewColor();
        update(currentX, currentY, currentColor);
    }

    function startIv() {
        setInterval(() => {
            const nextDir = getNextDirection(currentX, currentY, currentDir);

            if (nextDir !== currentDir) {
                currentColor = getNewColor();
            }

            currentX = currentX + nextDir.x * SPEED;
            currentY = currentY + nextDir.y * SPEED;
            currentDir = nextDir;

            update(currentX, currentY, currentColor);
        }, 1 / FRAMERATE * 1000);
    }

    function getNextDirection() {
        const { TR, BR, BL, TL } = DIRECTIONS;

        let nextDir = currentDir;

        if (
            currentDir === TR && currentX >= MAX_X ||
            currentDir === BL && currentY <= 0 ||
            currentDir === BR && currentX >= MAX_X && currentY <= 0
        ) {
            nextDir = TL;
        } else if (
            currentDir === BL && currentX <= 0 ||
            currentDir === TR && currentY >= MAX_Y ||
            currentDir === TL && currentX <= 0 && currentY >= MAX_Y
        ) {
            nextDir = BR;
        } else if (
            currentDir === BR && currentX >= MAX_X ||
            currentDir === TL && currentY >= MAX_Y ||
            currentDir === TR && currentX >= MAX_X && currentY >= MAX_Y
        ) {
            nextDir = BL;
        } else if (
            currentDir === TL && currentX <= 0 ||
            currentDir === BR && currentY <= 0 ||
            currentDir === BL && currentX <= 0 && currentY <= 0
        ) {
            nextDir = TR;
        }

        return nextDir;
    }

    function getNewColor() {
        let newColor;
        while (!newColor || newColor === currentColor) {
            newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
        return newColor;
    }

    function update(x, y, color) {
        DVD.style.left = x;
        DVD.style.bottom = y;
        DVD.style.fill = color;
    }

    function getMaxCoords() {
        const bodyHeight = document.body.clientHeight;
        const bodyWidth = document.body.clientWidth;

        const dvdHeight = DVD.clientHeight;
        const dvdWidth = DVD.clientWidth;

        const maxX = bodyWidth - dvdWidth;
        const maxY = bodyHeight - dvdHeight;

        return [maxX, maxY];
    }
})();
