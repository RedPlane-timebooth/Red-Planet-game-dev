var UserInterface = (function iife() {
    'use strict';
    const DIALOG_X = 200;
    const DIALOG_Y = 450;

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
        this.turretX = 100;
        this.turretY = 500;
        this.turret = new WorldObject(_this.game, 0, 0, 'turret', 0);
        this.turret.scale.setTo(0.7);
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
        this.dialog.tower.show = false;
        this.dialog.unit = {};
        this.dialog.unit.show = false;
    }

    UserInterface.prototype.update = function update(xOffset, yOffset) {
        this.turret.x = this.turretX + xOffset;
        this.turret.y = this.turretY + yOffset;
        this.gold.x = this.goldX + xOffset;
        this.gold.y = this.goldY + yOffset;
        this.killed.x = this.killedX + xOffset;
        this.killed.y = this.killedY + yOffset;
        if(this.dialog.tower.show){
            this.dialog.tower.sprite.x = DIALOG_X + xOffset;
            this.dialog.tower.sprite.y = DIALOG_Y + yOffset;
            this.dialog.tower.damage.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.damage.y = DIALOG_Y + yOffset;
            this.dialog.tower.range.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.range.y = DIALOG_Y + 40 + yOffset;
            this.dialog.tower.speed.x = DIALOG_X + 100 + xOffset;
            this.dialog.tower.speed.y = DIALOG_Y + 80 + yOffset;
        }

    };
    UserInterface.prototype.showDialog = function showDialog(dialog){
        this.dialog[dialog.infoType] = dialog;
        if(dialog.infoType === 'tower'){
            this.dialog.tower.show = true;
            this.dialog.tower.sprite = this.game.add.sprite(DIALOG_X, DIALOG_Y, dialog.spriteKey, 0);
            this.dialog.tower.damage = this.game.add.text(DIALOG_X + 100, DIALOG_Y, 'damage: ' + dialog.damage,
                {font: "24px Arial", fill: '#ff00ff'}
            );
            this.dialog.tower.range = this.game.add.text(DIALOG_X + 100, DIALOG_Y + 40, 'range: ' + dialog.range,
                {font: "24px Arial", fill: '#ff00ff'}
            );
            this.dialog.tower.speed = this.game.add.text(DIALOG_X + 100, DIALOG_Y + 80, 'speed: ' + dialog.fireSpeed + '/s',
                {font: "24px Arial", fill: '#ff00ff'}
            );
        }
    };

    UserInterface.prototype.hideDialog = function showDialog(){
        //if(this.dialog.tower.show){
            this.dialog.tower.show = false;
            this.dialog.tower.sprite.visible = false;
            this.dialog.tower.damage.visible = false;
            this.dialog.tower.speed.visible = false;
            this.dialog.tower.range.visible = false;
        //}
    };
    return UserInterface;
}());
