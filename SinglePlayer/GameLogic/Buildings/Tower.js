var Tower = (function iife(parent) {
    'use strict';

    function Tower(game, x, y, spriteName, player) {
        parent.call(this, game, x, y, spriteName, player);
        this.fired = {
            is: false
        };
    }

    Tower.prototype = Object.create(parent.prototype);
    Tower.prototype.constructor = Tower;

    Tower.prototype.fire = function fire() {
        //TODO: fix aiming mechanism
        var nextTarget = this.game.enemies.children[0];
        if (!this.fired.is && nextTarget) {
            this.game.bullets.factory(this.x, this.y, nextTarget, this.bulletType);
            buffer(this.fired, this.fireSpeed);
        }
    };
    
    Tower.prototype.onUpdate = function onUpdate() {
        this.fire();
    };
    
    return Tower;
}(Building));