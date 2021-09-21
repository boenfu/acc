import {APIContext} from '../api-context';

export async function joinRoom(
  this: APIContext,
  roomId: string,
): Promise<boolean> {
  return this.$join(roomId);
}
