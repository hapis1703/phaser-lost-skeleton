import Phaser, { Scenes } from "phaser";
import { sceneEvents } from "~/events/EventsCenter";
import "../sprites/player";
export default class GameOver extends Phaser.Scene {
  //@ts-ignore
  constructor() {
    super("game-over");
  }
  preload() {}
  create() {
    this.sound.play("lose");
    const background = this.add.image(362.5, 180, "background");
    background.setScale(1.5);
    this.add.text(310, 80, "KAU KALAH!!");
    this.add.text(270, 120, "Ayo Coba Sekali lagi").setScale(1);
    const button = this.add
      .image(360, 180, "replay-btn")
      .setInteractive({ useHandCursor: true })
      .once(
        "pointerup",
        () => {
          this.scene.start("game-start");
        },
        this
      )
      .setScale(0.5);
  }
}
