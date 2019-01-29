//////////////////////////////////////////////////////////////////////////////////////
// Sprites
// (sprites are created using canvas paths)

var drawGhostSprite = (function(){

    // add top of the ghost head to the current canvas path
    var addHead = (function() {

        // pixel coordinates for the top of the head
        // on the original arcade ghost sprite
        var coords = [
            0,6,
            1,3,
            2,2,
            3,1,
            4,1,
            5,0,
            8,0,
            9,1,
            10,1,
            11,2,
            12,3,
            13,6,
        ];

        return function(ctx) {
            var i;
            ctx.save();

            // translate by half a pixel to the right
            // to try to force centering
            ctx.translate(0.5,0);

            ctx.moveTo(0,6);
            ctx.quadraticCurveTo(1.5,0,6.5,0);
            ctx.quadraticCurveTo(11.5,0,13,6);

            // draw lines between pixel coordinates
            /*
            ctx.moveTo(coords[0],coords[1]);
            for (i=2; i<coords.length; i+=2)
                ctx.lineTo(coords[i],coords[i+1]);
            */

            ctx.restore();
        };
    })();

    // add first ghost animation frame feet to the current canvas path
    var addFeet1 = (function(){

        // pixel coordinates for the first feet animation
        // on the original arcade ghost sprite
        var coords = [
            13,13,
            11,11,
            9,13,
            8,13,
            8,11,
            5,11,
            5,13,
            4,13,
            2,11,
            0,13,
        ];

        return function(ctx) {
            var i;
            ctx.save();

            // translate half a pixel right and down
            // to try to force centering and proper height
            ctx.translate(0.5,0.5);

            // continue previous path (assuming ghost head)
            // by drawing lines to each of the pixel coordinates
            for (i=0; i<coords.length; i+=2)
                ctx.lineTo(coords[i],coords[i+1]);

            ctx.restore();
        };

    })();

    // add second ghost animation frame feet to the current canvas path
    var addFeet2 = (function(){

        // pixel coordinates for the second feet animation
        // on the original arcade ghost sprite
        var coords = [
            13,12,
            12,13,
            11,13,
            9,11,
            7,13,
            6,13,
            4,11,
            2,13,
            1,13,
            0,12,
        ];

        return function(ctx) {
            var i;
            ctx.save();

            // translate half a pixel right and down
            // to try to force centering and proper height
            ctx.translate(0.5,0.5);

            // continue previous path (assuming ghost head)
            // by drawing lines to each of the pixel coordinates
            for (i=0; i<coords.length; i+=2)
                ctx.lineTo(coords[i],coords[i+1]);

            ctx.restore();
        };

    })();

    // draw regular ghost eyes
    var addEyes = function(ctx,dirEnum){
        var i;

        ctx.save();
        ctx.translate(2,3);

        var coords = [
            0,1,
            1,0,
            2,0,
            3,1,
            3,3,
            2,4,
            1,4,
            0,3
        ];

        var drawEyeball = function() {
            ctx.translate(0.5,0.5);
            ctx.beginPath();
            ctx.moveTo(coords[0],coords[1]);
            for (i=2; i<coords.length; i+=2)
                ctx.lineTo(coords[i],coords[i+1]);
            ctx.closePath();
            ctx.fill();
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.translate(-0.5,-0.5);
            //ctx.fillRect(1,0,2,5); // left
            //ctx.fillRect(0,1,4,3);
        };

        // translate eye balls to correct position
        if (dirEnum == DIR_LEFT) ctx.translate(-1,0);
        else if (dirEnum == DIR_RIGHT) ctx.translate(1,0);
        else if (dirEnum == DIR_UP) ctx.translate(0,-1);
        else if (dirEnum == DIR_DOWN) ctx.translate(0,1);

        // draw eye balls
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 1.0;
        ctx.lineJoin = 'round';
        drawEyeball();
        ctx.translate(6,0);
        drawEyeball();

        // translate pupils to correct position
        if (dirEnum == DIR_LEFT) ctx.translate(0,2);
        else if (dirEnum == DIR_RIGHT) ctx.translate(2,2);
        else if (dirEnum == DIR_UP) ctx.translate(1,0);
        else if (dirEnum == DIR_DOWN) ctx.translate(1,3);

        // draw pupils
        ctx.fillStyle = "#00F";
        ctx.fillRect(0,0,2,2); // right
        ctx.translate(-6,0);
        ctx.fillRect(0,0,2,2); // left

        ctx.restore();
    };

    // draw scared ghost face
    var addScaredFace = function(ctx,flash){
        ctx.strokeStyle = ctx.fillStyle = flash ? "#F00" : "#FF0";

        // eyes
        ctx.fillRect(4,5,2,2);
        ctx.fillRect(8,5,2,2);

        // mouth
        var coords = [
            1,10,
            2,9,
            3,9,
            4,10,
            5,10,
            6,9,
            7,9,
            8,10,
            9,10,
            10,9,
            11,9,
            12,10,
        ];
        ctx.translate(0.5,0.5);
        ctx.beginPath();
        ctx.moveTo(coords[0],coords[1]);
        for (i=2; i<coords.length; i+=2)
            ctx.lineTo(coords[i],coords[i+1]);
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.translate(-0.5,-0.5);
        /*
        ctx.fillRect(1,10,1,1);
        ctx.fillRect(12,10,1,1);
        ctx.fillRect(2,9,2,1);
        ctx.fillRect(6,9,2,1);
        ctx.fillRect(10,9,2,1);
        ctx.fillRect(4,10,2,1);
        ctx.fillRect(8,10,2,1);
        */
    };


    return function(ctx,x,y,frame,dirEnum,scared,flash,eyes_only,color) {
        ctx.save();
        ctx.translate(x-7,y-7);

        if (scared)
            color = flash ? "#FFF" : "#2121ff";

        if (!eyes_only) {
            // draw body
            ctx.beginPath();
            addHead(ctx);
            if (frame == 0)
                addFeet1(ctx);
            else
                addFeet2(ctx);
            ctx.closePath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.fillStyle = color;
            ctx.fill();
        }

        // draw face
        if (scared)
            addScaredFace(ctx, flash);
        else
            addEyes(ctx,dirEnum);

        ctx.restore();
    };
})();

