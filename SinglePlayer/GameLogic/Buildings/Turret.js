var Turret = (function iife(parent) {
    'use strict';

    const spriteSheetLevel1 = 'turret';
    const START_FRAME = 0;
    const MONEY_COST = 80;
    const FIRE_DAMAGE = 20;
    const FIRE_SPEED = 1000;
    const SCALE = 1;
    const RANGE = 100;
    const BULLET_TYPE = BULLET_TYPES.BULLET;
    
    
    function Turret(game, x, y, player) {
        parent.call(this, game, x, y, spriteSheetLevel1, START_FRAME, player, BULLET_TYPE, FIRE_DAMAGE, FIRE_SPEED, SCALE, RANGE);

        this.head = new WorldObject(this.game, this.x, this.y - 15, 'turretUp', 7);
        this.head.exists = false;
        game.time.events.add(1000, function(){
            this.head.exists = true;
            this.head.animations.add('turnAround', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 40, true);
            this.head.animations.play('turnAround');
        }, this);

        this.animations.add('build', [1, 2], 1, false);
        this.animations.play('build');
        this.body.setSize(100,100)
        x = this.x - 54;
        y = this.y - 54;
        //TODO: child sprite, overlap with child
        this.invisibleChild = this.game.add.sprite(x, y, 'turret', 0);
        this.invisibleChild.inputEnabled = true;

        this.invisibleChild.alpha = 0.0;
        this.invisibleChild.events.onInputOver.add(this.onBuildingOver, this);
        this.invisibleChild.events.onInputOut.add(this.onBuildingOut, this);
        this.invisibleChild.events.onInputDown.add(this.showPersonalInfo, this);
    }

    Turret.prototype = Object.create(parent.prototype);
    Turret.prototype.constructor = Turret;

    Turret.prototype.MONEY_COST = MONEY_COST;

    return Turret;
}(Tower));