var Building = (function iife(parent) {
    'use strict';

    const startFrame = 0;
    
    function Building(game, x, y, spriteName, player, moneyCost) {
        validator.validateIfNumber(moneyCost, this.constructor.name + ' moneyCost');
        
        parent.call(this, game, x, y, spriteName, startFrame);

        this.game.buildings.add(this);
        player.gold -= moneyCost;
        this.playerId =  player.id;
        this.x = x;
        this.y = y;
        //this.animations.add('build');
        //this.animations.play('build', buildAnimationLength, true);
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;

    return Building;
}(WorldObject));