import {APIContext} from '../api-context';
import {PieceCore} from '../piece';
import {Game, GameFaction, Piece, PiecePosition} from '../protobuf';

export async function startGame(this: APIContext): Promise<void> {
  let room = this.$room;

  if (!room) {
    return;
  }

  if (room.game) {
    return;
  }

  if (!room.bluePlayer || !room.redPlayer) {
    return;
  }

  let game = new Game();

  game.pieces = initializePieces();
  room.game = game;
}

export async function changeSelectingPiece(
  this: APIContext,
  globalId: string | undefined,
): Promise<void> {
  let game = this.$room?.game;

  if (!game) {
    return;
  }

  if (
    (game.currentFaction === GameFaction.BLUE && this.$isRed) ||
    (game.currentFaction === GameFaction.RED && this.$isBlue)
  ) {
    return;
  }

  if (this.$isRed) {
    game.redSelectingPiece = globalId;
  } else {
    game.blueSelectingPiece = globalId;
  }
}

// export async function changePieceDead(
//   id: string | PiecePosition,
//   _dead: boolean,
// ): Promise<void> {
//   if (typeof id !== 'string') {
//     id = this.piecesGrid[id.y][id.x]!;
//   }

//   let piece = this.pieceMap[id];

//   if (!piece) {
//     return;
//   }

//   // piece.dead = dead;
// }

export async function changePiecePosition(
  this: APIContext,
  position: PiecePosition,
): Promise<void> {
  let game = this.$room?.game;

  if (!game) {
    return;
  }

  if (
    (game.currentFaction === GameFaction.BLUE && this.$isRed) ||
    (game.currentFaction === GameFaction.RED && this.$isBlue)
  ) {
    return;
  }

  let selectingPieceId = this.$isRed
    ? game.redSelectingPiece
    : game.blueSelectingPiece;

  if (!selectingPieceId) {
    return;
  }

  // let selectingPiece = this.

  // // pieckan
  // PieceCore[selectingPiece.kind].getNextPositions(selectingPiece.position, {
  //   // faction: GameFaction;
  //   // overseas: boolean;
  //   // piecesGrid: PiecesGrid;
  //   faction: GameFaction.RED,
  //   overseas: true,
  //   piecesGrid: [],
  // });

  // game.redSelectingPiece = piece;
}

// export async function toggleCurrentFaction(): Promise<void> {
//   this.currentFaction =
//     this.currentFaction === GameFaction.RED
//       ? GameFaction.BLUE
//       : GameFaction.RED;
// }

function initializePieces(): Piece[] {
  return Object.values(PieceCore).flatMap(({initializePieces}) => [
    ...initializePieces(GameFaction.RED),
    ...initializePieces(GameFaction.BLUE),
  ]);
}
