var UserInterface = (function iife() {
    'use strict';
    function UserInterface(game) {
        this.game = game;
        var _this = this;
        //gold
        this.goldX = 150;
        this.goldY = 0;
        this.gold = this.game.add.text(this.goldX , this.goldY, 'gold: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#FFD700'}
        );

        //killed
        this.killedX = 300;
        this.killedY = 0;
        this.killed = this.game.add.text(this.killedX, this.killedY, 'killed: ' + this.game.player.gold,
            {font: "24px Arial", fill: '#ff00ff'}
        );

        //turret build
        this.turretX = 300;
        this.turretY = 500;
        this.turret = new WorldObject(_this.game, 0, 0, 'turret', 0);
        this.turret.scale.setTo(0.5);
        this.turret.inputEnabled = true;
        this.turret.events.onInputDown.add(onClickButtonTower1, this);
        function onClickButtonTower1() {
            _this.game.cursorType = CURSOR_TYPE.TURRET;
            _this.game.buildState = true;
            _this.game.canBuild = false;
            _this.game.time.events.add(1000, function () {
                _this.game.canBuild = true
            }, this);
        }

        this.turret.events.onInputOver.add(function () {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }, this);

        this.turret.events.onInputOut.add(function () {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }, this);

        this.dialog = {};
        this.dialog.tower = {};
        this.dialog.unit = {};
        this.dialog.tower.sprite = null;
        this.dialog.tower.health = null;
        this.dialog.tower.damage = null;
        this.dialog.tower.range = null;
        this.dialog.tower.fireDamage = null;
    }

    UserInterface.prototype.update = function update(xOffset, yOffset) {
        this.turret.x = this.turretX + xOffset;
        this.turret.y = this.turretY + yOffset;
        this.gold.x = this.goldX + xOffset;
        this.gold.y = this.goldY + yOffset;
        this.killed.x = this.killedX + xOffset;
        this.killed.y = this.killedY + yOffset;
    };
    UserInterface.prototype.showDialog = function showDialog(dialog){
        this.dialog[dialog.type] = dialog;
    };

    return UserInterface;
}());
