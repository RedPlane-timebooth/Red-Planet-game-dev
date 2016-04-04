var Tower = (function iife(parent) {
    'use strict';
    var nextTarget = null;

    function Tower(game, x, y, spriteName, startFrame, player, bulletType, fireDamage, fireSpeed, scale, range) {
        parent.call(this, game, x, y, spriteName, startFrame, player);

        validator.validateIfString(bulletType, this.constructor + ' bulletType');
        validator.validateIfNumber(fireDamage, this.constructor + ' fireDamage');
        validator.validateIfNumber(fireSpeed, this.constructor + ' fireSpeed');
        validator.validateIfNumber(scale, this.constructor + ' scale');
        validator.validateIfNumber(range, this.constructor + ' range');

        this.bulletType = bulletType;
        this.fireDamage = fireDamage;
        this.fireSpeed = fireSpeed;
        this.scale.setTo(scale);
        this.range = range;
        this.nextTarget = null;
        this.buffers = {
            fired: {
                is: false
            },
            searchedForTarget: {
                is: false
            }
        };
    }

    Tower.prototype = Object.create(parent.prototype);
    Tower.prototype.constructor = Tower;

    Tower.prototype.fire = function fire() {
        this.game.bullets.factory(this.x, this.y - 30, this.nextTarget, this.bulletType, this.fireDamage);
    };

    Tower.prototype.findTarget = function findTarget() {
        if (!this.buffers.searchedForTarget.is) {
            nextTarget = null;
            this.game.enemies.forEachExists(function (enemy) {
                if (this.game.physics.arcade.distanceBetween(this, enemy) < this.range) {
                    if (nextTarget === null || nextTarget.walked < enemy.walked) {
                        nextTarget = enemy;
                    }
                }
            }, this);
            this.nextTarget = nextTarget;
            buffer(this.buffers.searchedForTarget, 250, this.game);
        }
    };

    Tower.prototype.onUpdate = function onUpdate() {
        if (this.fullyBuild) {
            this.findTarget();
            if (this.nextTarget && !this.buffers.fired.is) {
                this.fire();
                buffer(this.buffers.fired, this.fireSpeed, this.game);
            }
        }
    };

    Tower.prototype.getPersonalInfo = function getPersonalInfo() {
        var info = parent.prototype.getPersonalInfo.call(this);
        info.damage = this.fireDamage;
        info.fireSpeed = this.fireSpeed / 1000;
        info.range = this.range;
        info.infoType = 'tower';
        return info;
    };

    Tower.prototype.showPersonalInfo = function showPersonalInfo() {
        console.log(this.getPersonalInfo())
        this.circles = this.game.add.graphics(this.x, this.y);
        this.circles.lineStyle(1, 0xff0000);
        this.circles.drawCircle(0, 0, this.range * 2);
    };

    Tower.prototype.hidePersonalInfo = function showPersonalInfo() {
        if (this.circles) {
            this.circles.destroy();
        }
    };

    return Tower;
}(Building));