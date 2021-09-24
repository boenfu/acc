import {GameFaction} from 'shared';

import {KingBlue, KingRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class King extends Piece {
  identity: PieceIdentity = {
    type: 'king',
    name: '大帅',
    [GameFaction.RED]: {
      displayName: '帥',
      Icon: KingRed,
    },
    [GameFaction.BLUE]: {
      displayName: '将',
      Icon: KingBlue,
    },
    description: '国宝级的人物, 起着稳定军心的大用, 每顿只吃进口竹子',
  };
}
