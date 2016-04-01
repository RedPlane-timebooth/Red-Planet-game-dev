var RedPlanetGame = RedPlanetGame || {};

//loading the game assets
RedPlanetGame.Preload = function () {
};

RedPlanetGame.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.image('tower1-button', '/assets/buildings/buttons/tower1-button.png');
        this.load.spritesheet('creep1', '/assets/creeps/creep1.png', 80, 80, 14);
        this.load.spritesheet('tower1', '/assets/buildings/towers/tower1.png', 240, 158, 16);
        this.load.image('bullet', '/assets/images/bullet.png');
        this.load.setPreloadSprite(this.preloadBar);

        //load game assets
        this.load.tilemap('sample2', '/assets/maps/sample2.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', '/assets/images/32x32_map_tile v3.1 [MARGINLESS].png');

    },
    create: function () {
        this.state.start('Game');
    }
};
