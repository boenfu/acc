import {ElephBlue, ElephRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Eleph extends Piece {
  get nextPositions(): PiecePosition[] {
    let {x, y} = this.position;
    let faction = this.faction;
    let pieceGrid = this.context.pieceGrid;

    let positions: PiecePosition[] = [];

    if (!(faction === 'blue' && y === 4)) {
      if (!pieceGrid[y + 1]?.[x + 1]) {
        positions.push({
          x: x + 2,
          y: y + 2,
        });
      }

      if (!pieceGrid[y + 1]?.[x - 1]) {
        positions.push({
          x: x - 2,
          y: y + 2,
        });
      }
    }

    if (!(faction === 'red' && y === 5)) {
      if (!pieceGrid[y - 1]?.[x - 1]) {
        positions.push({
          x: x - 2,
          y: y - 2,
        });
      }

      if (!pieceGrid[y - 1]?.[x + 1]) {
        positions.push({
          x: x + 2,
          y: y - 2,
        });
      }
    }

    return positions;
  }

  identity: PieceIdentity = {
    type: 'eleph',
    name: '四步',
    red: {
      displayName: '相',
      Icon: ElephRed,
      initializePosition(id) {
        return {
          x: id === 1 ? 2 : 6,
          y: 9,
        };
      },
    },
    blue: {
      displayName: '象',
      Icon: ElephBlue,
      initializePosition(id) {
        return {
          x: id === 1 ? 2 : 6,
          y: 0,
        };
      },
    },
    description:
      '为象憨厚, 不会越雷池半步, 大帅把他和土狸子视为自己的左膀右臂, 江湖人送外号: 四步象',
  };
}
