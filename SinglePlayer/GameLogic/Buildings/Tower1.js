var Tower1 = (function iife(parent) {
    'use strict';

    //TODO: unite in one spritesheet
    const spriteSheetLevel1 = 'tower1';
    const MONEY_COST = 80;
    const FIRE_SPEED = 1000;
    const SCALE = 0.5;
    
    function Tower1(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, player);

        this.bulletType = BULLET_TYPES.BULLET;//global constant
        this.fireSpeed = FIRE_SPEED;
        this.scale.setTo(SCALE);
        this.body.setSize(120, 80);
    }

    Tower1.prototype = Object.create(parent.prototype);
    Tower1.prototype.constructor = Tower1;

    Tower1.prototype.moneyCost = MONEY_COST;

    return Tower1;
}(Tower));