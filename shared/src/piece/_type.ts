import {GameFaction} from '../protobuf';

export interface IPiecePosition {
  x: number;
  y: number;
}

export type PiecesGrid = (string | undefined)[][];

export interface PieceContext {
  faction: GameFaction;
  overseas: boolean;
  piecesGrid: PiecesGrid;
}
