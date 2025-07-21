import { Container, Graphics } from 'pixi.js';

export function drawPieChart(app, jsonData) {
    const container = new Container();
    app.stage.addChild(container);

    const radius = 100;
    const total = 100;
    const percentage = Number(jsonData?.gameplay?.summary?.completionPercentage || 0);
    const angle = (percentage / total) * Math.PI * 2;

    function createSlice(startAngle, endAngle, color) {
        const g = new Graphics();
        g.beginFill(color);
        g.arc(0, 0, radius, startAngle, endAngle);
        g.lineTo(0, 0);
        g.endFill();
        return g;
    }

    const completed = createSlice(0, angle, 0x00FF00);
    const remaining = createSlice(angle, Math.PI * 2, 0xFF0000);

    [completed, remaining].forEach(slice => {
        slice.x = window.innerWidth / 2;
        slice.y = window.innerHeight / 2;
        container.addChild(slice);
    });
}
