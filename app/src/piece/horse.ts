import HorseBlue from '../resources/icons/svg/horse-blue.svg';
import HorseRed from '../resources/icons/svg/horse-red.svg';

import {Piece} from './piece';

export class Horse extends Piece {
  displayName = this.options.faction === 'red' ? '傌' : '馬';

  grid = {
    x: this.options.id === 1 ? 1 : 7,
    y: this.options.faction === 'red' ? 9 : 0,
  };

  constructor(...args: ConstructorParameters<typeof Piece>) {
    args[2] = args[1].faction === 'red' ? HorseRed : HorseBlue;
    super(...args);
  }
}
