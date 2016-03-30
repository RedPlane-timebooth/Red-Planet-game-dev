var Building = (function iife(parent) {
    'use strict';

    const START_FRAME = 0;
    
    function Building(game, x, y, spriteName, player) {
        parent.call(this, game, x, y, spriteName, START_FRAME);
        
        this.game.buildings.add(this);
        this.playerId =  player.id;
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;
    Building.prototype.canBuild = function canBuild(playerMoney, moneyCost) {
        return playerMoney >= moneyCost;
    };
    
    return Building;
}(WorldObject));