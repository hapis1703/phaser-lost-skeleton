import Phaser from "phaser";

import preload from "./scenes/preload";
import game from "./scenes/game";
import GameUI from "./scenes/GameUI";
import GameOver from "./scenes/gameOver";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 365,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [preload, game, GameUI, GameOver],
  scale: {
    zoom: 2.34,
  },
};

export default new Phaser.Game(config);
