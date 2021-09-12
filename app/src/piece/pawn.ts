import {PawnBlue, PawnRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Pawn extends Piece {
  get nextPositions(): PiecePosition[] {
    let {x, y} = this.position;
    let faction = this.faction;

    let positions: PiecePosition[] = [
      {
        x,
        y: y + (faction === 'red' ? -1 : 1),
      },
    ];

    if (!this.overseas) {
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

  identity: PieceIdentity = {
    type: 'pawn',
    name: '二眼崽',
    red: {
      displayName: '兵',
      Icon: PawnRed,
      initializePosition(id) {
        return {
          x: ((id || 0) - 1) * 2,
          y: 6,
        };
      },
    },
    blue: {
      displayName: '卒',
      Icon: PawnBlue,
      initializePosition(id) {
        return {
          x: ((id || 0) - 1) * 2,
          y: 3,
        };
      },
    },
    description:
      '浑身上下充满鸡血的小兵, 在家是个怂蛋, 出门在外可是能横着走的狠角色。因为有五个兄弟, 经常被人错叫为"二五仔"',
  };
}
