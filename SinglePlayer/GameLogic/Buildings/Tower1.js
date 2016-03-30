var Tower1 = (function iife(parent) {
    'use strict';

    //TODO: unite in one spritesheet
    const spriteNameLevel1 = 'tower1-1';
    const spriteNameLevel2 = 'tower1-2';
    const spriteNameLevel3 = 'tower1-3';
    const MONEY_COST = 80;
    const FIRE_SPEED = 1000;
    const SCALE = 1;
    
    function Tower1(game, x, y, player) {
        parent.call(this, game, x, y, spriteNameLevel1, player);

        this.bulletType = BULLET_TYPES.BULLET;//global constant
        this.fireSpeed = FIRE_SPEED;
        this.scale.setTo(SCALE);
    }

    Tower1.prototype = Object.create(parent.prototype);
    Tower1.prototype.constructor = Tower1;

    Tower1.prototype.moneyCost = MONEY_COST;

    return Tower1;
}(Tower));