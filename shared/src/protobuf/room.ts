import {customAlphabet} from 'nanoid';
import {Field, Message} from 'protobufjs';

import {Game} from './game';
import {Player} from './player';
import {RequestStatus} from './_enum';

const nanoid = customAlphabet('123456789abc', 6);

export class Room extends Message<Room> {
  @Field.d(0, 'string', 'required', nanoid())
  id: string = nanoid();

  @Field.d(1, Player, 'optional')
  redPlayer: Player | undefined;

  @Field.d(2, Player, 'optional')
  bluePlayer: Player | undefined;

  @Field.d(3, RequestStatus, 'required', RequestStatus.NONE)
  swopFaction: RequestStatus = RequestStatus.NONE;

  @Field.d(4, Game, 'optional')
  game: Game | undefined;
}
