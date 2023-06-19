import Phaser, { Scenes } from "phaser";
import { sceneEvents } from "~/events/EventsCenter";
export default class GameOver extends Phaser.Scene {
  private replayButton!: Phaser.GameObjects.Text;
  constructor() {
    super("game-over");
  }
  preload() {}
  create() {
    this.scene.stop("game-ui");
    this.replayButton = this.add
      .text(400, 182.5, "[ REPLAY ]")
      .setInteractive();
    this.replayButton.once("pointerup", () => {
      this.scene.start("game");
      sceneEvents.on("playerWins", this.handleGameWin, this);
    });
    sceneEvents.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      sceneEvents.off("playerWins", this.handleGameWin, this);
    });
  }
  private handleGameWin(gameWin: boolean) {
    if (gameWin === true) {
      this.add.text(200, 182.5, "YOU WIN!!");
    }
  }
}
