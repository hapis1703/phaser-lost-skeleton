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
    this.load.image("coin", "chest/coin.png");
    this.load.audio("beep-coin", "audio/coin-sound.mp3");
    this.load.image("background", "background/dark-purple.png");
    this.load.image("replay-btn", "buttons/replay.png");
    this.load.image("start-btn", "buttons/start_button.png");
    this.load.image("logo", "logo/LOGO.png");
    this.load.image("logo-p", "background/player.png");
    this.load.audio("backsound", "audio/backsound.mp3");
    this.load.audio("damage", "audio/damage-sound.mp3");
  }
  create() {
    this.scene.start("game-start");
  }
}
