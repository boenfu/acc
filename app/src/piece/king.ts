import KingBlue from '../resources/icons/svg/king-blue.svg';
import KingRed from '../resources/icons/svg/king-red.svg';

import {Piece} from './piece';

export class King extends Piece {
  displayName = this.options.faction === 'red' ? '帥' : '将';

  grid = {
    x: 4,
    y: this.options.faction === 'red' ? 9 : 0,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? KingRed : KingBlue;
    super(...args);
  }
}
