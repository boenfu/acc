import ElephBlue from '../resources/icons/svg/eleph-blue.svg';
import ElephRed from '../resources/icons/svg/eleph-red.svg';

import {Piece} from './piece';

export class Eleph extends Piece {
  displayName = this.options.faction === 'red' ? '相' : '象';

  grid = {
    x: this.options.id === 1 ? 2 : 6,
    y: this.options.faction === 'red' ? 9 : 0,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? ElephRed : ElephBlue;
    super(...args);
  }
}
