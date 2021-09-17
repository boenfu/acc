import {Field, Message} from 'protobufjs/light';

import {getRandomName} from '../utils';

export class Player extends Message<Player> {
  @Field.d(0, 'string')
  id!: string;

  @Field.d(1, 'string', 'required', '')
  displayName: string = getRandomName();
}
