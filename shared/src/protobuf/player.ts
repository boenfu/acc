import {Field, Message} from 'protobufjs';

export class Player extends Message<Player> {
  @Field.d(0, 'string')
  id!: string;

  @Field.d(1, 'string')
  displayName: string | undefined;
}
