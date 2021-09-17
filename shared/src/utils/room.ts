import {Room} from '../protobuf';

export function isBlue(room: Room, id: string): boolean {
  return room.bluePlayer?.id === id;
}

export function isRed(room: Room, id: string): boolean {
  return room.redPlayer?.id === id;
}
