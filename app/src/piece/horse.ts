import {GameFaction} from 'shared';

import {HorseBlue, HorseRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Horse extends Piece {
  identity: PieceIdentity = {
    type: 'horse',
    name: '河里',
    [GameFaction.RED]: {
      displayName: '傌',
      Icon: HorseRed,
    },
    [GameFaction.BLUE]: {
      displayName: '馬',
      Icon: HorseBlue,
    },
    description:
      '一种能游过楚河的千里马, 与三炮常常并肩作战, 每每击溃敌军, 都会听到感叹: "这...这河里马?"',
  };
}
