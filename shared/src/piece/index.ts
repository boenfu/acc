/* eslint-disable @mufan/scoped-modules */
import * as cannon from './cannon';
import * as eleph from './eleph';
import * as guard from './guard';
import * as horse from './horse';
import * as king from './king';
import * as pawn from './pawn';
import * as rook from './rook';

export const PieceCore = {
  cannon,
  eleph,
  guard,
  horse,
  king,
  pawn,
  rook,
} as const;

export * from './_type';
