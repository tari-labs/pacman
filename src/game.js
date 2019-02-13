//////////////////////////////////////////////////////////////////////////////////////
// Game

// game modes
var GAME_PACMAN = 0;
var GAME_MSPACMAN = 1;
var GAME_COOKIE = 2;
var GAME_OTTO = 3;

var practiceMode = false;
var turboMode = false;

// current game mode
var gameMode = GAME_MSPACMAN;
var getGameName = (function(){

    var names = ["PAC-MAN", "MS FLUFFY", "COOKIE-MAN","CRAZY OTTO"];
    
    return function(mode) {
        if (mode == undefined) {
            mode = gameMode;
        }
        return names[mode];
    };
})();

var getGameDescription = (function(){

    var desc = [
        [],
        [
            "TARI LABS VALENTINES EDITION",
            "(c) SixtyFour nibbles 2019 ",
            "",
            "THANK YOU",
            "BART GRANTHAM",
            "SHAUN WILLIAMS",
            "Alexey Pajitnov, the OG BOSS",
        ],
        [],
        [],
    ];
    
    return function(mode) {
        if (mode == undefined) {
            mode = gameMode;
        }
        return desc[mode];
    };
})();

var getGhostNames = function(mode) {
    return ["roger.ver","jihan.wu","craig.wright","dan.larimer"];
};

var getGhostDrawFunc = function(mode) {
    return atlas.drawGhostSprite;

};

var getPlayerDrawFunc = function(mode) {
    return atlas.drawMsPacmanSprite;
};


// for clearing, backing up, and restoring cheat states (before and after cutscenes presently)
var clearCheats, backupCheats, restoreCheats;
(function(){
    clearCheats = function() {
        pacman.invincible = false;
        pacman.ai = false;
        for (i=0; i<5; i++) {
            actors[i].isDrawPath = false;
            actors[i].isDrawTarget = false;
        }
        executive.setUpdatesPerSecond(60);
    };

    var i, invincible, ai, isDrawPath, isDrawTarget;
    isDrawPath = {};
    isDrawTarget = {};
    backupCheats = function() {
        invincible = pacman.invincible;
        ai = pacman.ai;
        for (i=0; i<5; i++) {
            isDrawPath[i] = actors[i].isDrawPath;
            isDrawTarget[i] = actors[i].isDrawTarget;
        }
    };
    restoreCheats = function() {
        pacman.invincible = invincible;
        pacman.ai = ai;
        for (i=0; i<5; i++) {
            actors[i].isDrawPath = isDrawPath[i];
            actors[i].isDrawTarget = isDrawTarget[i];
        }
    };
})();

// current level, lives, and score
var level = 1;
var extraLives = 0;

/// SCORING
// (manages scores and high scores for each game type)

var scores = [
    0,0, // pacman
    0,0, // mspac
    0,0, // cookie
    0,0, // otto
    0 ];
var highScores = [
    1000,1000, // pacman
    1000,1000, // mspac
    1000,1000, // cookie
    1000,1000, // otto
    ];

var getScoreIndex = function() {
    return gameMode*2 + (turboMode ? 1 : 0);
};

// handle a score increment
var addScore = function(p) {

    // get current scores
    var score = getScore();

    // handle extra life at 10000 points
    if (score < 10000 && score+p >= 10000) {
        extraLives++;
        renderer.drawMap();
    }

    score += p;
    setScore(score);

    if (!practiceMode) {
        if (score > getHighScore()) {
            setHighScore(score);
        }
    }
};

var getScore = function() {
    return scores[getScoreIndex()];
};
var setScore = function(score) {
    scores[getScoreIndex()] = score;
};

var getHighScore = function() {
    return highScores[getScoreIndex()];
};
var setHighScore = function(highScore) {
    highScores[getScoreIndex()] = highScore;
    saveHighScores();
};
// High Score Persistence

var loadHighScores = function() {
    var hs;
    var hslen;
    var i;
    if (localStorage && localStorage.highScores) {
        hs = JSON.parse(localStorage.highScores);
        hslen = hs.length;
        for (i=0; i<hslen; i++) {
            highScores[i] = Math.max(highScores[i],hs[i]);
        }
    }
};
var saveHighScores = function() {
    if (localStorage) {
        localStorage.highScores = JSON.stringify(highScores);
    }
};
