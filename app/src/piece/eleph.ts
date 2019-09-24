import { Piece } from "./piece";

export class Eleph extends Piece {
  displayName = this.options.faction === "汉" ? "相" : "象";

  grid = {
    x: this.options.id === 1 ? 2 : 6,
    y: this.options.faction === "汉" ? 9 : 0,
  };
}
