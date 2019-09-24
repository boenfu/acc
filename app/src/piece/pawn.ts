import { Piece } from "./piece";

export class Pawn extends Piece {
  displayName = this.options.faction === "汉" ? "兵" : "卒";

  grid = {
    x: ((this.options.id || 0) - 1) * 2,
    y: this.options.faction === "汉" ? 6 : 3,
  };
}
