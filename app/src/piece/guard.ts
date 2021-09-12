import {GuardBlue, GuardRed} from '../resources/icons';

import {Piece, PieceIdentity, PiecePosition} from './piece';

export class Guard extends Piece {
  get nextPositions(): PiecePosition[] {
    let {x} = this.position;
    let faction = this.faction;

    if (x === 3 || x === 5) {
      return [
        {
          x: 4,
          y: faction === 'red' ? 8 : 1,
        },
      ];
    } else {
      return [3, 5].flatMap(x =>
        faction === 'red'
          ? [
              {
                x,
                y: 7,
              },
              {
                x,
                y: 9,
              },
            ]
          : [
              {
                x,
                y: 0,
              },
              {
                x,
                y: 2,
              },
            ],
      );
    }
  }

  identity: PieceIdentity = {
    type: 'guard',
    name: '土狸子',
    red: {
      displayName: '仕',
      Icon: GuardRed,
      initializePosition(id) {
        return {
          x: id === 1 ? 3 : 5,
          y: 9,
        };
      },
    },
    blue: {
      displayName: '士',
      Icon: GuardBlue,
      initializePosition(id) {
        return {
          x: id === 1 ? 3 : 5,
          y: 0,
        };
      },
    },
    description: '足智多谋, 为大帅出谋划策的打工仔, 不会离开大帅的三米之内',
  };
}
