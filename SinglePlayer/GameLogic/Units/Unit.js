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
     * @param checkPoints
     * @param spriteName
     * @param goldReward
     * @param speed
     * @param scale
     * @param health
     * @param defence
     * @param isAir
     */
    Unit.prototype.init = function init(x, y, checkPoints, spriteName, goldReward, speed, scale, health, defence, isAir) {
        validator.validateIfNumber(x, spriteName + ' x');
        validator.validateIfNumber(y, spriteName + ' y');
        validator.validateIfString(spriteName, spriteName + ' spriteName');
        validator.validateIfNumber(goldReward, spriteName + ' goldReward');
        validator.validateIfNumber(speed, spriteName + ' speed');
        validator.validateIfNumber(scale, spriteName + ' scale');
        validator.validateIfNumber(health, spriteName + ' health');
        validator.validateIfNumber(defence, spriteName + ' defence');
        validator.validateIfBool(isAir, spriteName + ' isAir');
        
        this.reset(x, y);
        this.key = spriteName;
        this.loadTexture(spriteName, 0);
        this.goldReward = goldReward;
        this.speed = speed;
        this.scale.setTo(scale);
        this.setHealth(health);
        this.defence = defence;
        this.isAir = isAir;
        this.animations.add('move');
        this.animations.play('move', MOVE_ANIMATION_LENGTH, true);
        this.walked = 0;
        this.body.setSize(32, 32);

        this.checkPoints = checkPoints;
        this.currentCheckPoint = 0;
        this.game.physics.arcade.moveToObject(this, this.checkPoints[this.currentCheckPoint], this.speed);
        this.buffers = {
            checkedForReachedCheckPoint: {
                is: false
            }
        };
    };

    /**
     * 
     * @param bullet
     * @param player
     */
    Unit.prototype.takeHit = function takeHit(bullet, player) {
        var calculateHitDamage = bullet.damage - (bullet.damage * this.defence) / 100;
        this.damage(calculateHitDamage);
        if(this.health <= 0){
            this.kill();
            player.gold += this.goldReward;
        }
    };
    
    Unit.prototype.onUpdate = function onUpdate() {
        if(!this.buffers.checkedForReachedCheckPoint.is){
            buffer(this.buffers.checkedForReachedCheckPoint, 200, this.game);
            if(this.game.physics.arcade.distanceBetween(this, this.checkPoints[this.currentCheckPoint]) < 15){
                if(this.checkPoints[++this.currentCheckPoint]){
                    this.game.physics.arcade.moveToObject(this, this.checkPoints[this.currentCheckPoint], this.speed);
                } else {
                    this.kill();
                    alert('end reached');
                }
            }
        }
        this.walked++;
    };
    
    Unit.prototype.calculateTimeForTween = function(destination) {
        console.log(this.game.physics.arcade.distanceBetween(this, destination))
    };

    return Unit;
}(WorldObject));
