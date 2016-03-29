var Player = (function iife() {
    'use strict';

    function Player(id, gold, killed, experience) {

        id = id || 0;
        gold = gold || 0;
        killed = killed || 0;
        experience = experience || 0;

        validator.validateIfNumber(id, 'Player id');
        validator.validateIfNumber(gold, 'Player gold');
        validator.validateIfNumber(killed, 'Player killed');
        validator.validateIfNumber(experience, 'Player experience');

        this.id = id;
        this.gold = gold;
        this.killed = killed;
        this.experience = experience;
    }

    Player.prototype.onKill = function onKill(creep) {
        
    };
    
    return Player;
}());
