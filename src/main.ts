import Phaser from "phaser";

import preload from "./scenes/preload";
import game from "./scenes/game";
import GameUI from "./scenes/GameUI";
import GameOver from "./scenes/gameOver";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 725,
  height: 360,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [preload, game, GameUI, GameOver],
  scale: {
    zoom: 3.5,
  },
};

export default new Phaser.Game(config);
