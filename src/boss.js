// load boss screen. ct is a canvas context:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
var loadBoss = function(ctx) {
    // Draw a house -- this will be replaced by more sensible things
    // Set line width
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 10;

// Wall
    ctx.strokeRect(75, 140, 150, 110);

// Door
    ctx.fillRect(130, 190, 40, 60);

// Roof
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
};