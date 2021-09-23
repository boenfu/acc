import {action, autorun, computed, makeObservable, observable} from 'mobx';

import {
  CHESSBOARD_COLUMN_SIZE,
  CHESSBOARD_ROW_SIZE,
  GameFaction,
  PiecesGrid,
  Room,
} from '../../../shared';
import {
  ChessContext,
  Piece,
  PieceKindToConstructorDict,
  PiecePosition,
} from '../piece';

import {IRoomStore, roomStore} from './room';

export interface IChessStore {
  myTum: boolean;
  selecting: string | undefined;
  competitorSelecting: string | undefined;
  pieceMap: Record<string, Piece>;

  restart(): void;
  changeSelectingPiece(piece: Piece | undefined): void;
  changePiecePosition(id: string, position: PiecePosition): void;
}

class ChessStore implements IChessStore {
  selecting: string | undefined;
  competitorSelecting: string | undefined;
  myTum = false;

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

  constructor(readonly roomStore: IRoomStore) {
    makeObservable(this, {
      myTum: observable,
      selecting: observable,
      pieceMap: computed,
      piecesGrid: computed,
      restart: action,
    });

    autorun(() => {
      let {room, isRed, isBlue} = this.roomStore;
      let game = room?.game;

      if (!game) {
        return;
      }

      let {redSelectingPiece, blueSelectingPiece} = game;

      if (isRed) {
        this.selecting = redSelectingPiece;
        this.competitorSelecting = blueSelectingPiece;
      } else {
        this.selecting = blueSelectingPiece;
        this.competitorSelecting = redSelectingPiece;
      }

      this.myTum =
        (game.currentFaction === GameFaction.RED && isRed) ||
        (game.currentFaction === GameFaction.BLUE && isBlue);
    });
  }

  changeSelectingPiece = (piece: Piece | undefined): void => {
    if (piece) {
      if (this.roomStore.isRed) {
        if (piece.faction !== GameFaction.RED) {
          return;
        }
      } else {
        if (piece.faction !== GameFaction.BLUE) {
          return;
        }
      }

      this.selecting = piece.globalId;
    } else {
      this.selecting = undefined;
    }

    void this.roomStore.api.changeSelectingPiece(piece?.globalId);
  };

  changePiecePosition = (id: string, position: PiecePosition): void => {
    let piece = this.pieceMap[id];

    if (!piece) {
      return;
    }

    piece.position = position;
    void this.roomStore.api.changePiecePosition(position);
  };

  restart = (): void => {
    void this.roomStore.api.startGame();
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
    room?.game?.pieces.map(piece => {
      let instance = new (PieceKindToConstructorDict[
        piece.kind
      ] as unknown as any)(piece, context);

      return [instance.globalId, instance];
    }) ?? [],
  );
}
