import {Room} from './protobuf';

export interface APIContext {
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
