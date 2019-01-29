////////////////////////////////////////////////////
// In-Game Menu
var inGameMenu = (function() {

    var w=tileSize*6,h=tileSize*3;

    var getMainMenu = function() {
        return practiceMode ? practiceMenu : menu;
    };
    var showMainMenu = function() {
        getMainMenu().enable();
    };
    var hideMainMenu = function() {
        getMainMenu().disable();
    };

    // button to enable in-game menu
    var btn = new Button(mapWidth/2 - w/2,mapHeight,w,h, function() {
        showMainMenu();
    });
    btn.setText("MENU");
    btn.setFont(tileSize+"px ArcadeR","#FFF");

    // boss menu
    var bossMenu = new Menu(undefined, 2*tileSize,5*tileSize,mapWidth-4*tileSize,3*tileSize, tileSize, "10px Dos437,courier", "#fff");
    bossMenu.hidden = { onclick: function() {bossMenu.disable();}};
    bossMenu.backButton = bossMenu.hidden;
    // override boss menu draw function
    bossMenu.draw = function(ctx) {
        loadBoss(ctx, level, this.x, this.y);
    };

    // confirms a menu action
    var confirmMenu = new Menu("QUESTION?",2*tileSize,5*tileSize,mapWidth-4*tileSize,3*tileSize,tileSize,tileSize+"px ArcadeR", "#EEE");
    confirmMenu.addTextButton("YES", function() {
        confirmMenu.disable();
        confirmMenu.onConfirm();
    });
    confirmMenu.addTextButton("NO", function() {
        confirmMenu.disable();
        showMainMenu();
    });
    confirmMenu.addTextButton("CANCEL", function() {
        confirmMenu.disable();
        showMainMenu();
    });
    confirmMenu.backButton = confirmMenu.buttons[confirmMenu.buttonCount-1];

    var showConfirm = function(title,onConfirm) {
        hideMainMenu();
        confirmMenu.title = title;
        confirmMenu.onConfirm = onConfirm;
        confirmMenu.enable();
    };

    // regular menu
    var menu = new Menu("PAUSED",2*tileSize,5*tileSize,mapWidth-4*tileSize,3*tileSize,tileSize,tileSize+"px ArcadeR", "#EEE");
    menu.addTextButton("RESUME", function() {
        menu.disable();
    });
    menu.addTextButton("QUIT", function() {
        showConfirm("QUIT GAME?", function() {
            switchState(preNewGameState, 60);
        });
    });
    menu.backButton = menu.buttons[0];

    // practice menu
    var practiceMenu = new Menu("PAUSED",2*tileSize,5*tileSize,mapWidth-4*tileSize,3*tileSize,tileSize,tileSize+"px ArcadeR", "#EEE");
    practiceMenu.addTextButton("RESUME", function() {
        hideMainMenu();
    });
    practiceMenu.addTextButton("QUIT", function() {
        showConfirm("QUIT GAME?", function() {
            switchState(preNewGameState, 60);
            clearCheats();
        });
    });
    practiceMenu.backButton = practiceMenu.buttons[0];


    var menus = [menu, practiceMenu, confirmMenu, bossMenu];
    var getVisibleMenu = function() {
        var len = menus.length;
        var i;
        var m;
        for (i=0; i<len; i++) {
            m = menus[i];
            if (m.isEnabled()) {
                return m;
            }
        }
    };

    return {
        onHudEnable: function() {
            btn.enable();
        },
        onHudDisable: function() {
            btn.disable();
        },
        update: function() {
            if (btn.isEnabled) {
                btn.update();
            }
        },
        draw: function(ctx) {
            var m = getVisibleMenu();
            if (m) {
                ctx.fillStyle = "rgba(0,0,0,0.9)";
                ctx.fillRect(-mapPad-1,-mapPad-1,mapWidth+1,mapHeight+1);
                m.draw(ctx);
            }
            else {
                btn.draw(ctx);
            }
        },
        isOpen: function() {
            return getVisibleMenu() != undefined;
        },
        getMenu: function() {
            return getVisibleMenu();
        },
        getBossMenu: function() {
            return bossMenu;
        },
        getMenuButton: function() {
            return btn;
        },
    };
})();

