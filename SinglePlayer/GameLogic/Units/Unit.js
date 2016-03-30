var Unit = (function iife(parent) {
    'use strict';

    const MOVE_ANIMATION_LENGTH = 10;
    const START_X = 0;
    const START_Y = 0;

    /**
     * 
     * @param game
     * @constructor
     */
    function Unit(game) {
        parent.call(this, game, START_X, START_Y);

        this.exists = false;
    }

    Unit.prototype = Object.create(parent.prototype);
    Unit.prototype.constructor = Unit;

    /**
     * 
     * @param x
     * @param y
     * @param spriteName
     * @param goldReward
     * @param speed
     * @param scale
     * @param health
     */
    Unit.prototype.init = function init(x, y, spriteName, goldReward, speed, scale, health) {
        validator.validateIfNumber(x, spriteName + ' x');
        validator.validateIfNumber(y, spriteName + ' y');
        validator.validateIfString(spriteName, spriteName + ' spriteName');
        validator.validateIfNumber(goldReward, spriteName + ' goldReward');
        validator.validateIfNumber(speed, spriteName + ' speed');
        validator.validateIfNumber(scale, spriteName + ' scale');
        validator.validateIfNumber(health, spriteName + ' health');
        
        this.reset(x, y);
        this.key = spriteName;
        this.loadTexture(spriteName, 0);
        this.goldReward = goldReward;
        this.speed = speed;
        this.scale.setTo(scale);
        this.setHealth(health);
        this.animations.add('move');
        this.animations.play('move', MOVE_ANIMATION_LENGTH, true);
    };
    
    Unit.prototype.takeHit = function takeHit(bullet, player) {
        this.damage(bullet.damage);
        if(this.health <= 0){
            this.kill();
            player.gold += this.goldReward;
        }
    };
    
    Unit.prototype.onUpdate = function onUpdate(destination) {
        this.body.velocity.x = this.speed;
    };

    return Unit;
}(WorldObject));
