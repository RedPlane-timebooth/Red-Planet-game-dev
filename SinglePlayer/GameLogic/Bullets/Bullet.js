var Bullet = (function iife(parent) {
    'use strict';
    const damage = 20;
    function Bullet(game, spriteName) {
        parent.call(this, game, 0, 0, spriteName, 0);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;
        this.tracking = false;
        this.damage = damage;
    }

    Bullet.prototype = Object.create(parent.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.fire = function fire(x, y, speed, target) {
        //http://phaser.io/docs/2.4.6/Phaser.Component.Reset.html
        this.reset(x, y);
        this.rotation = parseFloat(this.game.physics.arcade.angleToXY(this, target.x, target.y)) * 180 / Math.PI;
        this.game.physics.arcade.velocityFromAngle(this.rotation, speed, this.body.velocity);
        this.game.physics.arcade.moveToObject(this, target, speed);
    };

    return Bullet;
}(WorldObject));
