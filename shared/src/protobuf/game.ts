import {Field, Message} from 'protobufjs';

import {Piece} from './piece';
import {GameFaction, RequestStatus} from './_enum';

export class Game extends Message<Game> {
  @Field.d(1, Piece, 'repeated', [])
  pieces: Piece[] = [];

  @Field.d(3, 'string', 'optional')
  redSelectingPiece: string | undefined;

  @Field.d(4, 'string', 'optional')
  blueSelectingPiece: string | undefined;

  @Field.d(5, GameFaction, 'required', GameFaction.RED)
  currentFaction: GameFaction = GameFaction.RED;

  @Field.d(6, RequestStatus, 'required', RequestStatus.NONE)
  regret: RequestStatus = RequestStatus.NONE;

  @Field.d(7, GameFaction, 'optional')
  victor: GameFaction | undefined;
}
