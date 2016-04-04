var Building = (function iife(parent) {
    'use strict';
    
    function Building(game, x, y, spriteName, startFrame, player) {
        parent.call(this, game, x, y, spriteName, startFrame);
        
        this.game.buildings.add(this);
        this.playerId =  player.id;
        this.inputEnabled = true;
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;

    Building.prototype.canBuild = function canBuild(playerMoney, moneyCost) {
        return playerMoney >= moneyCost;
    };
    Building.prototype.onBuildingOver = function onBuildingOver() {
        if(this.game.buildState){
            if(this.game.cursorType = CURSOR_TYPE.TURRET){
                this.game.cursorType = CURSOR_TYPE.TURRET_RED;
            }
            this.game.canBuild = false;
        } else {
            this.game.cursorType = CURSOR_TYPE.POINTER;
        }
    };
    Building.prototype.onBuildingOut = function onBuildingOut() {
        if(this.game.buildState){
            if(this.game.cursorType = CURSOR_TYPE.TURRET_RED){
                this.game.cursorType = CURSOR_TYPE.TURRET;
            }
            this.game.canBuild = true;
        } else {
            this.game.cursorType = CURSOR_TYPE.NORMAL;
        }
    };
    
    return Building;
}(WorldObject));