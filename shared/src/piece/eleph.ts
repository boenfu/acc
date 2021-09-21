import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x, y}: IPiecePosition,
  {faction, piecesGrid}: PieceContext,
): IPiecePosition[] {
  let positions: IPiecePosition[] = [];

  if (!(faction === GameFaction.BLUE && y === 4)) {
    if (!piecesGrid[y + 1]?.[x + 1]) {
      positions.push({
        x: x + 2,
        y: y + 2,
      });
    }

    if (!piecesGrid[y + 1]?.[x - 1]) {
      positions.push({
        x: x - 2,
        y: y + 2,
      });
    }
  }

  if (!(faction === GameFaction.RED && y === 5)) {
    if (!piecesGrid[y - 1]?.[x - 1]) {
      positions.push({
        x: x - 2,
        y: y - 2,
      });
    }

    if (!piecesGrid[y - 1]?.[x + 1]) {
      positions.push({
        x: x + 2,
        y: y - 2,
      });
    }
  }

  return positions;
}

export function initializePosition(
  faction: GameFaction,
  id: number,
): IPiecePosition {
  return {
    x: id === 1 ? 2 : 6,
    y: faction === GameFaction.RED ? 9 : 0,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  return Array(2)
    .fill(undefined)
    .map((_, index) => {
      let id = index + 1;

      let piece = new Piece();

      piece.kind = PieceKind.ELEPH;
      piece.id = id;

      let position = new PiecePosition();
      let {x, y} = initializePosition(faction, id);
      position.x = x;
      position.y = y;
      piece.position = position;

      return piece;
    });
}
