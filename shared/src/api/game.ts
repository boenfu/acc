import {APIContext} from '../api-context';
import {IPiecePosition, PieceCore} from '../piece';
import {Game, GameFaction, Piece, PieceKind} from '../protobuf';
import {getGlobalId, getPiecesGrid, verifyPieceEdge} from '../utils';

export async function startGame(this: APIContext): Promise<void> {
  let room = this.$room;

  if (!room) {
    return;
  }

  if (room.game && !room.game.victor) {
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

  if (this.$isRed) {
    // TODO 待优化: 判断棋子
    game.redSelectingPiece = globalId;
  } else {
    game.blueSelectingPiece = globalId;
  }
}

export async function changePiecePosition(
  this: APIContext,
  position: IPiecePosition,
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

  let selectingPiece = game?.pieces.find(
    piece => getGlobalId(piece) === selectingPieceId,
  );

  if (!selectingPiece) {
    return;
  }

  let piecesGrid = getPiecesGrid(game.pieces);
  let nextPositions = PieceCore[selectingPiece.kind].getNextPositions(
    selectingPiece.position,
    {
      faction: selectingPiece.faction,
      overseas: true,
      piecesGrid,
    },
  );

  if (
    !nextPositions.some(
      ({x, y}) =>
        position.x === x && position.y === y && verifyPieceEdge(position),
    )
  ) {
    return;
  }

  let attachTarget = piecesGrid[position.y][position.x];

  selectingPiece.position.x = position.x;
  selectingPiece.position.y = position.y;

  if (attachTarget) {
    let attachTargetPiece = game.pieces.find(
      piece => getGlobalId(piece) === attachTarget,
    )!;

    attachTargetPiece.dead = true;
  }

  if (this.$isRed) {
    game.redSelectingPiece = undefined;
  } else {
    game.blueSelectingPiece = undefined;
  }

  game.currentFaction =
    game.currentFaction === GameFaction.RED
      ? GameFaction.BLUE
      : GameFaction.RED;

  checkGameOver(game);
}

function initializePieces(): Piece[] {
  return Object.values(PieceCore).flatMap(({initializePieces}) => [
    ...initializePieces(GameFaction.RED),
    ...initializePieces(GameFaction.BLUE),
  ]);
}

function checkGameOver(game: Game): void {
  for (let piece of game.pieces) {
    if (piece.kind !== PieceKind.KING || !piece.dead) {
      continue;
    }

    if (piece.faction === GameFaction.RED) {
      game.victor = GameFaction.BLUE;
    } else {
      game.victor = GameFaction.RED;
    }
  }
}
