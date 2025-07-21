import { Container, Graphics } from 'pixi.js';

export function drawSpiderChart(app, jsonData) {
    const container = new Container();
    app.stage.addChild(container);

    const categories = ['speed', 'accuracy', 'stamina', 'strategy', 'reaction'];
    const values = categories.map(c => jsonData?.gameplay?.metrics?.[c] || 0);
    const radius = 100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const g = new Graphics();
    g.lineStyle(2, 0x999999);
    g.beginFill(0x66ccff, 0.4);

    values.forEach((val, i) => {
        const angle = (Math.PI * 2 * i) / values.length;
        const x = centerX + Math.cos(angle) * (radius * val / 100);
        const y = centerY + Math.sin(angle) * (radius * val / 100);
        if (i === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
    });
    g.closePath();
    g.endFill();

    container.addChild(g);
}

