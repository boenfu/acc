import fastify from 'fastify';
import socketServer from 'fastify-socket.io';

(async () => {
  const app = fastify({logger: true});

  await app.register(socketServer, {
    cors: {
      origin: '*',
    },
  });

  app.ready(err => {
    if (err) throw err;

    app.io.on('connect', socket =>
      console.info('Socket connected!', socket.id),
    );
  });

  await app.listen(8080);
})().catch(console.error);
