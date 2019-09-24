import { Piece } from "./piece";

export class Cannon extends Piece {
  displayName = this.options.faction === "汉" ? "炮" : "砲";

  grid = {
    x: this.options.id === 1 ? 1 : 7,
    y: this.options.faction === "汉" ? 7 : 2,
  };
}
