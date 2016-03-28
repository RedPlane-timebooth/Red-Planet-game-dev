var SimpleBulletsPool = (function iife(parent) {
    'use strict';

    SimpleBulletsPool = function (game) {
        parent.call(this, game);

        this.bulletSpeed = 1000;

        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet'), true);
        }
    };

    SimpleBulletsPool.prototype = Object.create(parent.prototype);
    SimpleBulletsPool.prototype.constructor = SimpleBulletsPool;

    SimpleBulletsPool.prototype.fire = function (sourceX, sourceY, target) {
        this.getFirstExists(false).fire(sourceX, sourceY, this.bulletSpeed, target);
    };

    return SimpleBulletsPool;
}(Phaser.Group));
