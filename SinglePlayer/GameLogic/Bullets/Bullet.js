var Bullet = (function iife(parent) {
    'use strict';
    const x = 0;
    const y = 0;

    /**
     * 
     * @param game
     * @constructor
     */
    function Bullet(game) {
        parent.call(this, game, x, y);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;
    }

    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
    Bullet.prototype.constructor = Bullet;

    /**
     * 
     * @param x
     * @param y
     * @param target
     * @param spriteName
     * @param speed
     * @param damage
     * @param tracking
     */
    Bullet.prototype.init = function fire(x, y, target, spriteName, speed, damage, tracking) {
        this.reset(x, y);
        this.key = spriteName;
        this.loadTexture(spriteName, 0);
        this.damage = damage;
        this.tracking = tracking;

        this.rotation = parseFloat(this.game.physics.arcade.angleToXY(this, target.x, target.y)) * 180 / Math.PI;
        this.game.physics.arcade.velocityFromAngle(this.rotation, speed, this.body.velocity);
        this.game.physics.arcade.moveToObject(this, target, speed);
    };

    return Bullet;
}(WorldObject));
