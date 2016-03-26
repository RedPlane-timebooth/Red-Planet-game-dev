var UnitsFactory = (function iife() {
    'use strict';
    function UnitsFactory(game, x, y, creep, group) {
        switch (creep) {
            case CREEP1:
                return new Creep1(game, x, y, group);
        }
    }

    return UnitsFactory;
}());
