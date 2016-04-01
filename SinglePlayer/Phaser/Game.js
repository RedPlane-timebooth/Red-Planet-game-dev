var RedPlanetGame = RedPlanetGame || {};

var pressed = {
        is: false
    },
    buildingOverlaps = {
        is: false
    },
    movedToPointer = {
        is: false
    },

    canBuild = true,
    buildState = false;

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
        this.map.setCollisionBetween(1, 2000, true, 'path');
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
        this.game.invisiblePath = this.game.add.group();

        //creates invisible path for the towers to collide with (tiled path has bounds like the full map and it is useless)
        createInvisiblePath('path', this.map, 'objectsLayer', this.game, this.game.invisiblePath);
        this.game.physics.enable(this.game.invisiblePath, Phaser.Physics.ARCADE);

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
            {font: "24px Arial", fill: '#FFD700'}
        );

        //add buttons
        var scaleTower1 = 0.5;
        this.game.add.button(this.game.world.centerX, gameHeight - 30, 'tower1-button', function onBuildTower1() {
            _this.currentBuilding = _this.game.add.sprite(_this.game.input.x - 50, _this.game.input.y - 50, 'tower1', 0);
            _this.game.physics.enable(_this.currentBuilding, Phaser.Physics.ARCADE);
            _this.currentBuilding.anchor.setTo(0.5);
            _this.currentBuilding.scale.setTo(scaleTower1);

            //_this.currentBuilding.body.setSize(120, 80);
            _this.currentBuilding.anchor.setTo(scaleTower1);
            buildState = true;
        }).scale.setTo(scaleTower1);
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
        this.game.physics.arcade.overlap(this.game.bullets, this.game.enemies, function (bullet, enemy) {
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

        //on building state
        if (buildState) {
            $('canvas').css('cursor', 'none');
            //new building sprite follows cursor
            this.game.physics.arcade.moveToPointer(this.currentBuilding, 900);
            if(!movedToPointer.is){
                this.currentBuilding.body.velocity.setTo(0);
                buffer(movedToPointer, 100);
            }

            //if tower overlaps
            if (Phaser.Rectangle.contains(this.currentBuilding.body, this.game.input.x, this.game.input.y)) {
                this.currentBuilding.body.velocity.setTo(0);
            }
            this.game.physics.arcade.overlap(this.currentBuilding, this.game.invisiblePath,
                this.onBuildingOverlap, null, this);
            this.game.physics.arcade.overlap(this.currentBuilding, this.game.buildings,
                this.onBuildingOverlap, null, this);
        }

        //on mouse down event
        if (this.game.input.activePointer.leftButton.isDown && buildState && canBuild && !pressed.is) {//yo Yoda
            //builds new building of type TOWER1
            buffer(pressed, 1000);
            if (Building.prototype.canBuild(this.player.gold, Tower1.prototype.moneyCost)) {
                BuildingsFactory(
                    this.game,
                    this.currentBuilding.x,
                    this.currentBuilding.y,
                    this.player, BUILDING_TYPES.TOWER1
                );
                this.player.gold -= Tower1.prototype.moneyCost;
            } else {
                alert('Not enought gold');
            }

            buildState = false;
            this.currentBuilding.destroy();
            $('canvas').css('cursor', 'default');
        }


        canBuild = true;
    },
    render: function render() {
        this.playerInfo.gold.text = 'Player gold: ' + this.player.gold;

    },
    onBuildingOverlap: function onBuildingOverlap(currentBuilding) {
        canBuild = false;
        if (!buildingOverlaps.is) {
            buffer(buildingOverlaps, 200);
            currentBuilding.tint = 0xff0000;
            setTimeout(function() {
                currentBuilding.tint = 0xffffff;
            }, 100);
        }
    }
};
