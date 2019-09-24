import { Piece } from "./piece";

export class Rook extends Piece {
  displayName = this.options.faction === "汉" ? "俥" : "車";

  grid = {
    x: this.options.id === 1 ? 0 : 8,
    y: this.options.faction === "汉" ? 9 : 0,
  };
}
