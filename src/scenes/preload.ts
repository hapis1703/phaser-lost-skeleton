import Phaser from "phaser";
export default class preload extends Phaser.Scene {
  constructor() {
    super("preloader");
  }
  preload() {
    this.load.atlas("player", "player/player.png", "player/player.json");
    this.load.tilemapTiledJSON("map", "tileset/tileset.json");
    this.load.image("tileset", "tileset/Dungeon_Tileset_extrude.png");
    this.load.atlas("demon", "demon/demon.png", "demon/demon.json");
    this.load.image("ui-heart-empty", "hearts/ui_heart_empty.png");
    this.load.image("ui-heart-full", "hearts/ui_heart_full.png");
    this.load.image("sword", "weapon/sword.png");
    this.load.audio("damage", "audio/y2mate.com - Sound effect Uh.mp3");
    this.load.atlas("treasure", "chest/chest.png", "chest/chest.json");
  }
  create() {
    this.scene.start("game");
  }
}
