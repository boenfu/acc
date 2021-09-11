import CannonBlue from '../resources/icons/svg/cannon-blue.svg';
import CannonRed from '../resources/icons/svg/cannon-red.svg';

import {Piece} from './piece';

export class Cannon extends Piece {
  displayName = this.options.faction === 'red' ? '炮' : '砲';

  grid = {
    x: this.options.id === 1 ? 1 : 7,
    y: this.options.faction === 'red' ? 7 : 2,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? CannonRed : CannonBlue;
    super(...args);
  }
}
