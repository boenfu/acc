import {APIContext} from '../api-context';
import {PieceCore} from '../piece';
import {Game, GameFaction, Piece} from '../protobuf';

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

  game.redPieces = initializePieces(GameFaction.RED);
  game.bluePieces = initializePieces(GameFaction.BLUE);

  room.game = game;
}

function initializePieces(faction: GameFaction): Piece[] {
  return [
    PieceCore.cannon.initializePieces(faction),
    PieceCore.eleph.initializePieces(faction),
    PieceCore.guard.initializePieces(faction),
    PieceCore.horse.initializePieces(faction),
    PieceCore.king.initializePieces(faction),
    PieceCore.pawn.initializePieces(faction),
    PieceCore.rook.initializePieces(faction),
  ].flat();
}
