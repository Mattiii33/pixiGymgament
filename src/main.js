import { Application, Sprite, Assets, Container, Graphics } from 'pixi.js';
import { drawPieChart } from './piechart.js';
import { drawColumnChart } from './columnchart.js';
import { drawSpiderChart } from './spiderchart.js';

(async () => {
    const app = new Application();

    await app.init({
        resizeTo: window,
        backgroundColor: 0xdfe3db, // light grey-green
        antialias: true,
    });


    const response = await fetch('/performance_undefined_2025-07-04T10-38-57-833Z.json');
    const jsonData = await response.json();

    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden'; // ensure no scrollbars
    document.body.appendChild(app.canvas);

    const offsetX = 200; // amount to push icons inward from sides
    const offsetY = 150;  // amount to push icons upward from bottom or downward from top

    // Load all images
    const textures = await Assets.load([
        '/close.png',
        '/play.png',
        '/pause.png',
        '/forward.png'
    ]);

    // Create sprites
    const playIcon = Sprite.from(textures['/play.png']);
    const closeIcon = Sprite.from(textures['/close.png']);
    const pauseIcon = Sprite.from(textures['/pause.png']);
    const forwardIcon = Sprite.from(textures['/forward.png']);

    // Set sizes (optional if already cropped nicely)
    const size = 48;
    [playIcon, closeIcon, pauseIcon, forwardIcon].forEach(icon => {
        icon.width = size;
        icon.height = size;
    });

    // Set positions relative to the window size
    playIcon.x = offsetX;
    playIcon.y = offsetY;

    closeIcon.x = window.innerWidth - offsetX - size;
    closeIcon.y = offsetY;

    pauseIcon.x = offsetX;
    pauseIcon.y = window.innerHeight - offsetY - size;

    forwardIcon.x = window.innerWidth - offsetX - size;
    forwardIcon.y = window.innerHeight - offsetY - size;

    // Add to stage
    app.stage.addChild(playIcon, closeIcon, pauseIcon, forwardIcon);

    // Handle resize to keep elements in correct place
    window.addEventListener('resize', () => {
        closeIcon.x = window.innerWidth - offsetX - size;
        forwardIcon.x = window.innerWidth - offsetX - size;

        pauseIcon.y = window.innerHeight - offsetY - size;
        forwardIcon.y = window.innerHeight - offsetY - size;
    });

    // Function to create a slice (sector) of the pie chart
    function createSlice(radius, startAngle, endAngle, color) {
        const slice = new Graphics();
        slice.beginFill(color);
        slice.arc(0, 0, radius, startAngle, endAngle);
        slice.lineTo(0, 0);
        slice.endFill();
        return slice;
    }

    // Draw the pie chart
    const pieChartContainer = new Container();
    app.stage.addChild(pieChartContainer);

    const total = 100;
const completionPercentage = jsonData.gameplay.summary.completionPercentage;
    const remainingPercentage = total - completionPercentage;

    const radius = 100;
    const startAngle = 0;
    const completionAngle = (completionPercentage / total) * Math.PI * 2;
    const remainingAngle = Math.PI * 2 - completionAngle;

    // Create slices
    const completedSlice = createSlice(radius, startAngle, completionAngle, 0x00FF00); // Green for completion
    const remainingSlice = createSlice(radius, completionAngle, Math.PI * 2, 0xFF0000); // Red for remaining

    // Position the pie chart at the center of the canvas
    completedSlice.x = window.innerWidth / 2;
    completedSlice.y = window.innerHeight / 2;
    remainingSlice.x = window.innerWidth / 2;
    remainingSlice.y = window.innerHeight / 2;

    // Add slices to the pie chart container
    pieChartContainer.addChild(completedSlice);
    pieChartContainer.addChild(remainingSlice);





})();
