import {action, computed, makeObservable, observable} from 'mobx';

import {CHESSBOARD_COLUMN_SIZE, CHESSBOARD_ROW_SIZE} from '../const';
import {
  Cannon,
  Eleph,
  Guard,
  Horse,
  King,
  Pawn,
  Piece,
  PieceContext,
  PieceFaction,
  PieceGrid,
  PiecePosition,
  Rook,
} from '../piece';

export interface IChessStore {
  currentFaction: PieceFaction;
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
  currentFaction: PieceFaction = 'red';
  selecting: string | undefined;
  pieceMap = initializePieceMap(this);

  get pieceGrid(): PieceGrid {
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

  constructor() {
    makeObservable(this, {
      currentFaction: observable,
      selecting: observable,
      pieceMap: observable,
      pieceGrid: computed,
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

  changePieceDead = (id: string | PiecePosition, dead: boolean): void => {
    if (typeof id !== 'string') {
      id = this.pieceGrid[id.y][id.x]!;
    }

    let piece = this.pieceMap[id];

    if (!piece) {
      return;
    }

    piece.dead = dead;
  };

  changePiecePosition = (id: string, position: PiecePosition): void => {
    let piece = this.pieceMap[id];

    if (!piece) {
      return;
    }

    piece.position = position;
  };

  toggleCurrentFaction = (): void => {
    this.currentFaction = this.currentFaction === 'red' ? 'blue' : 'red';
  };

  restart = (): void => {
    this.currentFaction = 'red';
    this.selecting = undefined;
    this.pieceMap = initializePieceMap(this);
  };

  getPiece = (piece: string): Piece => {
    return this.pieceMap[piece];
  };
}

export const chessStore = new ChessStore();

function initializePieceMap(context: PieceContext): Record<string, Piece> {
  let factions: PieceFaction[] = ['red', 'blue'];

  return Object.fromEntries(
    factions
      .flatMap(faction => {
        return [
          new King({faction, id: 1}, context),
          ...Array(2)
            .fill(undefined)
            .flatMap((_val, index) =>
              [Horse, Rook, Guard, Eleph, Cannon].map(
                PieceClass => new PieceClass({faction, id: index + 1}, context),
              ),
            ),
          ...Array(5)
            .fill(undefined)
            .map((_val, index) => new Pawn({faction, id: index + 1}, context)),
        ];
      })
      .map(piece => {
        piece.initialize();

        return [piece.globalId, piece];
      }),
  );
}
