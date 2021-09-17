import fastify from 'fastify';
import socketServer from 'fastify-socket.io';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Socket} from 'socket.io';

import {Player, RequestStatus, Room, isBlue, isRed} from '../../shared';

declare module 'socket.io' {
  interface Socket {
    $room: string;
    $join(room: string): Promise<boolean>;
    $leave(room: string): Promise<void>;
    $leaveAll(): Promise<void>;
    $sync(room?: string): void;
  }
}

Socket.prototype.$sync = _socketSync;
Socket.prototype.$join = async function (this: Socket, roomId: string) {
  let room = roomMap.get(roomId);

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

  this.$room = roomId;

  this.$sync();

  return true;
};

Socket.prototype.$leaveAll = async function (this: Socket) {
  if (this.rooms.size) {
    for (let room of this.rooms) {
      await this.$leave(room);
    }
  }

  await this.$leave(this.$room);
};

Socket.prototype.$leave = async function (this: Socket, roomId: string) {
  await this.leave(roomId);

  let room = roomMap.get(roomId);

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
    roomMap.delete(roomId);
  }

  this.$sync(roomId);
};

const roomMap = new Map<string, Room>();

(async () => {
  const app = fastify({logger: true});

  await app.register(socketServer, {
    cors: {
      origin: '*',
    },
  });

  app.ready(err => {
    if (err) throw err;

    app.io.on('connect', async socket => {
      let {room: roomId} = socket.handshake.auth;

      if (!roomId || !(await socket.$join(roomId))) {
        let room = new Room();
        roomId = room.id;
        roomMap.set(roomId, room);

        await socket.$join(roomId);
      }

      socket
        .on('disconnect', socket.$leaveAll)
        .on('action:join-room', async (roomId, fn) =>
          fn(await socket.$join(roomId)),
        )
        .on('action:swop-faction', () => {
          let room = roomMap.get(socket.$room);

          if (!room) {
            return;
          }

          let id = socket.id;

          if (room.swopFaction > RequestStatus.NONE) {
            // 同意申请

            if (
              (isRed(room, id) &&
                room.swopFaction === RequestStatus.BLUE_REQUESTING) ||
              (isBlue(room, id) &&
                room.swopFaction === RequestStatus.RED_REQUESTING)
            ) {
              [room.redPlayer, room.bluePlayer] = [
                room.bluePlayer,
                room.redPlayer,
              ];

              room.swopFaction = RequestStatus.NONE;
            }
          } else {
            // 发起申请

            if (!room.redPlayer || !room.bluePlayer) {
              [room.redPlayer, room.bluePlayer] = [
                room.bluePlayer,
                room.redPlayer,
              ];
            } else if (isRed(room, id)) {
              room.swopFaction = RequestStatus.RED_REQUESTING;
            } else {
              room.swopFaction = RequestStatus.BLUE_REQUESTING;
            }
          }

          socket.$sync();
        })
        .on('action:refuse-swop-faction', async () => {
          let room = roomMap.get(socket.$room);

          if (!room) {
            return;
          }

          let id = socket.id;

          if (room.swopFaction <= RequestStatus.NONE) {
            return;
          }

          if (isRed(room, id)) {
            room.swopFaction =
              room.swopFaction === RequestStatus.BLUE_REQUESTING
                ? RequestStatus.RED_REFUSED
                : RequestStatus.NONE;
          } else if (isBlue(room, id)) {
            room.swopFaction =
              room.swopFaction === RequestStatus.RED_REQUESTING
                ? RequestStatus.BLUE_REFUSED
                : RequestStatus.NONE;
          }

          socket.$sync();
        });
    });
  });

  await app.listen(8080);
})().catch(console.error);

function _socketSync(
  this: Socket,
  roomId: string = [...this.rooms.values()][0],
): void {
  let room = roomMap.get(roomId);

  if (!room) {
    return;
  }

  this.to(roomId).emit('sync', Room.encode(room).finish());
}

setInterval(() => {
  // console.log([...roomMap.values()][0]);
}, 4000);
