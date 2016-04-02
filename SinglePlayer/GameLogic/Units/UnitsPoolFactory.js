var UnitsPoolFactory = (function iife(parent) {
    'use strict';
    
    const UnitsCount = 100;
    const creep1 = {
        spriteName: 'creep1',
        goldReward: 50,
        speed: 50,
        scale: 0.4,
        health: 100,
        defence: 10,
        isAir: false
    };

    function UnitsPoolFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < UnitsCount; i++) {
            this.add(new Unit(game), true);
        }
    }

    UnitsPoolFactory.prototype = Object.create(parent.prototype);
    UnitsPoolFactory.prototype.constructor = UnitsPoolFactory;

    /**
     * 
     * @param x
     * @param y
     * @param unitType
     */
    UnitsPoolFactory.prototype.factory = function (x, y, unitType) {
        switch (unitType) {
            case UNIT_TYPES.CREEP1:
                this.getFirstExists(false).init(x, y,
                    creep1.spriteName, creep1.goldReward, creep1.speed, creep1.scale, creep1.health,
                creep1.defence, creep1.isAir);
        }
    };

    return UnitsPoolFactory;
}(Phaser.Group));