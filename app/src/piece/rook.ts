import {RookBlue, RookRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Rook extends Piece {
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

    positions.push({x: x - leftStep - 1, y});

    // right
    let rightStep = 0;

    while (
      x + rightStep + 1 < pieceGrid[y].length &&
      !pieceGrid[y][x + rightStep + 1]
    ) {
      positions.push({x: x + rightStep + 1, y});
      rightStep++;
    }

    positions.push({x: x + rightStep + 1, y});

    // top

    let topStep = 0;

    while (y - topStep > 0 && !pieceGrid[y - topStep - 1][x]) {
      positions.push({x, y: y - topStep - 1});
      topStep++;
    }

    positions.push({x, y: y - topStep - 1});

    // bottom
    let bottomStep = 0;

    while (
      y + bottomStep + 1 < pieceGrid.length &&
      !pieceGrid[y + bottomStep + 1][x]
    ) {
      positions.push({x, y: y + bottomStep + 1});
      bottomStep++;
    }

    positions.push({x, y: y + bottomStep + 1});

    return positions;
  }

  identity: PieceIdentity = {
    type: 'rook',
    name: '车基',
    red: {
      displayName: '俥',
      Icon: RookRed,
      initializePosition(id) {
        return {
          x: id === 1 ? 0 : 8,
          y: 9,
        };
      },
    },
    blue: {
      displayName: '車',
      Icon: RookBlue,
      initializePosition(id) {
        return {
          x: id === 1 ? 0 : 8,
          y: 0,
        };
      },
    },
    description: '家族中腿长记录保持者, 移动速度极佳',
  };
}