// draw points displayed when pac-man eats a ghost or a fruit
var drawPacPoints = (function(){
    var ctx;
    var color;

    var plotOutline = function(points,color) {
        var len = points.length;
        var i;
        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (i=2; i<len; i+=2) {
            ctx.lineTo(points[i],points[i+1]);
        }
        ctx.closePath();
        ctx.lineWidth = 1.0;
        ctx.lineCap = ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    var plotLine = function(points,color) {
        var len = points.length;
        var i;
        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (i=2; i<len; i+=2) {
            ctx.lineTo(points[i],points[i+1]);
        }
        ctx.lineWidth = 1.0;
        ctx.lineCap = ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    var draw0 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotOutline([
            1,0,
            2,0,
            3,1,
            3,5,
            2,6,
            1,6,
            0,5,
            0,1,
        ],color);
        ctx.restore();
    };

    var draw1narrow = function(x,y) {
        plotLine([x,y,x,y+6],color);
    };

    var draw1 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,1,
            1,0,
            1,6,
            0,6,
            2,6,
        ],color);
        ctx.restore();
    };

    var draw2 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,2,
            0,1,
            1,0,
            3,0,
            4,1,
            4,2,
            0,6,
            4,6,
        ],color);
        ctx.restore();
    };

    var draw3 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,0,
            4,0,
            2,2,
            4,4,
            4,5,
            3,6,
            1,6,
            0,5,
        ],color);
        ctx.restore();
    };

    var draw4 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            3,6,
            3,0,
            0,3,
            0,4,
            4,4,
        ],color);
        ctx.restore();
    };

    var draw5 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            4,0,
            0,0,
            0,2,
            3,2,
            4,3,
            4,5,
            3,6,
            1,6,
            0,5,
        ],color);
        ctx.restore();
    };

    var draw6 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            3,0,
            1,0,
            0,1,
            0,5,
            1,6,
            2,6,
            3,5,
            3,3,
            0,3,
        ],color);
        ctx.restore();
    };

    var draw7 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,1,
            0,0,
            4,0,
            4,1,
            2,4,
            2,6,
        ],color);
        ctx.restore();
    };

    var draw8 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotOutline([
            1,0,
            3,0,
            4,1,
            4,2,
            3,3,
            1,3,
            0,4,
            0,5,
            1,6,
            3,6,
            4,5,
            4,4,
            3,3,
            1,3,
            0,2,
            0,1,
        ],color);
        ctx.restore();
    };

    var draw100 = function() {
        draw1(-5,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw200 = function() {
        draw2(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw300 = function() {
        draw3(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw400 = function() {
        draw4(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw500 = function() {
        draw5(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw700 = function() {
        draw7(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw800 = function() {
        draw8(-7,-3);
        draw0(-1,-3);
        draw0(4,-3);
    };

    var draw1000 = function() {
        draw1(-8,-3);
        draw0(-4,-3);
        draw0(1,-3);
        draw0(6,-3);
    };

    var draw1600 = function() {
        draw1narrow(-7,-3);
        draw6(-5,-3);
        draw0(0,-3);
        draw0(5,-3);
    };

    var draw2000 = function() {
        draw2(-10,-3);
        draw0(-4,-3);
        draw0(1,-3);
        draw0(6,-3);
    };

    var draw3000 = function() {
        draw3(-10,-3);
        draw0(-4,-3);
        draw0(1,-3);
        draw0(6,-3);
    };

    var draw5000 = function() {
        draw5(-10,-3);
        draw0(-4,-3);
        draw0(1,-3);
        draw0(6,-3);
    };

    return function(_ctx,x,y,points,_color) {
        ctx = _ctx;
        color = _color;

        ctx.save();
        ctx.translate(x+0.5,y+0.5);
        ctx.translate(0,-1);

        var f = {
            100: draw100,
            200: draw200,
            300: draw300,
            400: draw400,
            500: draw500,
            700: draw700,
            800: draw800,
            1000: draw1000,
            1600: draw1600,
            2000: draw2000,
            3000: draw3000,
            5000: draw5000,
        }[points];

        if (f) {
            f();
        }

        ctx.restore();
    };
})();

// draw points displayed when ms. pac-man eats a fruit
var drawMsPacPoints = (function(){
    var ctx;
    var color = "#fff";

    var plotOutline = function(points,color) {
        var len = points.length;
        var i;
        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (i=2; i<len; i+=2) {
            ctx.lineTo(points[i],points[i+1]);
        }
        ctx.closePath();
        ctx.lineWidth = 1.0;
        ctx.lineCap = ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    var plotLine = function(points,color) {
        var len = points.length;
        var i;
        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (i=2; i<len; i+=2) {
            ctx.lineTo(points[i],points[i+1]);
        }
        ctx.lineWidth = 1.0;
        ctx.lineCap = ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.stroke();
    };

    var drawNeg = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            -4,2,
            -1,2,
        ],color);
        ctx.restore();
    };

    var draw0 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotOutline([
            0,0,
            2,0,
            2,4,
            0,4,
        ],color);
        ctx.restore();
    };

    var draw1 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            1,0,
            1,4,
        ],color);
        ctx.restore();
    };

    var draw2 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,0,
            2,0,
            2,2,
            0,2,
            0,4,
            2,4,
        ],color);
        ctx.restore();
    };

    var draw5 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            2,0,
            0,0,
            0,2,
            2,2,
            2,4,
            0,4,
        ],color);
        ctx.restore();
    };

    var draw7 = function(x,y) {
        ctx.save();
        ctx.translate(x,y);
        plotLine([
            0,0,
            2,0,
            2,4,
        ],color);
        ctx.restore();
    };

    var draw100 = function() {
        draw1(-5,-5);
        draw0(-1,-2);
        draw0(3,1);
    };

    var drawNeg100 = function() {
        drawNeg(-5, -5);
        draw1(-5,-5);
        draw0(-1,-2);
        draw0(3,1);
    };

    var draw200 = function() {
        draw2(-5,-5);
        draw0(-1,-2);
        draw0(3,1);
    };

    var draw500 = function() {
        draw5(-5,-5);
        draw0(-1,-2);
        draw0(3,1);
    };

    var draw700 = function() {
        draw7(-5,-5);
        draw0(-1,-2);
        draw0(3,1);
    };

    var draw1000 = function() {
        draw1(-7,-7);
        draw0(-3,-4);
        draw0(1,-1);
        draw0(5,2);
    };

    var draw2000 = function() {
        draw2(-7,-7);
        draw0(-3,-4);
        draw0(1,-1);
        draw0(5,2);
    };

    var draw5000 = function() {
        draw5(-7,-7);
        draw0(-3,-4);
        draw0(1,-1);
        draw0(5,2);
    };

    return function(_ctx,x,y,points) {
        ctx = _ctx;

        ctx.save();
        ctx.translate(x+0.5,y+0.5);

        var f = {
            100: draw100,
            200: draw200,
            500: draw500,
            700: draw700,
            1000: draw1000,
            2000: draw2000,
            5000: draw5000,
            "-100": drawNeg100,
        }[points];

        if (f) {
            f();
        }

        ctx.restore();
    };
})();

