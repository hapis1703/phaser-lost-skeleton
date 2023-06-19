import Phaser from "phaser";
const createPlayerAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "player-idle-down",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "idle-down (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-idle-up",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "idle-up (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-idle-rl",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "idle-rl (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-walk-down",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "walk-down (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-walk-up",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "walk-up (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-walk-rl",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 6,
      prefix: "walk-rl (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-attack-rl",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 8,
      prefix: "attack-rl (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 13,
  });
  anims.create({
    key: "player-attack-down",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 8,
      prefix: "attack-down (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-attack-up",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 8,
      prefix: "attack-up (",
      suffix: ").png",
    }),
    repeat: -1,
    frameRate: 10,
  });
  anims.create({
    key: "player-death",
    frames: anims.generateFrameNames("player", {
      start: 1,
      end: 12,
      prefix: "death (",
      suffix: ").png",
    }),
    repeat: 0,
    frameRate: 10,
  });
};
export { createPlayerAnims };
