// eslint-disable-next-line import/no-extraneous-dependencies
import {Socket} from 'socket.io';

import {Player, Room, isBlue, isRed} from '../../shared';

declare module 'socket.io' {
  interface Socket {
    $roomId: string;
    $room: Room | undefined;
    $isRed: boolean;
    $isBlue: boolean;
    $roomMap: Map<string, Room>;

    $join(room: string): Promise<boolean>;
    $leave(room: string): Promise<void>;
    $leaveAll(): Promise<void>;
    $sync(room?: string): void;
  }
}

Reflect.defineProperty(Socket.prototype, '$roomMap', {
  value: new Map(),
});

Reflect.defineProperty(Socket.prototype, '$room', {
  get(this: Socket) {
    return this.$roomMap.get(this.$roomId);
  },
});

Reflect.defineProperty(Socket.prototype, '$isRed', {
  get(this: Socket) {
    return this.$room && isRed(this.$room, this.id);
  },
});

Reflect.defineProperty(Socket.prototype, '$isBlue', {
  get(this: Socket) {
    return this.$room && isBlue(this.$room, this.id);
  },
});

Socket.prototype.$sync = function (
  this: Socket,
  roomId: string = [...this.rooms.values()][0],
): void {
  let room = this.$roomMap.get(roomId);

  if (!room) {
    return;
  }

  this.to(roomId).emit('sync', Room.encode(room).finish());
};

Socket.prototype.$join = async function (this: Socket, roomId: string) {
  let room = this.$roomMap.get(roomId);

  if (!room) {
    return false;
  }

  if (!room.redPlayer) {
    let player = new Player();
    player.id = this.id;
    room.redPlayer = player;
  } else if (!room.bluePlayer) {
    let player = new Player();
    player.id = this.id;
    room.bluePlayer = player;
  } else {
    return false;
  }

  await this.$leaveAll();

  await this.join(roomId);

  this.$roomId = roomId;

  this.$sync();

  return true;
};

Socket.prototype.$leaveAll = async function (this: Socket) {
  if (this.rooms.size) {
    for (let room of this.rooms) {
      await this.$leave(room);
    }
  }

  await this.$leave(this.$roomId);
};

Socket.prototype.$leave = async function (this: Socket, roomId: string) {
  await this.leave(roomId);

  let room = this.$roomMap.get(roomId);

  if (!room) {
    return;
  }

  let id = this.id;

  if (isRed(room, id)) {
    room.redPlayer = undefined;
  }

  if (isBlue(room, id)) {
    room.bluePlayer = undefined;
  }

  if (!room.redPlayer && !room.bluePlayer) {
    this.$roomMap.delete(roomId);
  }

  this.$sync(roomId);
};

setInterval(() => {
  console.log([...Socket.prototype.$roomMap.values()][0]);
}, 4000);
