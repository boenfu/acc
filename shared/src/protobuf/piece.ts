import {Field, Message} from 'protobufjs';

import {GameFaction, PieceKind} from './_enum';

export class PiecePosition extends Message<PiecePosition> {
  @Field.d(1, 'int32', 'required', 0)
  x: number = 0;

  @Field.d(2, 'int32', 'required', 0)
  y: number = 0;
}

export class Piece extends Message<Piece> {
  @Field.d(0, GameFaction)
  faction!: GameFaction;

  @Field.d(1, PieceKind)
  kind!: PieceKind;

  @Field.d(2, 'int32')
  id!: number;

  @Field.d(3, PiecePosition)
  position: PiecePosition = new PiecePosition();

  @Field.d(4, 'bool', 'required', false)
  dead: boolean = false;
}
