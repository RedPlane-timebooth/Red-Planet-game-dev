var UnitsFactory = (function iife() {
    'use strict';
    function UnitsFactory(game, x, y, creep) {
        switch (creep) {
            case CREEP1:
                return new Creep1(game, x, y);
        }
    }

    return UnitsFactory;
}());
