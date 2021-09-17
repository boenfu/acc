import {makeAutoObservable, runInAction} from 'mobx';
import io from 'socket.io-client';

import {Room, isBlue, isRed} from '../../../shared';

export interface IRoomStore {
  isBlue: boolean;
  isRed: boolean;
  room: Room | undefined;
  joinRoom(room: string): Promise<boolean>;
  exitRoom(): void;
  swopFaction(): Promise<boolean>;
  refuseSwopFaction(): Promise<boolean>;
}

class RoomStore implements IRoomStore {
  private socket = io('http://localhost:8080', {
    auth: {
      room: location.hash && location.hash.slice(1),
    },
  });
  private userId!: string;

  room: Room | undefined;

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
      .on('sync', this.setRoom);

    makeAutoObservable(this);
  }

  setRoom = (roomBuffer: ArrayBuffer): void => {
    let room = Room.decode(new Uint8Array(roomBuffer));
    this.room = room;

    if (!location.hash || location.hash !== `#${room.id}`) {
      location.hash = `#${room.id}`;
    }
  };

  joinRoom = (room: string): Promise<boolean> => {
    return new Promise(resolve => {
      this.socket.emit('action:join-room', room, resolve);
    });
  };

  exitRoom = (): void => {
    location.hash = '';
    this.socket.auth = {};

    this.socket.disconnect().connect();
  };

  swopFaction = (): Promise<boolean> => {
    return new Promise(() => {
      this.socket.emit('action:swop-faction');
    });
  };

  refuseSwopFaction = (): Promise<boolean> => {
    return new Promise(() => {
      this.socket.emit('action:refuse-swop-faction');
    });
  };
}

export const roomStore = new RoomStore();
