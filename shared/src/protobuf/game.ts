import {Field, Message} from 'protobufjs/light';

import {Piece} from './piece';
import {GameFaction, RequestStatus} from './_enum';

export class Game extends Message<Game> {
  @Field.d(1, Piece, 'repeated', [])
  redPieces: Piece[] = [];

  @Field.d(2, Piece, 'repeated', [])
  bluePieces: Piece[] = [];

  @Field.d(3, Piece, 'optional')
  redSelectingPiece: Piece | undefined;

  @Field.d(4, Piece, 'optional')
  blueSelectingPiece: Piece | undefined;

  @Field.d(5, GameFaction, 'required', GameFaction.RED)
  currentFaction: GameFaction = GameFaction.RED;

  @Field.d(6, RequestStatus, 'required', RequestStatus.NONE)
  regret: RequestStatus = RequestStatus.NONE;

  @Field.d(7, 'bool', 'required', false)
  gameOver: boolean = false;
}
