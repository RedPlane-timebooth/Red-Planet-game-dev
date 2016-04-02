var BulletsPoolFactory = (function iife(parent) {
    'use strict';

    const BulletCount = 100;
    const simpleBullet = {
        spriteName: 'bullet',
        bulletSpeed: 1000,
        bulletDamage: 20,
        tracking: false
    };

    /**
     * 
     * @param game
     * @constructor
     */
    function BulletPoolFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < BulletCount; i++) {
            this.add(new Bullet(game), true);
        }
    }

    BulletPoolFactory.prototype = Object.create(parent.prototype);
    BulletPoolFactory.prototype.constructor = BulletPoolFactory;

    /**
     * 
     * @param sourceX
     * @param sourceY
     * @param target
     * @param bulletType
     */
    BulletPoolFactory.prototype.factory = function (sourceX, sourceY, target, bulletType) {
        switch (bulletType) {
            case BULLET_TYPES.BULLET:
                this.getFirstExists(false).init(sourceX, sourceY, target,
                    simpleBullet.spriteName, simpleBullet.bulletSpeed, simpleBullet.bulletDamage, simpleBullet.tracking);
        }
    };

    return BulletPoolFactory;
}(Phaser.Group));
