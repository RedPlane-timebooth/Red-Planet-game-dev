var RedPlanetGame = RedPlanetGame || {};

var pressed = {
    is: false
};

//title screen
RedPlanetGame.Game = function () {
};

RedPlanetGame.Game.prototype = {
    create: function create() {
        //A door for multyplayer
        this.players = [];
        this.player = new Player(1, 'Daniel', 300);
        this.players.push(this.player);
        this.playerInfo = {};
        
        //Tile map
        this.map = this.game.add.tilemap('sample2');
        this.map.addTilesetImage('32x32_map_tile v3.1 [MARGINLESS]', 'gameTiles');

        //background and layers
        this.backgroundlayer = this.map.createLayer('backgroundLayer');
        this.path = this.map.createLayer('path');
        this.map.setCollisionBetween(1, 2000, true, 'backgroundLayer');

        //objects from tile map
        this.spawnCreepsAt = this.map.objects['objectsLayer'][0];
        this.destinationForCreeps = this.map.objects['objectsLayer'][1];

        //resize world
        this.backgroundlayer.resizeWorld();
        //this.game.world.setBounds(0, 0, 100, 100);

        //groups
        this.game.enemies = new UnitsPoolFactory(this.game);
        this.game.buildings = this.game.add.group();//TODO: make buildings for each player
        this.game.bullets = new BulletsPoolFactory(this.game);

        //creep spawning
        var _this = this;
        const creepYOffset = 15;
        setInterval(function () {
            _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y + creepYOffset, UNIT_TYPES.CREEP1);
        }, 1000);

        //text and player info
        var textX = 150;
        var textY = 0;
        this.playerInfo.gold = this.game.add.text(textX, textY, 'Player gold: ' + this.player.gold,
            { font: "24px Arial", fill: '#FFD700' }
        );
    },
    update: function update() {
        var _this = this;
        //Camera follow cursor
        if (this.game.input.mousePointer.x > gameHeight - gameHeight / 10) {
            this.game.camera.x += 10;
        } else if (this.game.input.mousePointer.x <= 100) {
            this.game.camera.x -= 10;
        }
        if (this.game.input.mousePointer.y > gameWidth - gameWidth / 10) {
            this.game.camera.y += 10;
        } else if (this.game.input.mousePointer.y <= 100) {
            this.game.camera.y -= 10;
        }

        //check for collision between enemy and non-path layer
        this.game.physics.arcade.collide(this.game.enemies, this.backgroundlayer);
        //checks for collision between bullets and enemies
        this.game.physics.arcade.overlap(this.game.bullets, this.game.enemies, function(bullet, enemy) {
            enemy.takeHit(bullet, _this.player);
            bullet.kill();
        }, null, this);

        //updates enemies
        this.game.enemies.forEach(function (enemy) {
            enemy.onUpdate(_this.destinationForCreeps);
        });

        //updates buildings
        this.game.buildings.forEach(function (building) {
            building.onUpdate(_this.game.bullets);
        });

        //on mouse down event
        if(this.game.input.activePointer.leftButton.isDown && !pressed.is){//yo Yoda
            //builds new building of type TOWER1
            buffer(pressed, 1000);
            if(Building.prototype.canBuild(this.player.gold, Tower1.prototype.moneyCost)){
                var poss = this.game.input.mousePointer;
                BuildingsFactory(this.game, poss.x, poss.y, this.player, BUILDING_TYPES.TOWER1);
                this.player.gold -= Tower1.prototype.moneyCost
            } else {
                alert('Not enought gold');
            }

        }
    },
    render: function render() {
        this.playerInfo.gold.text = 'Player gold: ' + this.player.gold;
    }
};
