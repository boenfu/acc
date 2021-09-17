import {action, computed, makeObservable, observable} from 'mobx';
import {FC} from 'react';

import {CHESSBOARD_ROW_SIZE} from '../const';

export type PieceFaction = 'red' | 'blue';

export interface PieceOptions {
  faction: PieceFaction;
  id: number;
}

export interface PiecePosition {
  x: number;
  y: number;
}

export type PieceGrid = (string | undefined)[][];

export interface PieceContext {
  pieceGrid: PieceGrid;
  getPiece(piece: string): Piece;
}

export interface PieceFactionIdentity {
  displayName: string;
  Icon: FC;
  initializePosition(id?: number): PiecePosition;
}

export interface PieceIdentity {
  type: string;
  name: string;
  red: PieceFactionIdentity;
  blue: PieceFactionIdentity;
  description: string;
}

export abstract class Piece {
  abstract identity: PieceIdentity;

  abstract get nextPositions(): PiecePosition[];

  globalId!: string;

  position!: PiecePosition;

  dead = false;

  get faction(): PieceFaction {
    return this.options.faction;
  }

  get overseas(): boolean {
    let y = this.position.y;
    let edge = CHESSBOARD_ROW_SIZE / 2;

    return this.faction === 'red' ? y < edge : y >= edge;
  }

  get factionIdentity(): PieceFactionIdentity {
    return this.identity[this.faction];
  }

  get Icon(): FC {
    return this.factionIdentity.Icon;
  }

  constructor(readonly options: PieceOptions, readonly context: PieceContext) {
    makeObservable(this, {
      position: observable,
      dead: observable,
      nextPositions: computed,
      overseas: computed,
      initialize: action,
    });
  }

  initialize(): void {
    let {faction, id} = this.options;

    this.position = this.identity[faction].initializePosition(id);
    this.globalId = `${faction}_${this.identity.type}_${id}`;
  }
}
