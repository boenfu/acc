import {action, computed, makeObservable, observable} from 'mobx';

import {GameFaction, PiecesGrid, Room} from '../../../shared';
import {CHESSBOARD_COLUMN_SIZE, CHESSBOARD_ROW_SIZE} from '../const';
import {
  ChessContext,
  Piece,
  PieceKindToConstructorDict,
  PiecePosition,
} from '../piece';

import {IRoomStore, roomStore} from './room';

export interface IChessStore {
  currentFaction: GameFaction;
  selecting: string | undefined;
  pieceMap: Record<string, Piece>;
  gameOver: boolean;

  restart(): void;
  toggleCurrentFaction(): void;
  changeSelectingPiece(piece: Piece | undefined): void;
  changePieceDead(id: string | PiecePosition, dead: boolean): void;
  changePiecePosition(id: string, position: PiecePosition): void;
}

class ChessStore implements IChessStore {
  currentFaction: GameFaction = GameFaction.RED;
  selecting: string | undefined;

  get pieceMap(): Record<string, Piece> {
    return buildPiecesMap(this.roomStore.room!, this);
  }

  get piecesGrid(): PiecesGrid {
    let pieceMap = this.pieceMap || {};
    let grid = Array(CHESSBOARD_ROW_SIZE)
      .fill(undefined)
      .map(() => Array(CHESSBOARD_COLUMN_SIZE));

    for (let piece of Object.values(pieceMap)) {
      if (piece.dead) {
        continue;
      }

      grid[piece.position.y][piece.position.x] = piece.globalId;
    }

    return grid;
  }

  get gameOver(): boolean {
    let pieceMap = this.pieceMap;
    return pieceMap['red_king_1']?.dead || pieceMap['blue_king_1']?.dead;
  }

  constructor(readonly roomStore: IRoomStore) {
    makeObservable(this, {
      currentFaction: observable,
      selecting: observable,
      pieceMap: computed,
      piecesGrid: computed,
      gameOver: computed,

      restart: action,
      toggleCurrentFaction: action,
      changeSelectingPiece: action,
      changePiecePosition: action,
      changePieceDead: action,
    });
  }

  changeSelectingPiece = (piece: Piece | undefined): void => {
    if (piece) {
      if (piece.faction !== this.currentFaction) {
        return;
      }

      this.selecting = piece.globalId;
    } else {
      this.selecting = undefined;
    }
  };

  changePieceDead = (id: string | PiecePosition, _dead: boolean): void => {
    if (typeof id !== 'string') {
      id = this.piecesGrid[id.y][id.x]!;
    }

    let piece = this.pieceMap[id];

    if (!piece) {
      return;
    }

    // piece.dead = dead;
  };

  changePiecePosition = (id: string, _position: PiecePosition): void => {
    let piece = this.pieceMap[id];

    if (!piece) {
      return;
    }

    // piece.position = position;
  };

  toggleCurrentFaction = (): void => {
    this.currentFaction =
      this.currentFaction === GameFaction.RED
        ? GameFaction.BLUE
        : GameFaction.RED;
  };

  restart = (): void => {
    this.currentFaction = GameFaction.RED;
    this.selecting = undefined;
  };

  getPiece = (piece: string): Piece => {
    return this.pieceMap[piece];
  };
}

export const chessStore = new ChessStore(roomStore);

function buildPiecesMap(
  room: Room,
  context: ChessContext,
): Record<string, Piece> {
  return Object.fromEntries(
    [
      ...(room?.game?.redPieces.map(
        piece =>
          new (PieceKindToConstructorDict[piece.kind] as unknown as any)(
            GameFaction.RED,
            piece,
            context,
          ),
      ) ?? []),
      ...(room?.game?.bluePieces.map(
        piece =>
          new (PieceKindToConstructorDict[piece.kind] as unknown as any)(
            GameFaction.BLUE,
            piece,
            context,
          ),
      ) ?? []),
    ].map(piece => {
      return [piece.globalId, piece];
    }),
  );
}
