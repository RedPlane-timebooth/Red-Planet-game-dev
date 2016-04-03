var RedPlanetGame = RedPlanetGame || {};

RedPlanetGame.Game = (function iife() {
    'use strict';
    var canBuild = true,
        buildState = false,
        buildStateBuildingRed = true,
        _this = null,
        buffers = {
            pressed: {
                is: false
            },
            buildingOverlaps: {
                is: false
            },
            movedToPointer: {
                is: false
            }
        };

    RedPlanetGame.Game = function () {
        Phaser.State.call(this);
        _this = this;
    };

    RedPlanetGame.Game.prototype = Object.create(Phaser.State.prototype);
    RedPlanetGame.Game.prototype.constructor = RedPlanetGame.Game;

    RedPlanetGame.Game.prototype = {
        create: function create() {
            //A door for multyplayer
            this.players = [];
            this.player = new Player(1, 'Daniel', 300);
            this.players.push(this.player);

            this.initMapLayersGroups();
            this.initUI();

            const creepYOffset = 15;
            setInterval(function () {
                _this.game.enemies.factory(_this.spawnCreepsAt.x, _this.spawnCreepsAt.y + creepYOffset, 
                    UNIT_TYPES.CREEP1, _this.checkPoints);
            }, 1000);

        },
        update: function update() {
            this.followCamera();
            //check for collision between enemy and non-path layer
            this.game.physics.arcade.collide(this.game.enemies, this.backgroundlayer);
            //checks for collision between bullets and enemies
            this.game.physics.arcade.overlap(this.game.bullets, this.game.enemies, function (bullet, enemy) {
                enemy.takeHit(bullet, _this.player);
                bullet.kill();
            }, null, this);
            //updates enemies
            this.game.enemies.forEachExists(function (enemy) {
                enemy.onUpdate(_this.map.objects['objectsLayer'][6]);
            });
            //updates buildings
            this.game.buildings.forEach(function (building) {
                building.onUpdate(_this.game.bullets);
            });
            //on building state
            if (buildState) {
                this.onBuildState();
            }
            //updates (static) position of UI
            this.updateUI(this.game.camera.x, this.game.camera.y);
        },
        render: function render() {
            this.ui.gold.text = 'Player gold: ' + this.player.gold;
        },
        initMapLayersGroups: function init() {
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
            this.game.checkPoints = this.game.add.group();
            //creates invisible path for the towers to collide with (tiled path has bounds like the full map and it is useless)
            createInvisibleSpriteGroupFromMapObjects('path', this.map, 'objectsLayer', this.game, this.game.invisiblePath);
            this.game.physics.enable(this.game.invisiblePath, Phaser.Physics.ARCADE);
            //creates checkPoints for creeps
            this.checkPoints = createCheckPoints('checkPoint', this.map, 'objectsLayer');
        },
        initUI: function initUI() {
            this.ui = {};
            //text and player info
            var textX = 150;
            var textY = 0;
            this.ui.gold = this.game.add.text(textX, textY, 'Player gold: ' + this.player.gold,
                {font: "24px Arial", fill: '#FFD700'}
            );

            var scaleTower1 = 0.5;
            this.ui.tower1 = this.game.add.sprite(300, 500, 'tower1-button');
            this.ui.tower1.scale.setTo(0.3);
            this.ui.tower1.inputEnabled = true;
            this.ui.tower1.events.onInputDown.add(onClickButtonTower1, this);
            function onClickButtonTower1() {
                this.currentBuilding = new WorldObject(_this.game, _this.game.input.x - 50, _this.game.input.y - 50, 'tower1', 0);
                this.currentBuilding.scale.setTo(scaleTower1);
                this.currentBuilding.anchor.setTo(scaleTower1);
                this.currentBuilding.alpha = 0.8;
                this.game.time.events.add(100, function () {
                    buildState = true
                }, this);
            }

            this.ui.tower1.events.onInputOver.add(function () {
                this.game.canvas.style.cursor = "pointer";
            }, this);

            this.ui.tower1.events.onInputOut.add(function () {
                this.game.canvas.style.cursor = "default";
            }, this);
        },
        updateUI: function updateUI(xOffset, yOffset) {
            this.ui.tower1.x = 300 + xOffset;
            this.ui.tower1.y = 500 + yOffset;
            this.ui.gold.x = 150 + xOffset;
            this.ui.gold.y = 0 + yOffset;
        },
        followCamera: function followCamera() {
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
        },
        onBuildState: function onBuildState() {
            //hides cursor
            this.game.canvas.style.cursor = "none";
            //new building sprite follows cursor
            this.game.physics.arcade.moveToPointer(this.currentBuilding, 1500);

            //if tower overlaps
            if (Phaser.Rectangle.contains(this.currentBuilding.body, this.game.input.x, this.game.input.y)) {
                this.currentBuilding.body.velocity.setTo(0);
            }

            //bool for default building tint
            buildStateBuildingRed = false;

            //checks if buildings overlap over non-buildable and sets buildStateBuildingRed = true and canBuild = false
            this.game.physics.arcade.overlap(this.currentBuilding, this.game.invisiblePath,
                this.onBuildingOverlap, null, this);
            this.game.physics.arcade.overlap(this.currentBuilding, this.game.buildings,
                this.onBuildingOverlap, null, this);

            //sets the proper tint
            this.currentBuilding.tint = buildStateBuildingRed ? 0xff0000 : 0xffffff;

            //on mouse down event
            if (this.game.input.activePointer.leftButton.isDown && canBuild && !buffers.pressed.is) {//yo Yoda
                //builds new building of type TOWER1
                buffer(buffers.pressed, 1000, this.game);
                if (Building.prototype.canBuild(this.player.gold, Tower1.prototype.MONEY_COST)) {
                    BuildingsFactory(
                        this.game,
                        this.currentBuilding.x,
                        this.currentBuilding.y,
                        this.player, BUILDING_TYPES.TOWER1
                    );
                    this.player.gold -= Tower1.prototype.MONEY_COST;
                } else {
                    alert('Not enought gold');
                }

                buildState = false;
                this.currentBuilding.destroy();
                this.game.canvas.style.cursor = "default";
            }

            canBuild = true;
        },
        onBuildingOverlap: function onBuildingOverlap() {
            canBuild = false;
            buildStateBuildingRed = true;
        }
    };

    return RedPlanetGame.Game;
})();
