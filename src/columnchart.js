import { Container, Graphics } from 'pixi.js';

export function drawColumnChart(app, jsonData) {
    const container = new Container();
    app.stage.addChild(container);

    const values = jsonData?.gameplay?.levelScores || [50, 70, 30, 90];
    const barWidth = 40;
    const spacing = 20;

    values.forEach((value, i) => {
        const g = new Graphics();
        g.beginFill(0x3366cc);
        g.drawRect(0, 0, barWidth, -value); // height is negative to go upwards
        g.endFill();

        g.x = 100 + i * (barWidth + spacing);
        g.y = window.innerHeight - 100;

        container.addChild(g);
    });
}
