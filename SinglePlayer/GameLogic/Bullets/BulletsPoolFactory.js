var BulletsPoolFactory = (function iife(parent) {
    'use strict';

    const BulletCount = 100;
    const simpleBullet = {
        spriteName: 'bullet',
        bulletSpeed: 1000,
        tracking: true
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
     * @param damage
     */
    BulletPoolFactory.prototype.factory = function (sourceX, sourceY, target, bulletType, damage) {
        switch (bulletType) {
            case BULLET_TYPES.BULLET:
                this.getFirstExists(false).init(sourceX, sourceY, target,
                    simpleBullet.spriteName, simpleBullet.bulletSpeed, damage, simpleBullet.tracking);
        }
    };

    return BulletPoolFactory;
}(Phaser.Group));
