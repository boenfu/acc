import { Piece } from "./piece";

export class King extends Piece {
  displayName = this.options.faction === "汉" ? "帥" : "将";

  grid = {
    x: 4,
    y: this.options.faction === "汉" ? 9 : 0,
  };
}
