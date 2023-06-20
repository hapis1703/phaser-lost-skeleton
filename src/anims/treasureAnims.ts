import Phaser from "phaser";
const createTreasureAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "chest-closed",
    frames: anims.generateFrameNames("treasure", {
      start: 1,
      end: 4,
      prefix: "chest_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 7,
  });
  anims.create({
    key: "chest-opened",
    frames: anims.generateFrameNames("treasure", {
      start: 1,
      end: 4,
      prefix: "chest_open_",
      suffix: ".png",
    }),
    repeat: -1,
    frameRate: 7,
  });
};
export { createTreasureAnims };
