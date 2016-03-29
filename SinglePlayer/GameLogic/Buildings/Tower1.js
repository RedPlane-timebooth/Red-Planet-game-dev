var Tower1 = (function iife(parent) {
    'use strict';

    //TODO: unite in one spritesheet
    const spriteNameLevel1 = 'tower1-1';
    const spriteNameLevel2 = 'tower1-2';
    const spriteNameLevel3 = 'tower1-3';
    const moneyCost = 80;
    const fireSpeed = 1000;
    const scale = 1;
    
    function Tower1(game, x, y, player) {
        if(player.gold < moneyCost){
            alert('Not enought gold');
            return;
        }
        parent.call(this, game, x, y, spriteNameLevel1, player, moneyCost, game.bullets);

        this.bulletType = SIMPLE_BULLET;//global constant
        this.fireSpeed = fireSpeed;
        this.scale.setTo(scale);
    }

    Tower1.prototype = Object.create(parent.prototype);
    Tower1.prototype.constructor = Tower1;

    return Tower1;
}(Tower));