// load boss screen. ctx is a canvas context:
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

var BossScreen = {
    draw: function(ctx) {
        loadBoss(ctx, level);
    }
};

var screens = [ircScreen, dosScreen, dosScreen2, dosScreen3, dosScreen4, dosScreen5];

var loadBoss = function(ctx, index, x, y) {
    var screenFunc = screens[(index-1) % screens.length];
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
        " KQ3          <DIR>                           11-08-86",
        " MONTEZ~1     <DIR>                           11-10-84",
        " LSLLLL       <DIR>                           05-07-87",
        " WINGCOM3     <DIR>                           27-03-94",
        " SQ1          <DIR>                           15-10-86",
        " PQ1          <DIR>                           01-09-87",
        " PICS         <DIR>                           05-10-92",
        " WORK         <DIR>                           04-11-95",
        " USER.TXT                                     01-01-70",
        " SYS.COM                                      01-01-70",
        " PASSWORD.TXT                                 01-01-70",
        "                            3 file(s) 15,762,198 bytes",
        "                         8 dir(s) 5,209,322 bytes free"

    ];
    //var size = Math.floor(20.0 / renderScale);
    var size = 8.0;
    ctx.save();
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
        "Gentlemen",
        "",
        "Enclosed please find my personal check in the amount of",
        "$57.30 to cover three insertions of the following classified",
        "advertisement in your \"Seeking Position\" department:",
        "",
        "   Mature, experienced software analyst available. Bug",
        "   installation a proven speciality. \"No version too",
        "   clean.\" Familiar with DOS 1.0, AGI and SCI."
    ];
    var char_height = 7.0;
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = char_height + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#00ff00";
    for (var i=0; i<lines.length; i++) {
        ctx.fillText(lines[i], 5, (char_height + 3) * (i + 1));
    }
    ctx.restore();
}

function dosScreen3(ctx) {
    var lines = [
        "",
        "C\\>ls",
        "Bad command or file name",
        "",
        "C\\>type user.txt",
        "1tAR19",
        "",
        "C\\>type password.txt",
        "RixQ",
        "",
        "C\\>type sys.com",
        "sbXLUkXhjZFMaRUxp5saDwE",
        "",
        "C\\>_",
    ];
    var char_height = 8.0;
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = char_height + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";
    for (var i=0; i< lines.length; i++) {
        ctx.fillText(lines[i], 5, (char_height + 3) * (i + 1));
    }
    ctx.restore();
}

function dosScreen4(ctx) {
    var char_height = 6.0;
    var char_width= char_height / 2.0;
    //Render top and side borders
    ctx.save();
    ctx.translate(-17, 80);
    ctx.fillStyle = "#00ffff";
    ctx.fillRect(0 ,0, 260, char_height);
    ctx.fillRect(0, 0, char_height * 2, 116);
    //Render Border Text
    var black_text_lines = [
        "        A        B        C        D        E        F        G        H",
        "  0",
        "  1",
        "  2",
        "  3",
        "  4",
        "  5",
        "  6",
        "  7",
        "  8",
        "  9",
        " 10",
        " 11",
        " 12",
        " 13",
        " 14",
        " 15",
        " 16",
        " 17",
        " 18",
        " 19",
        " 20"
    ];
    ctx.textAlign = "left";
    ctx.font = char_height + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#000000";
    for (var i=0; i<black_text_lines.length; i++) {
        ctx.fillText(black_text_lines[i], 0, (char_width + 2) * i);
    }
    //Render primary white text
    ctx.fillStyle = "#FFFFFF";
    var white_text_lines = [
        "",
        "",
        "                             REVENUES FROM DIFFERENT CITIES",
        "",
        "                       JANUARY  FEBRUARY  MARCH    APRIL     MAY     JUNE",
        "",
        "    SAN FRANCISCO",
        "    LOS ANGELES",
        "    BOSTON",
        "    CHICAGO",
        "    NEW YORK",
        "    DENVER",
        "    HOUSTON",
        "    SAN DIEGO",
        "    OAKLAND",
        "    SAN JOSE",
        "    RENO",
        "    LAS VEGAS"
    ];
    for (var i=0; i<white_text_lines.length; i++) {
        ctx.fillText(white_text_lines[i], 0, (char_width + 2) * i);
    }
    //Render Numbers
    var value_matrix = [
        259.0,	265.0,	325.0,	329.0,	334.0,	395.0,
        133.0,	191.0,	256.0,	250.0,	250.0,	260.0,
        127.0,	196.0,	246.0,	255.0,	256.0,	257.0,
        137.0,	196.0,	255.0,	262.0,	259.0,	257.0,
        131.0,	184.0,	244.0,	251.0,	257.0,	266.0,
        139.0,	194.0,	246.0,	251.0,	251.0,	262.0,
        131.0,	189.0,	245.0,	252.0,	252.0,	256.0,
        135.0,	193.0,	252.0,	257.0,	254.0,	260.0,
        129.0,	181.0,	256.0,	250.0,	266.0,	266.0,
        140.0,	194.0,	242.0,	260.0,	265.0,	264.0,
        125.0,	191.0,	244.0,	249.0,	256.0,	257.0,
        128.0,	181.0,	255.0,	260.0,	266.0,	270.0,
    ];

    ctx.textAlign = "right";
    var render_row_offset = 10 * char_width;
    var render_column_offset = 17 * char_height;
    var row_index = 0;
    var column_index = 0;
    for (var i=0; i<value_matrix.length; i++) {

        //TODO encode values here, might be better to hardcode results
        // if (i<address.length) {
        //     value_matrix[i]=value_matrix[i]-address[i];
        // }

        ctx.fillText(value_matrix[i].toFixed(3), render_column_offset + (char_height + 24) * column_index, render_row_offset + (char_width + 2) * row_index);
        column_index = column_index + 1;
        if(column_index >= 6) {
            row_index = row_index + 1;
            column_index = 0;
        }
    }

    ctx.restore();
}

