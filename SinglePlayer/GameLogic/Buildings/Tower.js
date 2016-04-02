var Tower = (function iife(parent) {
    'use strict';

    function Tower(game, x, y, spriteName, player, bulletType, fireSpeed, scale, range) {
        parent.call(this, game, x, y, spriteName, player);

        validator.validateIfString(bulletType, this.constructor + ' bulletType');
        validator.validateIfNumber(fireSpeed, this.constructor + ' fireSpeed');
        validator.validateIfNumber(scale, this.constructor + ' scale');
        validator.validateIfNumber(range, this.constructor + ' range');

        this.bulletType = bulletType;
        this.fireSpeed = fireSpeed;
        this.scale.setTo(scale);
        this.range = range;

        this.fired = {
            is: false
        };
        this.searchedForTarget = {
            is: false
        };
        this.nextTarget = null;

        //draws circle around the tower when build for now TODO: move this when clicked on tower and when in build state
        var circles = this.game.add.graphics(this.x, this.y);
        circles.lineStyle(1, 0xff0000);
        circles.drawCircle(0, 0, this.range * 2);
    }

    Tower.prototype = Object.create(parent.prototype);
    Tower.prototype.constructor = Tower;

    Tower.prototype.fire = function fire() {
        if (!this.fired.is && this.nextTarget) {
            this.game.bullets.factory(this.x, this.y, this.nextTarget, this.bulletType);
            buffer(this.fired, this.fireSpeed);
        }
    };

    Tower.prototype.findTarget = function findTarget() {
        if(!this.searchedForTarget.is){
            var nextTarget = null;
            this.game.enemies.forEachExists(function(enemy) {
                if(this.game.physics.arcade.distanceBetween(this, enemy) < this.range){
                    if(nextTarget === null || nextTarget.walked < enemy.walked){
                        nextTarget = enemy;
                    }
                }
            }, this);
            this.nextTarget = nextTarget;
            buffer(this.searchedForTarget, 250);
        }
    };

    Tower.prototype.onUpdate = function onUpdate() {
        this.findTarget();
        this.fire();
    };
    
    return Tower;
}(Building));