import {GameFaction, Piece, PieceKind, PiecePosition} from '../protobuf';

import {IPiecePosition, PieceContext} from './_type';

export function getNextPositions(
  {x, y}: IPiecePosition,
  {piecesGrid}: PieceContext,
): IPiecePosition[] {
  let positions: IPiecePosition[] = [];

  // left

  let leftStep = 0;

  while (x - leftStep > 0 && !piecesGrid[y][x - leftStep - 1]) {
    positions.push({x: x - leftStep - 1, y});
    leftStep++;
  }

  // 如果有炮垫，就找可以炮轰的
  if (piecesGrid[y][x - leftStep - 1]) {
    leftStep++;

    while (x - leftStep > 0 && !piecesGrid[y][x - leftStep - 1]) {
      leftStep++;
    }

    if (piecesGrid[y][x - leftStep - 1]) {
      positions.push({x: x - leftStep - 1, y});
    }
  }

  // right
  let rightStep = 0;

  while (
    x + rightStep + 1 < piecesGrid[y].length &&
    !piecesGrid[y][x + rightStep + 1]
  ) {
    positions.push({x: x + rightStep + 1, y});
    rightStep++;
  }

  if (piecesGrid[y][x + rightStep + 1]) {
    rightStep++;

    while (
      x + rightStep + 1 < piecesGrid[y].length &&
      !piecesGrid[y][x + rightStep + 1]
    ) {
      rightStep++;
    }

    if (piecesGrid[y][x + rightStep + 1]) {
      positions.push({x: x + rightStep + 1, y});
    }
  }

  // top

  let topStep = 0;

  while (y - topStep > 0 && !piecesGrid[y - topStep - 1][x]) {
    positions.push({x, y: y - topStep - 1});
    topStep++;
  }

  if (piecesGrid[y - topStep - 1]?.[x]) {
    topStep++;

    while (y - topStep > 0 && !piecesGrid[y - topStep - 1][x]) {
      topStep++;
    }

    if (piecesGrid[y - topStep - 1]?.[x]) {
      positions.push({x, y: y - topStep - 1});
    }
  }

  // bottom
  let bottomStep = 0;

  while (
    y + bottomStep + 1 < piecesGrid.length &&
    !piecesGrid[y + bottomStep + 1][x]
  ) {
    positions.push({x, y: y + bottomStep + 1});
    bottomStep++;
  }

  if (piecesGrid[y + bottomStep + 1]?.[x]) {
    bottomStep++;

    while (
      y + bottomStep + 1 < piecesGrid.length &&
      !piecesGrid[y + bottomStep + 1][x]
    ) {
      bottomStep++;
    }

    if (piecesGrid[y + bottomStep + 1]?.[x]) {
      positions.push({x, y: y + bottomStep + 1});
    }
  }

  return positions;
}

export function initializePosition(
  faction: GameFaction,
  id: number,
): IPiecePosition {
  return {
    x: id === 1 ? 1 : 7,
    y: faction === GameFaction.RED ? 7 : 2,
  };
}

export function initializePieces(faction: GameFaction): Piece[] {
  return Array(2)
    .fill(undefined)
    .map((_, index) => {
      let id = index + 1;

      let piece = new Piece();

      piece.kind = PieceKind.CANNON;
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
