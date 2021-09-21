import {GameFaction} from '../../../shared';
import {PawnBlue, PawnRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Pawn extends Piece {
  identity: PieceIdentity = {
    type: 'pawn',
    name: '二眼崽',
    [GameFaction.RED]: {
      displayName: '兵',
      Icon: PawnRed,
    },
    [GameFaction.BLUE]: {
      displayName: '卒',
      Icon: PawnBlue,
    },
    description:
      '浑身上下充满鸡血的小兵, 在家是个怂蛋, 出门在外可是能横着走的狠角色。因为有五个兄弟, 经常被人错叫为"二五仔"',
  };
}
