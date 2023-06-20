import Phaser, { Scene } from "phaser";
import { createDemonAnims } from "../anims/enemyAnims";
import { createPlayerAnims } from "../anims/playerAnims";
import Demon from "~/sprites/demon";
import "../sprites/player";
import { sceneEvents } from "../events/EventsCenter";

export default class game extends Phaser.Scene {
  //@ts-ignore
  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerDemonsCollider?: Phaser.Physics.Arcade.Collider;
  private swords!: Phaser.Physics.Arcade.Group;
  private demons!: Phaser.Physics.Arcade.Group;
  private gameWin!: boolean;

  constructor() {
    super("game");
  }
  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  create() {
    this.gameWin === false;
    //import game ui
    this.scene.run("game-ui");
    //import sprite animations
    createPlayerAnims(this.anims);
    createDemonAnims(this.anims);
    //make tilemap
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("dungeon", "tileset", 16, 16, 1, 2);
    map.createLayer("background", tileset);
    map.createLayer("ground", tileset);
    const exitLayer = map.createLayer("exit", tileset);
    exitLayer.setCollisionBetween(0, 99);
    //sword
    this.swords = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
    //player
    this.player = this.add.player(120, 120, "player");
    this.player.setSwords(this.swords);
    //wall
    const wallLayer = map.createLayer("wall", tileset);
    wallLayer.setCollisionBetween(0, 99);
    //place that demon cant go
    const wallForDemon = map.createLayer("demonWall", tileset);
    wallForDemon.setCollisionBetween(0, 99);
    //camera follow player
    this.cameras.main.startFollow(this.player);
    //demon
    this.demons = this.physics.add.group({
      classType: Demon,
      createCallback: (go) => {
        const demonGo = go as Demon;
        demonGo.body.onCollide = true;
      },
    });
    const heartPotion = this.physics.add.staticGroup();
    const heartLayer = map.getObjectLayer("heartpotion");
    heartLayer.objects.forEach((potionObj) => {
      heartPotion.get(potionObj.x, potionObj.y, "h-potion");
    });
    const demonLayer = map.getObjectLayer("Demons");
    demonLayer.objects.forEach((demonObj) => {
      this.demons.get(demonObj.x, demonObj.y, "demon");
    });
    //player collide with exit door
    this.physics.add.collider(
      this.player,
      exitLayer,
      this.handlePlayerExitOverlap,
      undefined,
      this
    );
    //player collide with wall
    this.physics.add.collider(this.player, wallLayer);
    //demon collide with wall
    this.physics.add.collider(this.demons, wallLayer);
    //sword collide with wall
    this.physics.add.collider(this.swords, wallLayer);
    //sword collide with demons
    //player collide with demons
    this.playerDemonsCollider = this.physics.add.collider(
      this.demons,
      this.player,
      this.handlePlayerDemonCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      this.swords,
      this.demons,
      this.handlePlayerDemonCollision,
      undefined,
      this
    );
    this.physics.add.collider(this.demons, wallForDemon);
  }
  //function if player collide with exit door
  private handlePlayerExitOverlap() {
    this.gameWin === true;

    if ((this.gameWin = true)) {
      sceneEvents.emit("playerWins", this.gameWin);
      this.scene.start("game-over");
    }
  }
  //function if sword collide with demons
  private handleSwordDemonCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    this.swords.killAndHide(obj1);
    this.demons.killAndHide(obj2);
  }
  //function if player collide with demon
  private handlePlayerDemonCollision(obj2: Phaser.GameObjects.GameObject) {
    const demon = obj2 as Demon;
    const dx = this.player.x - demon.x;
    const dy = this.player.y - demon.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);
    this.player.handleDamage(dir);
    sceneEvents.emit("player-health-changed", this.player.health);
    if (this.player.health <= 0) {
      this.playerDemonsCollider?.destroy();
    }
  }
  update(time: number, delta: number): void {
    //the control for player
    if (this.player) {
      this.player.update(this.cursors);
    }
    //if player die it will make you start the game over scene
    if (this.player._health <= 0) {
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.scene.start("game-over");
        },
      });
    }
  }
}
