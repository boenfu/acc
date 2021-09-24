import {GameFaction} from 'shared';

import {RookBlue, RookRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Rook extends Piece {
  identity: PieceIdentity = {
    type: 'rook',
    name: '车基',
    [GameFaction.RED]: {
      displayName: '俥',
      Icon: RookRed,
    },
    [GameFaction.BLUE]: {
      displayName: '車',
      Icon: RookBlue,
    },
    description: '家族中腿长记录保持者, 移动速度极佳',
  };
}
