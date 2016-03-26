var Creep1 = (function iife(parent) {
    'use strict';

    const speed = 1;
    const spriteName = 'creep1';

    function Creep1(game, x, y, group) {
        parent.call(this, game, x, y, spriteName);
        
        this.speed = speed;
        group.add(this);
    }

    Creep1.prototype = Object.create(parent.prototype);
    Creep1.prototype.constructor = Creep1;

    return Creep1;
}(Unit));

