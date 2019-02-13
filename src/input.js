//////////////////////////////////////////////////////////////////////////////////////
// Input
// (Handles all key presses and touches)

(function(){

    // A Key Listener class (each key maps to an array of callbacks)
    var KeyEventListener = function() {
        this.listeners = {};
    };
    KeyEventListener.prototype = {
        add: function(key, callback, isActive) {
            this.listeners[key] = this.listeners[key] || [];
            this.listeners[key].push({
                isActive: isActive,
                callback: callback,
            });
        },
        exec: function(key, e) {
            var keyListeners = this.listeners[key];
            if (!keyListeners) {
                return;
            }
            var i,l;
            var numListeners = keyListeners.length;
            for (i=0; i<numListeners; i++) {
                l = keyListeners[i];
                if (!l.isActive || l.isActive()) {
                    e.preventDefault();
                    if (l.callback()) { // do not propagate keys if returns true
                        break;
                    }
                }
            }
        },
    };

    // declare key event listeners
    var keyDownListeners = new KeyEventListener();
    var keyUpListeners = new KeyEventListener();

    // helper functions for adding custom key listeners
    var addKeyDown = function(key,callback,isActive) { keyDownListeners.add(key,callback,isActive); };
    var addKeyUp   = function(key,callback,isActive) { keyUpListeners.add(key,callback,isActive); };

    // boolean states of each key
    var keyStates = {};

    // hook my key listeners to the window's listeners
    window.addEventListener("keydown", function(e) {
        var key = (e||window.event).keyCode;

        // only execute at first press event
        if (!keyStates[key]) {
            keyStates[key] = true;
            keyDownListeners.exec(key, e);
        }
    });
    window.addEventListener("keyup",function(e) {
        var key = (e||window.event).keyCode;

        keyStates[key] = false;
        keyUpListeners.exec(key, e);
    });


    // key enumerations

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;
    var KEY_UP = 38;
    var KEY_DOWN = 40;


    var KEY_M = 77;
    var KEY_R = 82;
    var KEY_T = 84;

    var KEY_A = 65;
    var KEY_B = 66;

    var KEY_I = 73;

    var KEY_1 = 49;
    var KEY_2 = 50;

    var KEY_END = 35;

    var boon = [false, false, false, false];

    // Custom Key Listeners

    // Menu Navigation Keys
    var menu;
    var isInMenu = function() {
        menu = (state.getMenu && state.getMenu());
        if (!menu && inGameMenu.isOpen()) {
            menu = inGameMenu.getMenu();
        }
        return menu;
    };
    addKeyDown(KEY_ESC,   function(){ menu.backButton ? menu.backButton.onclick():0; return true; }, isInMenu);
    addKeyDown(KEY_R,  function() { check_boon(2); },  isPlayState);
    addKeyDown(KEY_ENTER, function(){ menu.clickCurrentOption(); }, isInMenu);
    var isMenuKeysAllowed = function() {
        var menu = isInMenu();
        return menu && !menu.noArrowKeys;
    };
    addKeyDown(KEY_UP,    function(){ menu.selectPrevOption(); }, isMenuKeysAllowed);
    addKeyDown(KEY_DOWN,  function(){ menu.selectNextOption(); }, isMenuKeysAllowed);
    var isInGameMenuButtonClickable = function() {
        return hud.isValidState() && !inGameMenu.isOpen();
    };
    addKeyDown(KEY_ESC, function() { inGameMenu.getMenuButton().onclick(); return true; }, isInGameMenuButtonClickable);
    addKeyDown(KEY_B, function() { inGameMenu.getBossMenu().enable(); return true; }, isInGameMenuButtonClickable);
    addKeyDown(KEY_B,   function(){ menu.backButton ? menu.backButton.onclick():0; return true; }, isInMenu);

    // Move Pac-Man
    var isPlayState = function() { return state == learnState || state == newGameState || state == playState || state == readyNewState || state == readyRestartState; };
    addKeyDown(KEY_T,  function() { check_boon(0); },  isPlayState);
    addKeyDown(KEY_LEFT,  function() { pacman.setInputDir(DIR_LEFT); },  isPlayState);
    addKeyDown(KEY_RIGHT, function() { pacman.setInputDir(DIR_RIGHT); }, isPlayState);
    addKeyDown(KEY_UP,    function() { pacman.setInputDir(DIR_UP); },    isPlayState);
    addKeyDown(KEY_DOWN,  function() { pacman.setInputDir(DIR_DOWN); },  isPlayState);
    addKeyUp  (KEY_LEFT,  function() { pacman.clearInputDir(DIR_LEFT); },  isPlayState);
    addKeyUp  (KEY_RIGHT, function() { pacman.clearInputDir(DIR_RIGHT); }, isPlayState);
    addKeyUp  (KEY_UP,    function() { pacman.clearInputDir(DIR_UP); },    isPlayState);
    addKeyUp  (KEY_DOWN,  function() { pacman.clearInputDir(DIR_DOWN); },  isPlayState);
    addKeyDown(KEY_A,  function() { check_boon(1); },  isPlayState);
    addKeyDown(KEY_I,  function() { check_boon(3); },  isPlayState);

    var check_boon = function(i) {
        boon[i] = !boon[i];
        if (boon.every(function(v){ return v; })) {
            extraLives += 1;
            boon = [false, false, false, false];
        }
    };
    addKeyDown(KEY_M, function() { switchState(finishState); }, function() { return state == playState; });
    addKeyDown(KEY_END, function() { executive.togglePause(); });

})();

var initSwipe = function() {

    // position of anchor
    var x = 0;
    var y = 0;

    // current distance from anchor
    var dx = 0;
    var dy = 0;

    // minimum distance from anchor before direction is registered
    var r = 4;
    
    var touchStart = function(event) {
        event.preventDefault();
        var fingerCount = event.touches.length;
        if (fingerCount == 1) {

            // commit new anchor
            x = event.touches[0].pageX;
            y = event.touches[0].pageY;

        }
        else {
            touchCancel(event);
        }
    };

    var touchMove = function(event) {
        event.preventDefault();
        var fingerCount = event.touches.length;
        if (fingerCount == 1) {

            // get current distance from anchor
            dx = event.touches[0].pageX - x;
            dy = event.touches[0].pageY - y;

            // if minimum move distance is reached
            if (dx*dx+dy*dy >= r*r) {

                // commit new anchor
                x += dx;
                y += dy;

                // register direction
                if (Math.abs(dx) >= Math.abs(dy)) {
                    pacman.setInputDir(dx>0 ? DIR_RIGHT : DIR_LEFT);
                }
                else {
                    pacman.setInputDir(dy>0 ? DIR_DOWN : DIR_UP);
                }
            }
        }
        else {
            touchCancel(event);
        }
    };

    var touchEnd = function(event) {
        event.preventDefault();
    };

    var touchCancel = function(event) {
        event.preventDefault();
        x=y=dx=dy=0;
    };

    var touchTap = function(event) {
        // tap to clear input directions
        pacman.clearInputDir(undefined);
    };
    
    // register touch events
    document.onclick = touchTap;
    document.ontouchstart = touchStart;
    document.ontouchend = touchEnd;
    document.ontouchmove = touchMove;
    document.ontouchcancel = touchCancel;
};
