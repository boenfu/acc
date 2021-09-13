import io from 'socket.io-client';

export interface IServerStore {}

class ServerStore implements IServerStore {
  constructor() {
    let socket = io('ws://localhost:8080');
    socket.connect();
  }
}

export const serverStore = new ServerStore();
