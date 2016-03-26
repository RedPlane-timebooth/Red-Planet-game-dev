(function iife() {
    'use strict';

    const gameWidth = 600;
    const gameHeight = 800;
    var game = new Phaser.Game(gameHeight, gameWidth, Phaser.CANVAS, 'gameCanvas',
        {
            preload: preload,
            create: create,
            update: update,
            render: render
        }
    );

    function preload() {
        game.load.image('background', '/assets/background/grass_template_straightpath.jpg');
        game.load.spritesheet('creep1', 'assets/creeps/creep-1-blue/creep-1-bluespritesheet.png', 46, 46, 6);
    }

    var creep1,
        enemies,
        created = false;

    function create() {

        game.world.setBounds(0, 0, 1920, 1200);
        game.add.sprite(0, 0, 'background');
        enemies = game.add.group();

        UnitsFactory(game, 0, 400, CREEP1, enemies);
    }

    function update() {
        //Camera follow cursor
        if (game.input.mousePointer.x > gameHeight - gameHeight / 10) {
            game.camera.x += 10;
        } else if (game.input.mousePointer.x <= 100) {
            game.camera.x -= 10;
        }
        if (game.input.mousePointer.y > gameWidth - gameWidth / 10) {
            game.camera.y += 10;
        } else if (game.input.mousePointer.y <= 100) {
            game.camera.y -= 10;
        }

        if(!created){
            setInterval(function () {
                UnitsFactory(game, 0, 400, CREEP1, enemies);
            }, 1000);
            created = true;
        }

        enemies.forEach(function (enemy) {
            enemy.onUpdate();
        });
    }

    function render() {
        game.debug.cameraInfo(game.camera, 500, 32);
    }
}());
