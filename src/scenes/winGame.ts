import Phaser, { Scenes } from "phaser";
import { sceneEvents } from "~/events/EventsCenter";
import "../sprites/player";
export default class GameWin extends Phaser.Scene {
  //@ts-ignore
  constructor() {
    super("game-win");
  }
  preload() {}
  create() {
    this.sound.stopAll;
    const background = this.add.image(362.5, 180, "background");
    background.setScale(1.5);
    this.add.text(270, 80, "SELAMAT KAU MENANG!!");
    this.add
      .text(180, 120, "Klik Tombol dibawah untuk bermain kembali")
      .setScale(1);
    const button = this.add
      .image(360, 180, "replay-btn")
      .setInteractive({ useHandCursor: true })
      .once(
        "pointerup",
        () => {
          this.scene.start("game");
        },
        this
      )
      .setScale(0.5);
  }
}
