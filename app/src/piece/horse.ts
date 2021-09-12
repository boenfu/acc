import {HorseBlue, HorseRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Horse extends Piece {
  get nextPositions(): PiecePosition[] {
    let {x, y} = this.position;
    let pieceGrid = this.context.pieceGrid;

    let positions: PiecePosition[] = [];

    if (!pieceGrid[y]?.[x + 1]) {
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

    if (!pieceGrid[y]?.[x - 1]) {
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

    if (!pieceGrid[y - 1]?.[x]) {
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

    if (!pieceGrid[y + 1]?.[x]) {
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

  identity: PieceIdentity = {
    type: 'horse',
    name: '河里',
    red: {
      displayName: '傌',
      Icon: HorseRed,
      initializePosition(id) {
        return {
          x: id === 1 ? 1 : 7,
          y: 9,
        };
      },
    },
    blue: {
      displayName: '馬',
      Icon: HorseBlue,
      initializePosition(id) {
        return {
          x: id === 1 ? 1 : 7,
          y: 0,
        };
      },
    },
    description:
      '一种能游过楚河的千里马, 与三炮常常并肩作战, 每每击溃敌军, 都会听到感叹: "这...这河里马?"',
  };
}
