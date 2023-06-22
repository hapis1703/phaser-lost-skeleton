import Phaser from "phaser";
export default class Pause extends Phaser.Scene {
  constructor() {
    super("pause");
  }
  create() {
    const overlay = this.add.image(0, 0, "black").setScale(1000).setAlpha(0.7);
    const resume = this.add
      .text(300, 20, "[ RESUME ]")
      .setInteractive()
      .on("pointerup", () => {
        this.scene.stop();
        this.scene.resume("game");
        this.sound.resumeAll();
      });
    const quit = this.add
      .text(310, 60, "[ QUIT ]")
      .setInteractive()
      .on("pointerup", () => {
        this.scene.stop();
        this.scene.stop("game");
        this.scene.start("game-start");
        this.sound.stopAll();
      });
  }
}
