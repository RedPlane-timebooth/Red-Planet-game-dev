var Unit = (function iife(parent) {
    'use strict';

    const moveAnimationLength = 10;
    const startFrame = 0;

    function Unit(game, x, y, spriteName, goldReward) {
        parent.call(this, game, x, y, spriteName, startFrame);

        this.animations.add('move');
        this.animations.play('move', moveAnimationLength, true);
        this.goldReward = goldReward;
    }

    Unit.prototype = Object.create(parent.prototype);
    Unit.prototype.constructor = Unit;

    Unit.prototype.takeHit = function takeHit(bullet, player) {
        this.damage(bullet.damage);
        if(this.health <= 0){
            this.destroy();
            player.gold += this.goldReward;
        }
    };
    Unit.prototype.onUpdate = function onUpdate(destination) {
        this.body.velocity.x = this.speed;
    };

    return Unit;
}(WorldObject));