// draw pacman body
var drawPacmanSprite = function(ctx,x,y,dirEnum,angle,mouthShift,scale,centerShift,alpha,color,rot_angle) {

    if (mouthShift == undefined) mouthShift = 0;
    if (centerShift == undefined) centerShift = 0;
    if (scale == undefined) scale = 1;
    if (alpha == undefined) alpha = 1;

    if (color == undefined) {
        color = "rgba(255,255,0," + alpha + ")";
    }

    ctx.save();
    ctx.translate(x,y);
    ctx.scale(scale,scale);
    if (rot_angle) {
        ctx.rotate(rot_angle);
    }

    // rotate to current heading direction
    var d90 = Math.PI/2;
    if (dirEnum == DIR_UP) ctx.rotate(3*d90);
    else if (dirEnum == DIR_RIGHT) ctx.rotate(0);
    else if (dirEnum == DIR_DOWN) ctx.rotate(d90);
    else if (dirEnum == DIR_LEFT) ctx.rotate(2*d90);

    // plant corner of mouth
    ctx.beginPath();
    ctx.moveTo(-3+mouthShift,0);

    // draw head outline
    ctx.arc(centerShift,0,6.5,angle,2*Math.PI-angle);
    ctx.closePath();

    //ctx.strokeStyle = color;
    //ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
};

// draw giant pacman body
var drawGiantPacmanSprite = function(ctx,x,y,dirEnum,frame) {

    var color = "#FF0";
    var mouthShift = 0;
    var angle = 0;
    if (frame == 1) {
        mouthShift = -4;
        angle = Math.atan(7/14);
    }
    else if (frame == 2) {
        mouthShift = -2;
        angle = Math.atan(13/9);
    }

    ctx.save();
    ctx.translate(x,y);

    // rotate to current heading direction
    var d90 = Math.PI/2;
    if (dirEnum == DIR_UP) ctx.rotate(3*d90);
    else if (dirEnum == DIR_RIGHT) ctx.rotate(0);
    else if (dirEnum == DIR_DOWN) ctx.rotate(d90);
    else if (dirEnum == DIR_LEFT) ctx.rotate(2*d90);

    // plant corner of mouth
    ctx.beginPath();
    ctx.moveTo(mouthShift,0);

    // draw head outline
    ctx.arc(0,0,16,angle,2*Math.PI-angle);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.restore();
};

