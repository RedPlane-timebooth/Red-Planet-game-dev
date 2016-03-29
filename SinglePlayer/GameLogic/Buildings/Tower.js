var Tower = (function iife(parent) {
    'use strict';

    function Tower(game, x, y, spriteName, player, moneyCost, bulletGroup) {
        validator.validateIfObject(bulletGroup, this.constructor.name + ' bulletGroup');
        
        parent.call(this, game, x, y, spriteName, player, moneyCost);

        this.bulletGroup = bulletGroup;
        this.fired = {
            is: false
        };
    }

    Tower.prototype = Object.create(parent.prototype);
    Tower.prototype.constructor = Tower;

    Tower.prototype.fire = function fire() {
        var nextTarget = this.game.enemies.children[0];
        if (!this.fired.is && nextTarget) {
            this.bulletGroup.fire(this.x, this.y, nextTarget);
            buffer(this.fired, this.fireSpeed);
        }
    };
    
    Tower.prototype.onUpdate = function onUpdate() {
        this.fire();
    };
    
    return Tower;
}(Building));