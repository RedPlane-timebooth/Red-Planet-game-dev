var WorldObject = (function iife(parent) {
    'use strict';
    
    function WorldObject(game, x, y, spriteName, frames) {
        frames = frames || 0;
        validator.validateIfObject(game, this.constructor.name + ' game');
        validator.validateIfNumber(x, this.constructor.name + ' x');
        validator.validateIfNumber(y, this.constructor.name + ' y');
        validator.validateIfString(spriteName, this.constructor.name + ' spriteName');
        validator.validateIfNumber(frames, this.constructor.name + ' frames');

        parent.call(this, game, x, y, spriteName, frames);

        this.anchor.setTo(0.5);
        this.game.add.existing(this);
        this.game.physics.arcade.enable(this);
    }

    WorldObject.prototype = Object.create(parent.prototype);
    WorldObject.prototype.constructor = WorldObject;
    
    return WorldObject;
}(Phaser.Sprite));
