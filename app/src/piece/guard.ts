import {GameFaction} from '../../../shared';
import {GuardBlue, GuardRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Guard extends Piece {
  identity: PieceIdentity = {
    type: 'guard',
    name: '土狸子',
    [GameFaction.RED]: {
      displayName: '仕',
      Icon: GuardRed,
    },
    [GameFaction.BLUE]: {
      displayName: '士',
      Icon: GuardBlue,
    },
    description: '足智多谋, 为大帅出谋划策的打工仔, 不会离开大帅的三米之内',
  };
}
