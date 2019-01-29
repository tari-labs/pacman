// load boss screen. ctx is a canvas context:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

var screens = [dosScreen];

const loadBoss = function(ctx, index) {
    const screenFunc = screens[index % screens.length];
    screenFunc(ctx);
};

function dosScreen(ctx) {
    const lines = [
        "TARI LABS Disk Operating System 4.20",
        "(C) Copyright  1992-2019 TariLabs",
        "","C:\\> dir",
        " Volume in drive C is TARI",
        " Volume Serial Number is 1833-B2DF-104A-D48B-90A0-11BF",
        "",
        " KQ3                                          11-08-86",
        " MONTEZ~1                                     11-10-84",
        " LSLLLL                                       05-07-87",
        " WINGCOM3                                     27-03-94",
        " SQ1                                          15-10-86",
        " PQ1                                          01-09-87",
        " PICS         <DIR>                           05-10-92",
        " WORK         <DIR>                           04-11-95",
        "                            8 file(s) 15,762,198 bytes",
        "                         2 dir(s) 5,209,322 bytes free"

    ];
    const size = 25;
    ctx.save();
    ctx.font = size + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    for (let i=0; i< lines.length; i++) {
        ctx.fillText(lines[i], 5, (size+3) * (i + 1));
    }
    ctx.restore();
}