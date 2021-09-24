import {PieceKind} from 'shared';

import {Cannon} from './cannon';
import {Eleph} from './eleph';
import {Guard} from './guard';
import {Horse} from './horse';
import {King} from './king';
import {Pawn} from './pawn';
import {Piece} from './piece';
import {Rook} from './rook';

export const PieceKindToConstructorDict: {[key in PieceKind]: typeof Piece} = {
  [PieceKind.CANNON]: Cannon,
  [PieceKind.ELEPH]: Eleph,
  [PieceKind.GUARD]: Guard,
  [PieceKind.HORSE]: Horse,
  [PieceKind.KING]: King,
  [PieceKind.PAWN]: Pawn,
  [PieceKind.ROOK]: Rook,
};