var drawMsPacmanSprite = function(ctx,x,y,dirEnum,frame,rot_angle) {
    var angle = 0;

    // draw body
    if (frame == 0) {
        // closed
        drawPacmanSprite(ctx,x,y,dirEnum,0,undefined,undefined,undefined,undefined,undefined,rot_angle);
    }
    else if (frame == 1) {
        // open
        angle = Math.atan(4/5);
        drawPacmanSprite(ctx,x,y,dirEnum,angle,undefined,undefined,undefined,undefined,undefined,rot_angle);
        angle = Math.atan(4/8); // angle for drawing eye
    }
    else if (frame == 2) {
        // wide
        angle = Math.atan(6/3);
        drawPacmanSprite(ctx,x,y,dirEnum,angle,undefined,undefined,undefined,undefined,undefined,rot_angle);
        angle = Math.atan(6/6); // angle for drawing eye
    }

    ctx.save();
    ctx.translate(x,y);
    if (rot_angle) {
        ctx.rotate(rot_angle);
    }

    // reflect or rotate sprite according to current direction
    var d90 = Math.PI/2;
    if (dirEnum == DIR_UP)
        ctx.rotate(-d90);
    else if (dirEnum == DIR_DOWN)
        ctx.rotate(d90);
    else if (dirEnum == DIR_LEFT)
        ctx.scale(-1,1);

    // bow
    var x=-7.5,y=-7.5;
    ctx.fillStyle = "#F00";
    ctx.beginPath(); ctx.arc(x+1,y+4,1.25,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(x+2,y+5,1.25,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(x+3,y+3,1.25,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(x+4,y+1,1.25,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(x+5,y+2,1.25,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#0031FF";
    ctx.beginPath(); ctx.arc(x+2.5,y+3.5,0.5,0,Math.PI*2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.arc(x+3.5,y+2.5,0.5,0,Math.PI*2); ctx.closePath(); ctx.fill();

    // lips
    ctx.strokeStyle = "#F00";
    ctx.lineWidth = 1.25;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (frame == 0) {
        ctx.moveTo(5,0);
        ctx.lineTo(6.5,0);
        ctx.moveTo(6.5,-1.5);
        ctx.lineTo(6.5,1.5);
    }
    else {
        var r1 = 7.5;
        var r2 = 8.5;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        ctx.moveTo(-3+r1*c,r1*s);
        ctx.lineTo(-3+r2*c,r2*s);
        ctx.moveTo(-3+r1*c,-r1*s);
        ctx.lineTo(-3+r2*c,-r2*s);
    }
    ctx.stroke();

    // mole
    ctx.beginPath();
    ctx.arc(-3,2,0.5,0,Math.PI*2);
    ctx.fillStyle = "#000";
    ctx.fill();

    // eye
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    ctx.beginPath();
    if (frame == 0) {
        ctx.moveTo(-2.5,-2);
        ctx.lineTo(-0.5,-2);
    }
    else {
        var r1 = 0.5;
        var r2 = 2.5;
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        ctx.moveTo(-3+r1*c,-2-r1*s);
        ctx.lineTo(-3+r2*c,-2-r2*s);
    }
    ctx.stroke();

    ctx.restore();
};

////////////////////////////////////////////////////////////////////
// FRUIT SPRITES

var drawCherry = function(ctx,x,y) {

    // cherry
    var cherry = function(x,y) {
        ctx.save();
        ctx.translate(x,y);

        // red fruit
        ctx.beginPath();
        ctx.arc(2.5,2.5,3,0,Math.PI*2);
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.fillStyle = "#ff0000";
        ctx.fill();

        // white shine
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(1,3);
        ctx.lineTo(2,4);
        ctx.strokeStyle = "#fff";
        ctx.stroke();
        ctx.restore();
    };

    ctx.save();
    ctx.translate(x,y);

    // draw both cherries
    cherry(-6,-1);
    cherry(-1,1);

    // draw stems
    ctx.beginPath();
    ctx.moveTo(-3,0);
    ctx.bezierCurveTo(-1,-2, 2,-4, 5,-5);
    ctx.lineTo(5,-4);
    ctx.bezierCurveTo(3,-4, 1,0, 1,2);
    ctx.strokeStyle = "#ff9900";
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
};

var drawStrawberry = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // red body
    ctx.beginPath();
    ctx.moveTo(-1,-4);
    ctx.bezierCurveTo(-3,-4,-5,-3, -5,-1);
    ctx.bezierCurveTo(-5,3,-2,5, 0,6);
    ctx.bezierCurveTo(3,5, 5,2, 5,0);
    ctx.bezierCurveTo(5,-3, 3,-4, 0,-4);
    ctx.fillStyle = "#f00";
    ctx.fill();
    ctx.strokeStyle = "#f00";
    ctx.stroke();

    // white spots
    var spots = [
        {x:-4,y:-1},
        {x:-3,y:2 },
        {x:-2,y:0 },
        {x:-1,y:4 },
        {x:0, y:2 },
        {x:0, y:0 },
        {x:2, y:4 },
        {x:2, y:-1 },
        {x:3, y:1 },
        {x:4, y:-2 } ];

    ctx.fillStyle = "#fff";
    var i,len;
    for (i=0, len=spots.length; i<len; i++) {
        var s = spots[i];
        ctx.beginPath();
        ctx.arc(s.x,s.y,0.75,0,2*Math.PI);
        ctx.fill();
    }

    // green leaf
    ctx.beginPath();
    ctx.moveTo(0,-4);
    ctx.lineTo(-3,-4);
    ctx.lineTo(0,-4);
    ctx.lineTo(-2,-3);
    ctx.lineTo(-1,-3);
    ctx.lineTo(0,-4);
    ctx.lineTo(0,-2);
    ctx.lineTo(0,-4);
    ctx.lineTo(1,-3);
    ctx.lineTo(2,-3);
    ctx.lineTo(0,-4);
    ctx.lineTo(3,-4);
    ctx.closePath();
    ctx.strokeStyle = "#00ff00";
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // stem
    ctx.beginPath();
    ctx.moveTo(0,-4);
    ctx.lineTo(0,-5);
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.restore();
};

var drawOrange = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // orange body
    ctx.beginPath();
    ctx.moveTo(-2,-2);
    ctx.bezierCurveTo(-3,-2, -5,-1, -5,1);
    ctx.bezierCurveTo(-5,4, -3,6, 0,6);
    ctx.bezierCurveTo(3,6, 5,4, 5,1);
    ctx.bezierCurveTo(5,-1, 3,-2, 2,-2);
    ctx.closePath();
    ctx.fillStyle="#ffcc33";
    ctx.fill();
    ctx.strokeStyle = "#ffcc33";
    ctx.stroke();

    // stem
    ctx.beginPath();
    ctx.moveTo(-1,-1);
    ctx.quadraticCurveTo(-1,-2,-2,-2);
    ctx.quadraticCurveTo(-1,-2,-1,-4);
    ctx.quadraticCurveTo(-1,-2,0,-2);
    ctx.quadraticCurveTo(-1,-2,-1,-1);
    ctx.strokeStyle = "#ff9900";
    ctx.lineJoin = 'round';
    ctx.stroke();

    // green leaf
    ctx.beginPath();
    ctx.moveTo(-0.5,-4);
    ctx.quadraticCurveTo(0,-5,1,-5);
    ctx.bezierCurveTo(2,-5, 3,-4,4,-4);
    ctx.bezierCurveTo(3,-4, 3,-3, 2,-3);
    ctx.bezierCurveTo(1,-3,1,-4,-0.5,-4);
    ctx.strokeStyle = "#00ff00";
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.fillStyle = "#00ff00";
    ctx.fill();

    ctx.restore();
};

var drawApple = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // red fruit
    ctx.beginPath();
    ctx.moveTo(-2,-3);
    ctx.bezierCurveTo(-2,-4,-3,-4,-4,-4);
    ctx.bezierCurveTo(-5,-4,-6,-3,-6,0);
    ctx.bezierCurveTo(-6,3,-4,6,-2.5,6);
    ctx.quadraticCurveTo(-1,6,-1,5);
    ctx.bezierCurveTo(-1,6,0,6,1,6);
    ctx.bezierCurveTo(3,6, 5,3, 5,0);
    ctx.bezierCurveTo(5,-3, 3,-4, 2,-4);
    ctx.quadraticCurveTo(0,-4,0,-3);
    ctx.closePath();
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    // stem
    ctx.beginPath();
    ctx.moveTo(-1,-3);
    ctx.quadraticCurveTo(-1,-5, 0,-5);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ff9900';
    ctx.stroke();

    // shine
    ctx.beginPath();
    ctx.moveTo(2,3);
    ctx.quadraticCurveTo(3,3, 3,1);
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    ctx.restore();
};

var drawMelon = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // draw body
    ctx.beginPath();
    ctx.arc(0,2,5.5,0,Math.PI*2);
    ctx.fillStyle = "#7bf331";
    ctx.fill();

    // draw stem
    ctx.beginPath();
    ctx.moveTo(0,-4);
    ctx.lineTo(0,-5);
    ctx.moveTo(2,-5);
    ctx.quadraticCurveTo(-3,-5,-3,-6);
    ctx.strokeStyle="#69b4af";
    ctx.lineCap = "round";
    ctx.stroke();

    // dark lines
    /*
    ctx.beginPath();
    ctx.moveTo(0,-2);
    ctx.lineTo(-4,2);
    ctx.lineTo(-1,5);
    ctx.moveTo(-3,-1);
    ctx.lineTo(-2,0);
    ctx.moveTo(-2,6);
    ctx.lineTo(1,3);
    ctx.moveTo(1,7);
    ctx.lineTo(3,5);
    ctx.lineTo(0,2);
    ctx.lineTo(3,-1);
    ctx.moveTo(2,0);
    ctx.lineTo(4,2);
    ctx.strokeStyle="#69b4af";
    ctx.lineCap = "round";
    ctx.lineJoin = 'round';
    ctx.stroke();
    */
    // dark spots
    var spots = [
        0,-2,
        -1,-1,
        -2,0,
        -3,1,
        -4,2,
        -3,3,
        -2,4,
        -1,5,
        -2,6,
        -3,-1,
        1,7,
        2,6,
        3,5,
        2,4,
        1,3,
        0,2,
        1,1,
        2,0,
        3,-1,
        3,1,
        4,2,
         ];

    ctx.fillStyle="#69b4af";
    var i,len;
    for (i=0, len=spots.length; i<len; i+=2) {
        var x = spots[i];
        var y = spots[i+1];
        ctx.beginPath();
        ctx.arc(x,y,0.65,0,2*Math.PI);
        ctx.fill();
    }

    // white spots
    var spots = [
        {x: 0,y:-3},
        {x:-2,y:-1},
        {x:-4,y: 1},
        {x:-3,y: 3},
        {x: 1,y: 0},
        {x:-1,y: 2},
        {x:-1,y: 4},
        {x: 3,y: 2},
        {x: 1,y: 4},
         ];

    ctx.fillStyle = "#fff";
    var i,len;
    for (i=0, len=spots.length; i<len; i++) {
        var s = spots[i];
        ctx.beginPath();
        ctx.arc(s.x,s.y,0.65,0,2*Math.PI);
        ctx.fill();
    }

    ctx.restore();
};

var drawKey = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // draw key metal
    ctx.beginPath();
    ctx.moveTo(-1,-2);
    ctx.lineTo(-1,5);
    ctx.moveTo(0,6);
    ctx.quadraticCurveTo(1,6,1,3);
    ctx.moveTo(1,4);
    ctx.lineTo(2,4);
    ctx.moveTo(1,1);
    ctx.lineTo(1,-2);
    ctx.moveTo(1,0);
    ctx.lineTo(2,0);
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    // draw key top
    ctx.beginPath();
    ctx.moveTo(0,-6);
    ctx.quadraticCurveTo(-3,-6,-3,-4);
    ctx.lineTo(-3,-2);
    ctx.lineTo(3,-2);
    ctx.lineTo(3,-4);
    ctx.quadraticCurveTo(3,-6, 0,-6);
    ctx.strokeStyle = ctx.fillStyle = "#68b9fc";
    ctx.fill();
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1,-5);
    ctx.lineTo(-1,-5);
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#000";
    ctx.stroke();

    ctx.restore();
};

