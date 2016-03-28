var Creep1 = (function iife(parent) {
    'use strict';
    
    const speed = 50;
    const spriteName = 'creep1';
    const goldReward = 50;
    
    function Creep1(game, x, y) {
        parent.call(this, game, x, y, spriteName, goldReward);
        this.speed = speed;
        this.scale.setTo(0.5);
        this.game.enemies.add(this);
        this.setHealth(100);
    }

    Creep1.prototype = Object.create(parent.prototype);
    Creep1.prototype.constructor = Creep1;

    return Creep1;
}(Unit));

