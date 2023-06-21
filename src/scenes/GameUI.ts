import Phaser from "phaser";
import { sceneEvents } from "../events/EventsCenter";
export default class GameUI extends Phaser.Scene {
  private hearts!: Phaser.GameObjects.Group;
  constructor() {
    super({ key: "game-ui" });
  }
  create() {
    this.add.image(10, 30, "coin");
    const coinsLabel = this.add.text(20, 25, "0");
    sceneEvents.on("player-coins-changed", (coins: number) => {
      coinsLabel.text = coins.toString();
    });
    //make hearts image
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    //make hearts have 4 image
    this.hearts.createMultiple({
      key: "ui-heart-full",
      setXY: {
        x: 10,
        y: 10,
        stepX: 16,
      },
      quantity: 4,
    });
    //calling "player-health-changed" event when player got hitted
    sceneEvents.on(
      "player-health-changed",
      this.handlePlayerHealthChanged,
      this
    );
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off(
        "player-health-changed",
        this.handlePlayerHealthChanged,
        this
      );
      sceneEvents.off("player-coins-changed");
    });
  }
  //function if the player got hitted
  private handlePlayerHealthChanged(health: number) {
    this.hearts.children.each((go, idx) => {
      const heart = go as Phaser.GameObjects.Image;
      if (idx < health) {
        heart.setTexture("ui-heart-full");
      } else {
        heart.setTexture("ui-heart-empty");
      }
    });
  }
}