var drawPretzel = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // bread
    ctx.beginPath();
    ctx.moveTo(-2,-5);
    ctx.quadraticCurveTo(-4,-6,-6,-4);
    ctx.quadraticCurveTo(-7,-2,-5,1);
    ctx.quadraticCurveTo(-3,4,0,5);
    ctx.quadraticCurveTo(5,5,5,-1);
    ctx.quadraticCurveTo(6,-5,3,-5);
    ctx.quadraticCurveTo(1,-5,0,-2);
    ctx.quadraticCurveTo(-2,3,-5,5);
    ctx.moveTo(1,1);
    ctx.quadraticCurveTo(3,4,4,6);
    ctx.lineWidth = 2.0;
    ctx.lineCap = 'round';
    ctx.strokeStyle = "#ffcc33";
    ctx.stroke();

    // salt
    var spots = [
        -5,-6,
        1,-6,
        4,-4,
        -5,0,
        -2,0,
        6,1,
        -4,6,
        5,5,
         ];

    ctx.fillStyle = "#fff";
    var i,len;
    for (i=0, len=spots.length; i<len; i+=2) {
        var x = spots[i];
        var y = spots[i+1];
        ctx.beginPath();
        ctx.arc(x,y,0.65,0,2*Math.PI);
        ctx.fill();
    }

    ctx.restore();
};

var drawPear = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // body
    ctx.beginPath();
    ctx.moveTo(0,-4);
    ctx.bezierCurveTo(-1,-4,-2,-3,-2,-1);
    ctx.bezierCurveTo(-2,1,-4,2,-4,4);
    ctx.bezierCurveTo(-4,6,-2,7,0,7);
    ctx.bezierCurveTo(2,7,4,6,4,4);
    ctx.bezierCurveTo(4,2,2,1,2,-1);
    ctx.bezierCurveTo(2,-3,1,-4,0,-4);
    ctx.fillStyle = ctx.strokeStyle = "#00ff00";
    ctx.stroke();
    ctx.fill();

    // blue shine
    ctx.beginPath();
    ctx.moveTo(-2,3);
    ctx.quadraticCurveTo(-2,5,-1,5);
    ctx.strokeStyle = "#0033ff";
    ctx.lineCap = 'round';
    ctx.stroke();

    // white stem
    ctx.beginPath();
    ctx.moveTo(0,-4);
    ctx.quadraticCurveTo(0,-6,2,-6);
    ctx.strokeStyle = "#fff";
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
};

var drawBanana = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);

    // body
    ctx.beginPath();
    ctx.moveTo(-5,5);
    ctx.quadraticCurveTo(-4,5,-2,6);
    ctx.bezierCurveTo(2,6,6,2,6,-4);
    ctx.lineTo(3,-3);
    ctx.lineTo(3,-2);
    ctx.lineTo(-4,5);
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle = "#ffff00";
    ctx.stroke();
    ctx.fill();

    // stem
    ctx.beginPath();
    ctx.moveTo(4,-5);
    ctx.lineTo(5,-6);
    ctx.strokeStyle="#ffff00";
    ctx.lineCap='round';
    ctx.stroke();

    // black mark
    ctx.beginPath();
    ctx.moveTo(3,-1);
    ctx.lineTo(-2,4);
    ctx.strokeStyle = "#000";
    ctx.lineCap='round';
    ctx.stroke();

    // shine
    ctx.beginPath();
    ctx.moveTo(2,3);
    ctx.lineTo(0,5);
    ctx.strokeStyle = "#fff";
    ctx.lineCap='round';
    ctx.stroke();

    ctx.restore();
};

