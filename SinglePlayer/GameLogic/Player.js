var Player = (function iife() {
    'use strict';

    function Player(id, gold, killed, experience) {
        this.id = id || 0;
        this.gold = gold || 0;
        this.killed = killed || 0;
        this.experience = experience || 0;
        
    }

    Player.prototype.onKill = function onKill(creep) {
        
    };
    
    return Player;
}());
