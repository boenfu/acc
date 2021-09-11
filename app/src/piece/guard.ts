import GuardBlue from '../resources/icons/svg/guard-blue.svg';
import GuardRed from '../resources/icons/svg/guard-Red.svg';

import {Piece} from './piece';

export class Guard extends Piece {
  displayName = this.options.faction === 'red' ? '仕' : '士';

  grid = {
    x: this.options.id === 1 ? 3 : 5,
    y: this.options.faction === 'red' ? 9 : 0,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? GuardRed : GuardBlue;
    super(...args);
  }
}
