import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x, y}: IPiecePosition,
  {piecesGrid, faction}: PieceContext,
): IPiecePosition[] {
  let yCenter = faction === GameFaction.RED ? 8 : 1;

  let positions = [
    {x, y: y + 1},
    {x, y: y - 1},
    {x: x + 1, y},
    {x: x - 1, y},
  ].filter(
    position =>
      position.x >= 3 &&
      position.x <= 5 &&
      position.y >= yCenter - 1 &&
      position.y <= yCenter + 1,
  );

  let direction = faction === GameFaction.RED ? -1 : 1;
  let offset = 1;

  while (!piecesGrid[y + offset * direction]?.[x]) {
    let index = y + offset * direction;

    if (index >= piecesGrid.length || index <= 0) {
      break;
    }

    offset++;
  }

  if (piecesGrid[y + offset * direction]?.[x]) {
    // TODO
    // let otherKing = getPiece(piecesGrid[y + offset * direction][x]!);
    // if (otherKing.identity.type === 'king') {
    //   positions.push({...otherKing.position});
    // }
  }

  return positions;
}

export function initializePosition(faction: GameFaction): IPiecePosition {
  return {
    x: 4,
    y: faction === GameFaction.RED ? 9 : 0,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  let id = 1;

  let piece = new Piece();

  piece.kind = PieceKind.KING;
  piece.id = id;

  let position = new PiecePosition();
  let {x, y} = initializePosition(faction);
  position.x = x;
  position.y = y;
  piece.position = position;

  return [piece];
}
