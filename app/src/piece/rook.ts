import RookBlue from '../resources/icons/svg/rook-blue.svg';
import RookRed from '../resources/icons/svg/rook-red.svg';

import {Piece} from './piece';

export class Rook extends Piece {
  displayName = this.options.faction === 'red' ? '俥' : '車';

  grid = {
    x: this.options.id === 1 ? 0 : 8,
    y: this.options.faction === 'red' ? 9 : 0,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? RookRed : RookBlue;
    super(...args);
  }
}
