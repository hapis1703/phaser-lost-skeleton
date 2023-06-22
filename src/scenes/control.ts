import Phaser from "phaser";
export default class Controls extends Phaser.Scene {
  constructor() {
    super({ key: "controls" });
  }
  create() {
    const bg = this.add.image(10, 10, "black").setScale(100);
    bg.alpha = 0.7;
    this.add.text(250, 10, "Controls (Use Keyboard Only)");
    this.add.image(130, 90, "arrow-key").setScale(0.1);
    this.add.text(190, 90, "Untuk Menggerakkan Player");
    this.add.image(130, 160, "space").setScale(0.1);
    this.add.text(190, 150, "- Untuk Melempar Pedang");
    this.add.text(190, 170, "- Untuk Membuka Chest");
    this.add.text(190, 190, "(ketika menyentuh chest dan tidak bergerak)");
    this.add
      .text(10, 10, "<< RETURN")
      .setInteractive()
      .once("pointerup", () => {
        this.scene.start("game-start");
      });
  }
}
