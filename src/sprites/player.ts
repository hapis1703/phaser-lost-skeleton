import Phaser from "phaser";
declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      player(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Player;
    }
  }
}
enum HealthState {
  IDLE,
  DAMAGE,
  DEAD,
}

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private healthState = HealthState.IDLE;
  private damageTime = 0;

  private _health = 4;
  private swords!: Phaser.Physics.Arcade.Group;
  get health() {
    return this._health;
  }
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
  }
  setSwords(swords: Phaser.Physics.Arcade.Group) {
    this.swords = swords;
  }

  handleDamage(dir: Phaser.Math.Vector2, scene: Phaser.Scene) {
    if (this.healthState === HealthState.DAMAGE) {
      return;
    }

    --this._health;
    if (this._health <= 0) {
      //die
      this.healthState = HealthState.DEAD;
      this.setVelocity(0, 0);
      this.anims.play("player-death", true);
    } else {
      this.setVelocity(dir.x, dir.y);
      this.setTint(0xff0000);
      this.healthState = HealthState.DAMAGE;
      this.damageTime = 0;
    }
  }
  private throwSword() {
    if (!this.swords) {
      return;
    }
    const parts = this.anims.currentAnim.key.split("-");
    const direction = parts[2];
    const vec = new Phaser.Math.Vector2(0, 0);
    const sword = this.swords.get(
      this.x,
      this.y,
      "sword"
    ) as Phaser.Physics.Arcade.Image;
    switch (direction) {
      case "up":
        vec.y = -1;
        sword.setSize(200, 500);
        break;
      case "down":
        vec.y = 1;
        sword.setSize(200, 500);
        break;
      default:
      case "rl":
        if (this.scaleX >= 0) {
          vec.x = -1;
        } else {
          vec.x = 1;
        }
        sword.setSize(500, 200);
        break;
    }
    const angle = vec.angle();

    sword.setActive(true);
    sword.setVisible(true);

    sword.setRotation(angle);
    sword.x += vec.x * 16;
    sword.y += vec.y * 16;

    sword.setVelocity(vec.x * 300, vec.y * 300);
    sword.setScale(0.05);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    switch (this.healthState) {
      case HealthState.IDLE:
        break;
      case HealthState.DAMAGE:
        this.damageTime += delta;
        if (this.damageTime >= 250) {
          this.healthState = HealthState.IDLE;
          this.setTint(0xffffffff);
          this.damageTime = 0;
        }
        break;
    }
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (
      this.healthState === HealthState.DAMAGE ||
      this.healthState === HealthState.DEAD
    ) {
      return;
    }
    if (!cursors) {
      return;
    }
    if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
      this.throwSword();
      return;
    }
    if (cursors.left?.isDown) {
      this.setVelocity(-100, 0);
      this.play("player-walk-rl", true);
      this.scaleX = 1;
      this.body.offset.x = 15;
    } else if (cursors.right?.isDown) {
      this.setVelocity(100, 0);
      this.play("player-walk-rl", true);
      this.scaleX = -1;
      this.body.offset.x = 33;
    } else if (cursors.up?.isDown) {
      this.setVelocity(0, -100);
      this.play("player-walk-up", true);
    } else if (cursors.down?.isDown) {
      this.setVelocity(0, 100);
      this.play("player-walk-down", true);
    } else {
      this.setVelocity(0, 0);
      this.play("player-idle-down", true);
    }
  }
}
Phaser.GameObjects.GameObjectFactory.register(
  "player",
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    var sprite = new Player(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );
    sprite.body.setSize(19, 34);

    return sprite;
  }
);