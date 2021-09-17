export enum GameFaction {
  RED = 1,
  BLUE,
}

export enum PieceKind {
  KING,
  GUARD,
  ELEPH,
  HORSE,
  ROOK,
  CANNON,
  PAWN,
}

export enum RequestStatus {
  BLUE_REFUSED = -2,
  RED_REFUSED, // -1
  NONE, // 0
  RED_REQUESTING, // 1
  BLUE_REQUESTING, // 2
}
