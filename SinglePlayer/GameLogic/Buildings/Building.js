var Building = (function iife(parent) {
    'use strict';

    function Building(game, x, y, spriteName, buildAnimationLength) {
        parent.call(this, game, x, y, spriteName);

        this.animations.add('build');
        this.animations.play('build', buildAnimationLength, true);
    }

    Building.prototype = Object.create(parent.prototype);
    Building.prototype.constructor = Building;

    return Unit;
}(WorldObject));