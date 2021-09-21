import {APIContext} from '../api-context';
import {RequestStatus} from '../protobuf';

export async function swopFaction(this: APIContext): Promise<void> {
  let room = this.$room;

  if (!room) {
    return;
  }

  if (room.swopFaction > RequestStatus.NONE) {
    // 同意申请

    if (
      (this.$isRed && room.swopFaction === RequestStatus.BLUE_REQUESTING) ||
      (this.$isBlue && room.swopFaction === RequestStatus.RED_REQUESTING)
    ) {
      [room.redPlayer, room.bluePlayer] = [room.bluePlayer, room.redPlayer];

      room.swopFaction = RequestStatus.NONE;
    }
  } else {
    // 发起申请

    if (!room.redPlayer || !room.bluePlayer) {
      [room.redPlayer, room.bluePlayer] = [room.bluePlayer, room.redPlayer];
    } else if (this.$isRed) {
      room.swopFaction = RequestStatus.RED_REQUESTING;
    } else {
      room.swopFaction = RequestStatus.BLUE_REQUESTING;
    }
  }
}

export async function refuseSwopFaction(this: APIContext): Promise<void> {
  let room = this.$room;

  if (!room) {
    return;
  }

  if (room.swopFaction <= RequestStatus.NONE) {
    return;
  }

  if (this.$isRed) {
    room.swopFaction =
      room.swopFaction === RequestStatus.BLUE_REQUESTING
        ? RequestStatus.RED_REFUSED
        : RequestStatus.NONE;
  } else if (this.$isBlue) {
    room.swopFaction =
      room.swopFaction === RequestStatus.RED_REQUESTING
        ? RequestStatus.BLUE_REFUSED
        : RequestStatus.NONE;
  }
}
