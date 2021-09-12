import {CannonBlue, CannonRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Cannon extends Piece {
  get nextPositions(): PiecePosition[] {
    let {pieceGrid} = this.context;

    let {x, y} = this.position;

    let positions: PiecePosition[] = [];

    // left

    let leftStep = 0;

    while (x - leftStep > 0 && !pieceGrid[y][x - leftStep - 1]) {
      positions.push({x: x - leftStep - 1, y});
      leftStep++;
    }

    // 如果有炮垫，就找可以炮轰的
    if (pieceGrid[y][x - leftStep - 1]) {
      leftStep++;

      while (x - leftStep > 0 && !pieceGrid[y][x - leftStep - 1]) {
        leftStep++;
      }

      if (pieceGrid[y][x - leftStep - 1]) {
        positions.push({x: x - leftStep - 1, y});
      }
    }

    // right
    let rightStep = 0;

    while (
      x + rightStep + 1 < pieceGrid[y].length &&
      !pieceGrid[y][x + rightStep + 1]
    ) {
      positions.push({x: x + rightStep + 1, y});
      rightStep++;
    }

    if (pieceGrid[y][x + rightStep + 1]) {
      rightStep++;

      while (
        x + rightStep + 1 < pieceGrid[y].length &&
        !pieceGrid[y][x + rightStep + 1]
      ) {
        rightStep++;
      }

      if (pieceGrid[y][x + rightStep + 1]) {
        positions.push({x: x + rightStep + 1, y});
      }
    }

    // top

    let topStep = 0;

    while (y - topStep > 0 && !pieceGrid[y - topStep - 1][x]) {
      positions.push({x, y: y - topStep - 1});
      topStep++;
    }

    if (pieceGrid[y - topStep - 1]?.[x]) {
      topStep++;

      while (y - topStep > 0 && !pieceGrid[y - topStep - 1][x]) {
        topStep++;
      }

      if (pieceGrid[y - topStep - 1]?.[x]) {
        positions.push({x, y: y - topStep - 1});
      }
    }

    // bottom
    let bottomStep = 0;

    while (
      y + bottomStep + 1 < pieceGrid.length &&
      !pieceGrid[y + bottomStep + 1][x]
    ) {
      positions.push({x, y: y + bottomStep + 1});
      bottomStep++;
    }

    if (pieceGrid[y + bottomStep + 1]?.[x]) {
      bottomStep++;

      while (
        y + bottomStep + 1 < pieceGrid.length &&
        !pieceGrid[y + bottomStep + 1][x]
      ) {
        bottomStep++;
      }

      if (pieceGrid[y + bottomStep + 1]?.[x]) {
        positions.push({x, y: y + bottomStep + 1});
      }
    }

    return positions;
  }

  identity: PieceIdentity = {
    type: 'cannon',
    name: '三炮',
    red: {
      displayName: '炮',
      Icon: CannonRed,
      initializePosition(id) {
        return {
          x: id === 1 ? 1 : 7,
          y: 7,
        };
      },
    },
    blue: {
      displayName: '砲',
      Icon: CannonBlue,
      initializePosition(id) {
        return {
          x: id === 1 ? 1 : 7,
          y: 2,
        };
      },
    },
    description: '不站在风口也能起飞的猪, 别小瞧它的威力',
  };
}