var getSpriteFuncFromFruitName = function(name) {
    var funcs = {
        'cherry': drawCherry,
        'strawberry': drawStrawberry,
        'orange': drawOrange,
        'apple': drawApple,
        'melon': drawMelon,
        'key': drawKey,
        'banana': drawBanana,
        'monero': drawMonero,
        'bitcoin': drawBitcoin,
        'ripple': drawRipple,
        'grin': drawGrin,
        'tari': drawTari,
    };

    return funcs[name];
};

var drawSnail = (function(){
    var plotSolid = function(points,color) {
        var len = points.length;
        var i;
        ctx.beginPath();
        ctx.moveTo(points[0],points[1]);
        for (i=2; i<len; i+=2) {
            ctx.lineTo(points[i],points[i+1]);
        }
        ctx.closePath();
        ctx.lineWidth = 1.0;
        ctx.lineJoin = "round";
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();
    };
    return function(ctx,x,y,color) {
        ctx.save();
        ctx.translate(x,y);
        ctx.beginPath();
        ctx.moveTo(-7,3);
        ctx.lineTo(-5,3);
        ctx.bezierCurveTo(-6,0,-5,-3,-2,-3);
        ctx.bezierCurveTo(0,-3,2,-2,2,2);
        ctx.bezierCurveTo(3,-1,3,-2,5,-2);
        ctx.bezierCurveTo(6,-2,6,0,5,0);
        ctx.bezierCurveTo(4,1,4,3,2,3);
        ctx.closePath();

        ctx.lineWidth = 1.0;
        ctx.lineCap = ctx.lineJoin = "round";
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(4,-2);
        ctx.lineTo(3,-5);
        ctx.moveTo(5,-1);
        ctx.lineTo(7,-5);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(3,-5, 1, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(7,-5, 1, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-4,1);
        ctx.bezierCurveTo(-5,-1,-3,-3, -1,-2);
        ctx.bezierCurveTo(0,-1,0,0,-1,1);
        ctx.bezierCurveTo(-2,1,-3,0,-2,-0.5);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#000";
        ctx.stroke();

        ctx.restore();
    };
})();

var drawHeartSprite = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = "#ffb8ff";

    ctx.beginPath();
    ctx.moveTo(0,-3);
    ctx.bezierCurveTo(-1,-4,-2,-6,-3.5,-6);
    ctx.quadraticCurveTo(-7,-6,-7,-0.5);
    ctx.bezierCurveTo(-7,2,-2,5,0,7);
    ctx.bezierCurveTo(2,5,7,2,7,-0.5);
    ctx.quadraticCurveTo(7,-6,3.5,-6);
    ctx.bezierCurveTo(2,-6,1,-4,0,-3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
};

var drawExclamationPoint = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x,y);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = ctx.fillStyle = "#ff0";
    ctx.beginPath();
    ctx.moveTo(-1,1);
    ctx.bezierCurveTo(-1,0,-1,-3,0,-3);
    ctx.lineTo(2,-3);
    ctx.bezierCurveTo(2,-2,0,0,-1,1);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(-2,3,0.5,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
};

