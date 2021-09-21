import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x}: IPiecePosition,
  {faction}: PieceContext,
): IPiecePosition[] {
  if (x === 3 || x === 5) {
    return [
      {
        x: 4,
        y: faction === GameFaction.RED ? 8 : 1,
      },
    ];
  } else {
    return [3, 5].flatMap(x =>
      faction === GameFaction.RED
        ? [
            {
              x,
              y: 7,
            },
            {
              x,
              y: 9,
            },
          ]
        : [
            {
              x,
              y: 0,
            },
            {
              x,
              y: 2,
            },
          ],
    );
  }
}

export function initializePosition(
  faction: GameFaction,
  id: number,
): IPiecePosition {
  return {
    x: id === 1 ? 3 : 5,
    y: faction === GameFaction.RED ? 9 : 0,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  return Array(2)
    .fill(undefined)
    .map((_, index) => {
      let id = index + 1;

      let piece = new Piece();

      piece.kind = PieceKind.GUARD;
      piece.id = id;

      let position = new PiecePosition();
      let {x, y} = initializePosition(faction, id);
      position.x = x;
      position.y = y;
      piece.position = position;

      return piece;
    });
}
