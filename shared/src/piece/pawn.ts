import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x, y}: IPiecePosition,
  {faction, overseas}: PieceContext,
): IPiecePosition[] {
  let positions: IPiecePosition[] = [
    {
      x,
      y: y + (faction === GameFaction.RED ? -1 : 1),
    },
  ];

  if (!overseas) {
    return positions;
  }

  positions.push(
    {
      x: x - 1,
      y,
    },
    {
      x: x + 1,
      y,
    },
  );

  return positions;
}

export function initializePosition(
  faction: GameFaction,
  id: number,
): IPiecePosition {
  return {
    x: (id - 1) * 2,
    y: faction === GameFaction.RED ? 6 : 3,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  return Array(5)
    .fill(undefined)
    .map((_, index) => {
      let id = index + 1;

      let piece = new Piece();

      piece.kind = PieceKind.PAWN;
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
