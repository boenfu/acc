import fastify from 'fastify';
import socketServer from 'fastify-socket.io';

import {API, Room} from '../../shared';

import './socket';

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

        let times = 10;

        while (socket.$roomMap.has(room.id) && times > 0) {
          room = new Room();
          times--;
        }

        if (times <= 0) {
          // 没有房间了
          socket.disconnect();
          return;
        }

        roomId = room.id;
        socket.$roomMap.set(roomId, room);

        await socket.$join(roomId);
      }

      socket.on('disconnect', socket.$leaveAll);

      for (const [name, fn] of Object.entries(API)) {
        socket.on(name, async (...args) => {
          let [cb] = args.splice(-1, 1);
          cb(await (fn as (...args: any[]) => any).apply(socket, args));
          socket.$sync();
        });
      }
    });
  });

  await app.listen(8080);
})().catch(console.error);