function dosScreen5(ctx) {
    var block_size = 26;
    var n_horizontal_lines = 9;
    var n_vertical_lines = 5;
    var char_height = 10.0;
    var char_width = char_height / 2.0;
    var line_thickness = 1.0;
    var horizontal_line_length = block_size * (n_horizontal_lines - 1) + line_thickness;
    var vertical_line_length = block_size * (n_vertical_lines - 1) + line_thickness;

    ctx.save();
    ctx.translate(12, 80);
    ctx.fillStyle = "#4cbb17";
    ctx.textAlign = "right";
    ctx.font = char_height + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    for(var y=0;y<n_vertical_lines;y++) {
        ctx.fillRect(0, y * block_size, horizontal_line_length, line_thickness);
        if(y >= 1) {
            ctx.fillText(y * 5, -1, vertical_line_length - char_width - (y * block_size));
        }
    }
    ctx.fillText(0, -1, vertical_line_length);
    ctx.textAlign = "center";
    for (var x=0; x<n_horizontal_lines; x++) {
        ctx.fillRect( x*block_size, 0, line_thickness, vertical_line_length);
        if (x >= 1) {
            ctx.fillText(x * 5, x * block_size, vertical_line_length + 1);
        }
    }
    //Draw red line
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(line_thickness, 2.7 * block_size);
    ctx.lineTo(0.8 * block_size, 2.7 * block_size);
    ctx.lineTo(1.5 * block_size, 2.95 * block_size);
    ctx.lineTo(2.5 * block_size, 1.5 * block_size);
    ctx.lineTo(3.4 * block_size, 2.4 * block_size);
    ctx.lineTo(4.0 * block_size, 1.5 * block_size);
    ctx.lineTo(4.5 * block_size, 1.8 * block_size);
    ctx.lineTo(5.0 * block_size, 1.2 * block_size);
    ctx.lineTo(5.8 * block_size, 1.2 * block_size);
    ctx.lineTo(8.0 * block_size, line_thickness);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
}

function ircScreen(ctx) {
    var char_height = 7.0;

    function write_msg(i, time, nick, color, msg) {
        var x = 5;
        var y = (char_height + 3) * (+i + 1);
        var t = time;
        ctx.fillText(t, x, y);
        ctx.save();
        ctx.fillStyle = color;
        x += ctx.measureText(t).width + 3;
        ctx.fillText(nick, x, y);
        ctx.restore();
        x += ctx.measureText(nick).width + 3;
        ctx.fillText(msg, x, y);
    }

    ctx.save();
    ctx.textAlign = "left";
    ctx.font = char_height + "px dos437,courier";
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#fff";

    var lines = [
        ["[06:01]", "FreeNode IRC", "red", "Welcome to #tari-dev. This is a SERIOUS"],
        ["[06:01]", "FreeNode IRC", "red", "channel for SERIOUS developers."],
        ["[06:01]", "FreeNode IRC", "red", "No mucking around. No jokes. No fun. "],
        ["[06:01]", "fluffypony", "green", "joined the channel."],
        ["[06:01]", "morty", "dodgerblue", "joined the channel."],
        ["[06:10]", "<fluffypony>", "green", "Morty, I need your help. We need to go on"],
        ["", "", "green", "a quick adventure."],
        ["[06:10]", "<morty>", "dodgerblue", "You said I could go to school today, Ric!"],
        ["[06:10]", "<fluffypony>", "green", "That was before I needed something Morty!"],
        ["", "", "green", "There is a cryptographic proof in the Abidongo archipelago and"],
        ["", "", "green", "we need to go get it! It is just a 20min boat ride through a"],
        ["", "", "green", "small squall! I've got my private keys in case we need them!"],
        ["[06:11]", "<morty>", "dodgerblue", "Aww jeez Ric, that sounds kinda risky..."],
        ["[06:11]", "<fluffypony>", "green", "Shut-up Morty, lets go!"],
    ];
    for (var i in lines) {
        var line = lines[i];
        line.unshift(i);
        write_msg.apply(null, line);
    }
    ctx.restore();
}