import { Piece } from "./piece";

export class Horse extends Piece {
  displayName = this.options.faction === "汉" ? "傌" : "馬";

  grid = {
    x: this.options.id === 1 ? 1 : 7,
    y: this.options.faction === "汉" ? 9 : 0,
  };
}
