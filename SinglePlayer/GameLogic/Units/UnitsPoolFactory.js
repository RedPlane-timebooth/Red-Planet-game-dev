var creep1 = (function iife() {
    'use strict';

    return {
        spriteName: 'creep1',
        goldReward: 50,
        speed: 50,
        scale: 0.5,
        health: 100
    };
}());

var UnitsPoolFactory = (function iife(parent) {
    'use strict';
    
    const UnitsCount = 100;

    function UnitsFactory(game) {
        parent.call(this, game);
        for (var i = 0; i < UnitsCount; i++) {
            this.add(new Unit(game), true);
        }
    }

    UnitsFactory.prototype = Object.create(parent.prototype);
    UnitsFactory.prototype.constructor = UnitsFactory;

    UnitsFactory.prototype.factory = function (x, y, unit) {
        switch (unit) {
            case CREEP1:
                this.getFirstExists(false).init(x, y,
                    creep1.spriteName, creep1.goldReward, creep1.speed, creep1.scale, creep1.health);
        }
    };

    return UnitsFactory;
}(Phaser.Group));