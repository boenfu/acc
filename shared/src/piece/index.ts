/* eslint-disable @mufan/scoped-modules */
import {PieceKind} from '../protobuf';

import * as cannon from './cannon';
import * as eleph from './eleph';
import * as guard from './guard';
import * as horse from './horse';
import * as king from './king';
import * as pawn from './pawn';
import * as rook from './rook';

export const PieceCore = {
  [PieceKind.CANNON]: cannon,
  [PieceKind.ELEPH]: eleph,
  [PieceKind.GUARD]: guard,
  [PieceKind.HORSE]: horse,
  [PieceKind.KING]: king,
  [PieceKind.PAWN]: pawn,
  [PieceKind.ROOK]: rook,
} as const;

export * from './_type';
