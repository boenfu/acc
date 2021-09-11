import Canvg from 'canvg';

import {
  CONTAINER_PADDING,
  CONTAINER_WIDTH,
  GRID_SIZE,
  // PIECE_PADDING,
  // PIECE_RADIUS,
} from '../const';

const SVG_VIEW_BOX_SIZE = 48;
const SVG_SCALE = (CONTAINER_WIDTH / SVG_VIEW_BOX_SIZE) * 1.2;
const SVG_SCALE_width = (GRID_SIZE / CONTAINER_WIDTH) * SVG_VIEW_BOX_SIZE;

export type PieceFaction = 'blue' | 'red';

export interface PieceOptions {
  faction: PieceFaction;
  id?: number;
}

export interface PieceGridOptions {
  x: number;
  y: number;
}

export abstract class Piece {
  private canvg: Canvg | undefined;

  constructor(
    readonly context: CanvasRenderingContext2D,
    readonly options: PieceOptions,
    iconPath?: string,
  ) {
    Canvg.from(context, iconPath!, {
      ignoreClear: true,
      ignoreDimensions: true,
      ignoreMouse: true,
    })
      .then(canvg => (this.canvg = canvg))
      .catch(console.error);
  }

  abstract grid: PieceGridOptions;

  abstract displayName: string;

  get color(): string {
    let {faction} = this.options;

    return faction === 'red' ? '#ee3f4d' : '#36292f';
  }

  draw(): void {
    let canvg = this.canvg;

    if (!canvg) {
      requestAnimationFrame(() => this.draw());
      return;
    }

    // let context = this.context;
    // let color = this.color;

    let {x: gridX, y: gridY} = this.grid;

    let x = gridX * GRID_SIZE + CONTAINER_PADDING;
    let y = gridY * GRID_SIZE + CONTAINER_PADDING;

    // context.beginPath();
    // context.strokeStyle = '#000';
    // context.arc(x, y, PIECE_RADIUS, 0, Math.PI * 2);
    // context.stroke();

    // context.beginPath();
    // context.fillStyle = '#fff';
    // context.arc(x, y, PIECE_RADIUS - 1, 0, Math.PI * 2);
    // context.fill();

    // context.beginPath();
    // context.strokeStyle = color;
    // context.arc(x, y, PIECE_RADIUS - PIECE_PADDING, 0, Math.PI * 2);
    // context.stroke();

    // context.font = '18px STheiti, SimHei';
    // context.fillStyle = color;

    // let textX = -1;
    // let textY = -2;

    // context.fillText(
    //   this.displayName,
    //   x - PIECE_RADIUS / 2 + textX,
    //   y + PIECE_RADIUS / 2 + textY,
    // );

    canvg
      .render({
        offsetX: (x - GRID_SIZE / 2) * SVG_SCALE,
        offsetY: (y - GRID_SIZE / 2) * SVG_SCALE,
        scaleWidth: SVG_SCALE_width,
      })
      .catch(console.error);
  }
}
