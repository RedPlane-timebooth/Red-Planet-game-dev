var WorldObject = (function iife(parent) {
    'use strict';
    
    function WorldObject(game, x, y, spriteName, frames) {
        parent.call(this, game, x, y, spriteName, frames);
        this.anchor.setTo(0.5);
        game.add.existing(this);
    }

    WorldObject.prototype = Object.create(parent.prototype);
    WorldObject.prototype.constructor = WorldObject;
    
    return WorldObject;
}(Phaser.Sprite));
