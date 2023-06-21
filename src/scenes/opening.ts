import Phaser, { Scenes } from "phaser";
import { sceneEvents } from "~/events/EventsCenter";
import "../sprites/player";
export default class GameStart extends Phaser.Scene {
  //@ts-ignore
  constructor() {
    super("game-start");
  }
  preload() {}
  create() {
    const background = this.add.image(362.5, 180, "background");
    background.setScale(1.5);
    this.add.image(470, 80, "logo-p").setScale(2);
    this.add.image(360, 80, "logo").setScale(0.6);
    const button = this.add
      .image(360, 180, "start-btn")
      .setInteractive({ useHandCursor: true })
      .once(
        "pointerup",
        () => {
          this.scene.start("game");
        },
        this
      )
      .setScale(0.25);
  }
}
