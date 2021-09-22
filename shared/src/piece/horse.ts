import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x, y}: IPiecePosition,
  {piecesGrid}: PieceContext,
): IPiecePosition[] {
  let positions: IPiecePosition[] = [];

  if (!piecesGrid[y]?.[x + 1]) {
    positions.push(
      {
        x: x + 2,
        y: y + 1,
      },
      {
        x: x + 2,
        y: y - 1,
      },
    );
  }

  if (!piecesGrid[y]?.[x - 1]) {
    positions.push(
      {
        x: x - 2,
        y: y + 1,
      },
      {
        x: x - 2,
        y: y - 1,
      },
    );
  }

  if (!piecesGrid[y - 1]?.[x]) {
    positions.push(
      {
        x: x + 1,
        y: y - 2,
      },
      {
        x: x - 1,
        y: y - 2,
      },
    );
  }

  if (!piecesGrid[y + 1]?.[x]) {
    positions.push(
      {
        x: x + 1,
        y: y + 2,
      },
      {
        x: x - 1,
        y: y + 2,
      },
    );
  }

  return positions;
}

export function initializePosition(
  faction: GameFaction,
  id: number,
): IPiecePosition {
  return {
    x: id === 1 ? 1 : 7,
    y: faction === GameFaction.RED ? 9 : 0,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  return Array(2)
    .fill(undefined)
    .map((_, index) => {
      let id = index + 1;

      let piece = new Piece();

      piece.kind = PieceKind.HORSE;
      piece.id = id;

      let position = new PiecePosition();
      let {x, y} = initializePosition(faction, id);
      position.x = x;
      position.y = y;
      piece.position = position;
      piece.faction = faction;

      return piece;
    });
}
