import {computed, makeObservable} from 'mobx';
import {FC} from 'react';

import {
  GameFaction,
  IPiecePosition,
  Piece as PieceMessage,
  PieceContext,
  PieceCore,
  PiecesGrid,
} from '../../../shared';
import {CHESSBOARD_ROW_SIZE} from '../const';

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

  get globalId(): string {
    return getGlobalId(this.message);
  }

  get faction(): GameFaction {
    return this.message.faction;
  }

  get position(): PiecePosition {
    return this.message.position;
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
    makeObservable(this, {
      context: computed,
      nextPositions: computed,
      overseas: computed,
    });
  }
}

export function getGlobalId({faction, kind, id}: PieceMessage): string {
  return `${faction}_${kind}_${id}`;
}
