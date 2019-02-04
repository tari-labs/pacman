// load boss screen. ctx is a canvas context:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

var BossScreen = {
    draw: function(ctx) {
        loadBoss(ctx, level);
    }
};

var screens = [dosScreen, dosScreen2];

var loadBoss = function(ctx, index, x, y) {
    var screenFunc = screens[index % screens.length];
    screenFunc(ctx, x, y);
};

function dosScreen(ctx) {
    var lines = [
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
    var size = Math.floor(20.0 / renderScale);
    ctx.save();
    // ctx.translate(x,y);
    ctx.textAlign = "left";
    ctx.font = size + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    for (var i=0; i< lines.length; i++) {
        ctx.fillText(lines[i], 5, (size+3) * (i + 1));
    }
    ctx.restore();
}

function dosScreen2(ctx) {
    var lines = [
        "Classified Advertising Dept.",
        "Ball Street Journal",
        "10001 Broadway",
        "New York, NY 10001",
        "",
        "Gentlement",
        "",
        "Enclosed please find my personal check in the",
        "amount of $57.30 to cover three insertions of",
        "the following classified advertisement in your",
        "\"Seeking Position\" department:",
        "",
        "   Mature, experienced software analyst available.",
        "   Bug installation a proven speciality. \"No",
        "   version too clean.\" Familiar with DOS 1.0,",
        "   AGI and SCI."
    ];
    var size = Math.floor(15.0 / renderScale);
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = size + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#00ff00";
    for (var i=0; i< lines.length; i++) {
        ctx.fillText(lines[i], 5, (size+3) * (i + 1));
    }
    ctx.restore();
}
