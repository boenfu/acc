import { Piece } from "./piece";

export class Guard extends Piece {
  displayName = this.options.faction === "汉" ? "仕" : "士";

  grid = {
    x: this.options.id === 1 ? 3 : 5,
    y: this.options.faction === "汉" ? 9 : 0,
  };
}
