import {computed, makeObservable, observable} from 'mobx';
import {FC} from 'react';
import {
  CHESSBOARD_ROW_SIZE,
  GameFaction,
  IPiecePosition,
  Piece as PieceMessage,
  PieceContext,
  PieceCore,
  PiecesGrid,
  getGlobalId,
} from 'shared';

export type PiecePosition = IPiecePosition;

export interface ChessContext {
  piecesGrid: PiecesGrid;
  getPiece(piece: string): Piece;
}

export interface PieceFactionIdentity {
  displayName: string;
  Icon: FC;
}

export interface PieceIdentity {
  type: string;
  name: string;
  [GameFaction.RED]: PieceFactionIdentity;
  [GameFaction.BLUE]: PieceFactionIdentity;
  description: string;
}

export abstract class Piece {
  abstract identity: PieceIdentity;

  position!: PiecePosition;

  get globalId(): string {
    return getGlobalId(this.message);
  }

  get faction(): GameFaction {
    return this.message.faction;
  }

  get dead(): boolean {
    return this.message.dead;
  }

  get overseas(): boolean {
    let y = this.position.y;
    let edge = CHESSBOARD_ROW_SIZE / 2;

    return this.faction === GameFaction.RED ? y < edge : y >= edge;
  }

  get factionIdentity(): PieceFactionIdentity {
    return this.identity[this.faction];
  }

  get Icon(): FC {
    return this.factionIdentity.Icon;
  }

  get context(): PieceContext {
    return {
      piecesGrid: this.chessContext.piecesGrid,
      overseas: this.overseas,
      faction: this.faction,
    };
  }

  get nextPositions(): PiecePosition[] {
    let kind = this.message.kind;
    return PieceCore[kind].getNextPositions(this.position, this.context);
  }

  constructor(
    readonly message: PieceMessage,
    readonly chessContext: ChessContext,
  ) {
    this.position = this.message.position;

    makeObservable(this, {
      position: observable,
      context: computed,
      nextPositions: computed,
      overseas: computed,
    });
  }
}
