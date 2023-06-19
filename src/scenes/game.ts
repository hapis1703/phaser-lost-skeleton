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
    this.scene.run("game-ui");
    createPlayerAnims(this.anims);
    createDemonAnims(this.anims);
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("dungeon", "tileset");
    map.createLayer("background", tileset);
    map.createLayer("ground", tileset);
    const exitLayer = map.createLayer("exit", tileset);
    exitLayer.setCollisionBetween(0, 99);
    this.swords = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
    });
    this.player = this.add.player(120, 120, "player");
    this.player.setSwords(this.swords);
    const wallLayer = map.createLayer("wall", tileset);
    wallLayer.setCollisionBetween(0, 99);

    this.cameras.main.startFollow(this.player);

    this.demons = this.physics.add.group({
      classType: Demon,
      createCallback: (go) => {
        const demonGo = go as Demon;
        demonGo.body.onCollide = true;
      },
    });
    const demonLayer = map.getObjectLayer("Demons");
    demonLayer.objects.forEach((demonObj) => {
      this.demons.get(demonObj.x, demonObj.y, "demon");
    });

    this.physics.add.collider(
      this.player,
      exitLayer,
      this.handlePlayerExitOverlap,
      undefined,
      this
    );
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.demons, wallLayer);
    this.physics.add.collider(this.swords, wallLayer);
    this.physics.add.collider(
      this.swords,
      this.demons,
      this.handleSwordDemonCollision,
      undefined,
      this
    );
    this.playerDemonsCollider = this.physics.add.collider(
      this.demons,
      this.player,
      this.handlePlayerDemonCollision,
      undefined,
      this
    );
  }
  private handlePlayerExitOverlap() {
    this.gameWin === true;

    if ((this.gameWin = true)) {
      sceneEvents.emit("playerWins", this.gameWin);
      this.scene.start("game-over");
    }
  }
  private handleSwordDemonCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    this.swords.killAndHide(obj1);
    this.demons.killAndHide(obj2);
  }
  private handlePlayerDemonCollision(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
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
    this.playerControl();
    if (this.player._health <= 0) {
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          this.scene.start("game-over");
        },
      });
    }
  }
  playerControl() {
    if (this.player) {
      this.player.update(this.cursors);
    }
  }
}
