var BuildingsFactory = (function iife() {
    'use strict';
    /**
     * 
     * @param game
     * @param x
     * @param y
     * @param player
     * @param building
     * @constructor
     */
    function BuildingsFactory(game, x, y, player, building) {
        switch (building) {
            case BUILDING_TYPES.TOWER1:
                return new Tower1(game, x, y, player);
        }
    }

    return BuildingsFactory;
}());
//TODO: make sepparate towers factory?