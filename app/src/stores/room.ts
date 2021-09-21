import {makeAutoObservable, runInAction} from 'mobx';
import io from 'socket.io-client';

import {API, APIContext, Room, isBlue, isRed} from '../../../shared';

type APIClient = typeof API & APIContext;

export interface IRoomStore {
  api: APIClient;
  room: Room | undefined;
  isBlue: boolean;
  isRed: boolean;
  exitRoom(): void;
}

class RoomStore implements IRoomStore {
  private socket = io('http://localhost:8080', {
    auth: {
      room: location.hash && location.hash.slice(1),
    },
  });
  private userId!: string;

  room: Room | undefined;

  api = Object.keys(API).reduce((api: any, name) => {
    api[name] = new Proxy(() => {}, {
      apply: (_, _thisArg, argArray: any[]) => {
        return new Promise(resolve =>
          this.socket.emit(name, ...argArray, resolve),
        );
      },
    });

    return api;
  }, {} as APIClient);

  get isBlue(): boolean {
    return !!this.room && isBlue(this.room, this.userId);
  }

  get isRed(): boolean {
    return !!this.room && isRed(this.room, this.userId);
  }

  constructor() {
    this.socket
      .on('connect', () => {
        runInAction(() => (this.userId = this.socket.id));
      })
      .on('sync', (roomBuffer: ArrayBuffer): void => {
        let room = Room.decode(new Uint8Array(roomBuffer));
        this.room = room;

        if (!location.hash || location.hash !== `#${room.id}`) {
          location.hash = `#${room.id}`;
        }
      });

    makeAutoObservable(this, {
      api: false,
    });
  }

  exitRoom = (): void => {
    location.hash = '';
    this.socket.auth = {};

    this.socket.disconnect().connect();
  };
}

export const roomStore = new RoomStore();
