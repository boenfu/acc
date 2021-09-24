import {GameFaction} from 'shared';

import {ElephBlue, ElephRed} from '../resources/icons';

import {Piece, PieceIdentity} from './piece';

export class Eleph extends Piece {
  identity: PieceIdentity = {
    type: 'eleph',
    name: '四步',
    [GameFaction.RED]: {
      displayName: '相',
      Icon: ElephRed,
    },
    [GameFaction.BLUE]: {
      displayName: '象',
      Icon: ElephBlue,
    },
    description:
      '为象憨厚, 不会越雷池半步, 大帅把他和土狸子视为自己的左膀右臂, 江湖人送外号: 四步象',
  };
}
