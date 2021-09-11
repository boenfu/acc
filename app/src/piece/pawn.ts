import PawnBlue from '../resources/icons/svg/pawn-blue.svg';
import PawnRed from '../resources/icons/svg/pawn-Red.svg';

import {Piece} from './piece';

export class Pawn extends Piece {
  displayName = this.options.faction === 'red' ? '兵' : '卒';

  grid = {
    x: ((this.options.id || 0) - 1) * 2,
    y: this.options.faction === 'red' ? 6 : 3,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? PawnRed : PawnBlue;
    super(...args);
  }
}
