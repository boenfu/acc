import {
  PIECE_RADIUS,
  PIECE_PADDING,
  GRID_SIZE,
  CONTAINER_PADDING,
} from "../constant";

export type PieceFaction = "楚" | "汉";

export interface PieceOptions {
  faction: PieceFaction;
  id?: number;
}

export interface PieceGridOptions {
  x: number;
  y: number;
}

export abstract class Piece {
  constructor(
    readonly context: CanvasRenderingContext2D,
    readonly options: PieceOptions
  ) {}

  abstract grid: PieceGridOptions;

  abstract displayName: string;

  get color(): string {
    let { faction } = this.options;

    return faction === "汉" ? "#ee3f4d" : "#36292f";
  }

  draw(): void {
    let context = this.context;
    let color = this.color;

    let { x: gridX, y: gridY } = this.grid;

    let x = gridX * GRID_SIZE + CONTAINER_PADDING;
    let y = gridY * GRID_SIZE + CONTAINER_PADDING;

    context.beginPath();
    context.strokeStyle = "#000";
    context.arc(x, y, PIECE_RADIUS, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.fillStyle = "#fff";
    context.arc(x, y, PIECE_RADIUS - 1, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.strokeStyle = color;
    context.arc(x, y, PIECE_RADIUS - PIECE_PADDING, 0, Math.PI * 2);
    context.stroke();

    context.font = "18px STheiti, SimHei";
    context.fillStyle = color;

    let textX = -1;
    let textY = -2;

    context.fillText(
      this.displayName,
      x - PIECE_RADIUS / 2 + textX,
      y + PIECE_RADIUS / 2 + textY
    );
  }
}
