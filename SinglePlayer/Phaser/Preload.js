var RedPlanetGame = RedPlanetGame || {};

//loading the game assets
RedPlanetGame.Preload = function () {
};

RedPlanetGame.Preload.prototype = {
    preload: function () {
        //show loading screen
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.image('background', '/assets/background/grass_template_straightpath.jpg');
        this.load.spritesheet('creep1', '/assets/creeps/creep-1-blue/creep-1-bluespritesheet.png', 46, 46, 6);
        this.load.image('tower1-1', '/assets/tower-defense-turrets/turret-4-1.png');
        this.load.image('tower1-2', '/assets/tower-defense-turrets/turret-4-2.png');
        this.load.image('tower1-3', '/assets/tower-defense-turrets/turret-4-3.png');
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
