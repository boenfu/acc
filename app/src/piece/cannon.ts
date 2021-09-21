import {GameFaction} from '../../../shared';
import {CannonBlue, CannonRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Cannon extends Piece {
  identity: PieceIdentity = {
    type: 'cannon',
    name: '三炮',
    [GameFaction.RED]: {
      displayName: '炮',
      Icon: CannonRed,
    },
    [GameFaction.BLUE]: {
      displayName: '砲',
      Icon: CannonBlue,
    },
    description: '不站在风口也能起飞的猪, 别小瞧它的威力',
  };
}
