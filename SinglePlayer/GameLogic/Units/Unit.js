var Unit = (function iife(parent) {
    'use strict';

    const moveAnimationLength = 10;
    const startFrame = 0;

    function Unit(game, x, y, spriteName) {
        parent.call(this, game, x, y, spriteName, startFrame);

        this.animations.add('move');
        this.animations.play('move', moveAnimationLength, true);
        this.speed = 0;
    }
    
    Unit.prototype = Object.create(parent.prototype);
    Unit.prototype.constructor = Unit;

    Unit.prototype.onUpdate = function onUpdate() {
        this.x += this.speed;
    };
    
    return Unit;
}(WorldObject));
