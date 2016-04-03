var Tower1 = (function iife(parent) {
    'use strict';

    //TODO: unite in one spritesheet
    const spriteSheetLevel1 = 'tower1';
    const MONEY_COST = 80;
    const FIRE_DAMAGE = 20;
    const FIRE_SPEED = 1000;
    const SCALE = 0.5;
    const RANGE = 100;
    const BULLET_TYPE = BULLET_TYPES.BULLET;
    
    
    function Tower1(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, player, BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE);
    }

    Tower1.prototype = Object.create(parent.prototype);
    //Tower1.prototype.constructor = Tower1;

    Tower1.prototype.MONEY_COST = MONEY_COST;

    return Tower1;
}(Tower));