var drawMonero = function(ctx,x,y) {
    ctx.save();
    ctx.translate(x-9,y-9);
    ctx.fillStyle="#ff6600";
    ctx.scale(8,8);
    ctx.lineWidth=0.05;
    ctx.beginPath();
    ctx.moveTo(1.12688,0);
    ctx.bezierCurveTo(0.5049,-0.002,0.0005,0.5024,0.0005,1.12441);
    ctx.bezierCurveTo(0.0005,1.24873,0.0207,1.36831,0.0579,1.4802);
    ctx.lineTo(0.39478,1.4802);
    ctx.lineTo(0.39478,0.53246);
    ctx.lineTo(1.12694,1.26463);
    ctx.lineTo(1.85908,0.53246);
    ctx.lineTo(1.85908,1.48019);
    ctx.lineTo(2.19596,1.48019);
    ctx.bezierCurveTo(2.23316,1.3683,2.25336,1.24872,2.25336,1.1244);
    ctx.bezierCurveTo(2.25335,0.50237,1.74895,-0.002,1.12694,-0.002);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle="#4c4c4c";
    ctx.lineWidth=0.05;
    ctx.beginPath();
    ctx.moveTo(0.95853,1.43297);
    ctx.lineTo(0.639,1.11343);
    ctx.lineTo(0.639,1.70977);
    ctx.lineTo(0.16438,1.70977);
    ctx.bezierCurveTo(0.36212,2.03417,0.7192299999999999,2.2508,1.12686,2.2508);
    ctx.bezierCurveTo(1.53449,2.2508,1.89164,2.03417,2.08935,1.7097699999999998);
    ctx.lineTo(1.61474,1.7097699999999998);
    ctx.lineTo(1.61474,1.11342);
    ctx.lineTo(1.29521,1.43295);
    ctx.lineTo(1.12687,1.60129);
    ctx.lineTo(0.95854,1.43296);
    ctx.lineTo(0.95853,1.43296);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

var drawBitcoin = function(ctx, x, y) {
    ctx.save();
    ctx.translate(x-9,y-9);
    ctx.strokeStyle="rgba(0,0,0,0)";
    ctx.scale(0.275, 0.275);
    ctx.miterLimit=4;
    ctx.translate(0.00630876,-0.00301984);
    ctx.fillStyle="#f7931a";
    ctx.beginPath();
    ctx.moveTo(63.033,39.744);
    ctx.bezierCurveTo(58.759,56.887,41.396,67.32,24.251000000000005,63.045);
    ctx.bezierCurveTo(7.113000000000003,58.771,-3.3199999999999967,41.407,0.9560000000000031,24.265);
    ctx.bezierCurveTo(5.228000000000003,7.120000000000001,22.591000000000005,-3.314,39.731,0.9600000000000009);
    ctx.bezierCurveTo(56.875,5.234000000000001,67.307,22.6,63.033,39.744);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle="#FFF";
    ctx.beginPath();
    ctx.moveTo(46.103,27.444);
    ctx.bezierCurveTo(46.74,23.186,43.498000000000005,20.897,39.065,19.369999999999997);
    ctx.lineTo(40.503,13.601999999999997);
    ctx.lineTo(36.992,12.726999999999997);
    ctx.lineTo(35.592,18.342999999999996);
    ctx.bezierCurveTo(34.669,18.112999999999996,33.721,17.895999999999997,32.778999999999996,17.680999999999997);
    ctx.lineTo(34.18899999999999,12.027999999999999);
    ctx.lineTo(30.679999999999993,11.152999999999999);
    ctx.lineTo(29.240999999999993,16.918999999999997);
    ctx.bezierCurveTo(28.476999999999993,16.744999999999997,27.726999999999993,16.572999999999997,26.99899999999999,16.391999999999996);
    ctx.lineTo(27.002999999999993,16.373999999999995);
    ctx.lineTo(22.160999999999994,15.164999999999996);
    ctx.lineTo(21.226999999999993,18.914999999999996);
    ctx.bezierCurveTo(21.226999999999993,18.914999999999996,23.831999999999994,19.511999999999997,23.776999999999994,19.548999999999996);
    ctx.bezierCurveTo(25.198999999999995,19.903999999999996,25.455999999999992,20.844999999999995,25.412999999999993,21.590999999999994);
    ctx.lineTo(23.77499999999999,28.161999999999992);
    ctx.bezierCurveTo(23.87299999999999,28.18699999999999,23.999999999999993,28.222999999999992,24.13999999999999,28.278999999999993);
    ctx.bezierCurveTo(24.02299999999999,28.249999999999993,23.89799999999999,28.217999999999993,23.76899999999999,28.186999999999994);
    ctx.lineTo(21.472999999999992,37.391999999999996);
    ctx.bezierCurveTo(21.298999999999992,37.824,20.857999999999993,38.471999999999994,19.86399999999999,38.226);
    ctx.bezierCurveTo(19.89899999999999,38.277,17.31199999999999,37.589,17.31199999999999,37.589);
    ctx.lineTo(15.56899999999999,41.608);
    ctx.lineTo(20.13799999999999,42.747);
    ctx.bezierCurveTo(20.987999999999992,42.96,21.82099999999999,43.183,22.64099999999999,43.393);
    ctx.lineTo(21.18799999999999,49.227000000000004);
    ctx.lineTo(24.694999999999993,50.102000000000004);
    ctx.lineTo(26.133999999999993,44.330000000000005);
    ctx.bezierCurveTo(27.09199999999999,44.59,28.02199999999999,44.830000000000005,28.931999999999995,45.056000000000004);
    ctx.lineTo(27.497999999999994,50.801);
    ctx.lineTo(31.008999999999993,51.676);
    ctx.lineTo(32.461999999999996,45.853);
    ctx.bezierCurveTo(38.449,46.986000000000004,42.95099999999999,46.529,44.846,41.114000000000004);
    ctx.bezierCurveTo(46.373,36.754000000000005,44.769999999999996,34.239000000000004,41.62,32.599000000000004);
    ctx.bezierCurveTo(43.913999999999994,32.07,45.641999999999996,30.561000000000003,46.102999999999994,27.444000000000003);
    ctx.closePath();
    ctx.moveTo(38.081,38.693);
    ctx.bezierCurveTo(36.996,43.053,29.655,40.696,27.275000000000006,40.105);
    ctx.lineTo(29.203000000000007,32.376);
    ctx.bezierCurveTo(31.583000000000006,32.97,39.215,34.146,38.081,38.693);
    ctx.closePath();
    ctx.moveTo(39.167,27.381);
    ctx.bezierCurveTo(38.177,31.347,32.067,29.332,30.085,28.838);
    ctx.lineTo(31.833000000000002,21.828000000000003);
    ctx.bezierCurveTo(33.815000000000005,22.322000000000003,40.198,23.244000000000003,39.167,27.381000000000004);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

var drawRipple = function(ctx, x, y) {
    ctx.save();
    ctx.translate(x-10,y-12);
    ctx.scale(0.12, 0.12);
    var g = ctx.createLinearGradient(50.5705,45.7015,159.0832,154.2141);
    g.addColorStop(0,"#11AAE2");
    g.addColorStop(1,"#016197");
    ctx.fillStyle= g;
    ctx.beginPath();
    ctx.moveTo(137.9,117.2);
    ctx.bezierCurveTo(132.4,114,126.10000000000001,113.10000000000001,120,112.9);
    ctx.bezierCurveTo(114.8,112.7,107.1,109.4,107.1,100);
    ctx.bezierCurveTo(107.1,93,112.8,87.3,120,87.1);
    ctx.bezierCurveTo(126.2,86.89999999999999,132.4,86,137.9,82.8);
    ctx.bezierCurveTo(148,77,154.20000000000002,66.19999999999999,154.20000000000002,54.5);
    ctx.bezierCurveTo(154.20000000000002,42.8,148.00000000000003,32,137.9,26.2);
    ctx.bezierCurveTo(127.80000000000001,20.4,115.30000000000001,20.4,105.2,26.2);
    ctx.bezierCurveTo(95,31.9,88.8,42.7,88.8,54.4);
    ctx.bezierCurveTo(88.8,60.699999999999996,91.1,66.6,93.89999999999999,72);
    ctx.bezierCurveTo(96.3,76.5,97.49999999999999,85,89.19999999999999,89.8);
    ctx.bezierCurveTo(82.99999999999999,93.39999999999999,75.29999999999998,91.1,71.49999999999999,85);
    ctx.bezierCurveTo(68.29999999999998,79.8,64.29999999999998,74.9,58.79999999999998,71.8);
    ctx.bezierCurveTo(48.69999999999998,66,36.19999999999998,66,26.09999999999998,71.8);
    ctx.bezierCurveTo(16.1,77.5,9.9,88.3,9.9,100);
    ctx.bezierCurveTo(9.9,111.7,16.1,122.5,26.299999999999997,128.3);
    ctx.bezierCurveTo(36.4,134.10000000000002,48.9,134.10000000000002,59,128.3);
    ctx.bezierCurveTo(64.5,125.10000000000001,68.4,120.30000000000001,71.7,115.10000000000001);
    ctx.bezierCurveTo(74.4,110.80000000000001,81,105.4,89.4,110.2);
    ctx.bezierCurveTo(95.60000000000001,113.8,97.5,121.60000000000001,94,128);
    ctx.bezierCurveTo(91.1,133.4,88.9,139.2,88.9,145.6);
    ctx.bezierCurveTo(88.9,157.29999999999998,95.10000000000001,168.1,105.2,173.9);
    ctx.bezierCurveTo(115.3,179.70000000000002,127.80000000000001,179.70000000000002,137.9,173.9);
    ctx.bezierCurveTo(148,168.1,154.20000000000002,157.3,154.20000000000002,145.6);
    ctx.bezierCurveTo(154.2,133.9,148,123.1,137.9,117.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};

var drawGrin = function(ctx, x, y) {
    ctx.save();
    ctx.translate(x-11,y-11);
    ctx.scale(0.0965, 0.0965);
    // Yellow Circle
    ctx.fillStyle="rgb(254,241,2)";
    ctx.beginPath();
    ctx.arc(121.8,122,85.25,0,Math.PI * 2,true);
    ctx.closePath();
    ctx.fill("evenodd");
    ctx.stroke();
    // Black filler
    ctx.translate(0.2,-2);
    ctx.fillStyle="#000";
    ctx.strokeStyle="#000";
    ctx.beginPath();
    ctx.moveTo(162,92);
    ctx.bezierCurveTo(159.966,87.434,158.071,78.413,152.855,76.407);
    ctx.bezierCurveTo(146.14,73.825,141.989,90.729,141,95);
    ctx.lineTo(140,95);
    ctx.bezierCurveTo(138.307,87.682,136.035,77.31,128,75);
    ctx.bezierCurveTo(124.28,90.624,131.886,107.479,139,121);
    ctx.bezierCurveTo(146.596,117.37,150.297,106.002,151,98);
    ctx.lineTo(152,98);
    ctx.lineTo(160,122);
    ctx.bezierCurveTo(166.436,120.15,168.675,113.781,170.999,108);
    ctx.bezierCurveTo(175.988,95.592,180.174,80.332,177,67);
    ctx.bezierCurveTo(167.395,69.72,164.473,83.455,162,92);
    ctx.moveTo(66,124);
    ctx.bezierCurveTo(74.595,119.896,78.685,106.906,80,98);
    ctx.lineTo(81,98);
    ctx.bezierCurveTo(82.017,102.293,84.736,113.368,90.1,114.079);
    ctx.bezierCurveTo(96.934,114.983,100.517,99.819,101,95);
    ctx.lineTo(102,95);
    ctx.bezierCurveTo(104.179,102.529,106.475,112.32,114,116);
    ctx.bezierCurveTo(116.776,104.34,113.452,91.905,109.188,81);
    ctx.bezierCurveTo(108.092,78.196,105.841,70.636,101.975,70.636);
    ctx.bezierCurveTo(95.641,70.636,92.08,87.332,91,92);
    ctx.lineTo(90,92);
    ctx.lineTo(82,68);
    ctx.bezierCurveTo(67.928,74.72,60.284,110.453,66,124);
    ctx.moveTo(51,136);
    ctx.bezierCurveTo(61.443,181.551,109.612,207.374,153,188.138);
    ctx.bezierCurveTo(168.791,181.137,181.317,168.663,188.539,153);
    ctx.bezierCurveTo(190.405,148.953,194.07,141.628,191.933,136.318);
    ctx.bezierCurveTo(189.805,131.029,169.166,139.671,164.009,141.928);
    ctx.bezierCurveTo(163.285,142.25,162.774,142.918,162.655,143.702);
    ctx.bezierCurveTo(162.655,143.702,162.655,143.702,162.655,143.702);
    ctx.bezierCurveTo(162.486,144.811,162.786,145.941,163.485,146.82);
    ctx.bezierCurveTo(164.183,147.699,165.216,148.247,166.335,148.333);
    ctx.bezierCurveTo(170.116,148.624,175,149,175,149);
    ctx.bezierCurveTo(159.313,179.365,116.899,192.791,87,168.532);
    ctx.bezierCurveTo(80.308,163.103,74.338,156.652,70.32,149);
    ctx.bezierCurveTo(68.377,145.3,66.575,140.568,63.272,138.029);
    ctx.bezierCurveTo(60.099,135.589,55.285,134.753,51,136);
    ctx.closePath();
    ctx.fill("nonzero");
    ctx.stroke();
    ctx.restore();
};

var drawTari = function(ctx, x, y) {
    ctx.save();
    ctx.translate(x,y);
    ctx.strokeStyle="#9330ff";
    ctx.fillStyle="#9330ff";
    ctx.translate(-9,-9);
    ctx.scale(0.065,0.065);
    ctx.beginPath();
    ctx.moveTo(115.88,0);
    ctx.lineTo(0,75.43);
    ctx.lineTo(0,154.23000000000002);
    ctx.lineTo(115.35,283.03000000000003);
    ctx.lineTo(278.94,154.7);
    ctx.lineTo(278.94,75.35);
    ctx.lineTo(115.88,0);
    ctx.closePath();
    ctx.moveTo(118.18,31.86);
    ctx.lineTo(250.99,93.22999999999999);
    ctx.lineTo(250.99,127.39999999999999);
    ctx.lineTo(50.6,75.85);
    ctx.lineTo(118.18,31.86);
    ctx.closePath();
    ctx.moveTo(129.45,125);
    ctx.lineTo(236.43,152.52);
    ctx.lineTo(129.45,236.45000000000002);
    ctx.lineTo(129.45,125);
    ctx.closePath();
    ctx.moveTo(27.95,98.89);
    ctx.lineTo(101.5,117.81);
    ctx.lineTo(101.5,225.68);
    ctx.lineTo(27.950000000000003,143.55);
    ctx.lineTo(27.950000000000003,98.89);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
};