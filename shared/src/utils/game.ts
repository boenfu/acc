import {CHESSBOARD_COLUMN_SIZE, CHESSBOARD_ROW_SIZE} from '../const';
import {IPiecePosition, PiecesGrid} from '../piece';
import {Piece} from '../protobuf';

export function getGlobalId({faction, kind, id}: Piece): string {
  return `${faction}_${kind}_${id}`;
}

export function getPiecesGrid(pieces: Piece[]): PiecesGrid {
  let grid = Array(CHESSBOARD_ROW_SIZE)
    .fill(undefined)
    .map(() => Array(CHESSBOARD_COLUMN_SIZE));

  for (let piece of pieces) {
    if (piece.dead) {
      continue;
    }

    grid[piece.position.y][piece.position.x] = getGlobalId(piece);
  }

  return grid;
}

export function verifyPieceEdge({x, y}: IPiecePosition): boolean {
  return !(
    x < 0 ||
    x > CHESSBOARD_COLUMN_SIZE - 1 ||
    y < 0 ||
    y > CHESSBOARD_ROW_SIZE - 1
  );
}
