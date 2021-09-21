import {computed} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';

import {
  CHESSBOARD_COLUMN_SIZE,
  CHESSBOARD_ROW_SIZE,
  CONTAINER_PADDING,
  GRID_SIZE,
  PIECE_RADIUS,
} from '../const';
import {Piece, PiecePosition} from '../piece';
import {Aim, Attack} from '../resources/icons';
import {IChessStore} from '../stores';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  font-size: ${PIECE_RADIUS * 2}px;
  transition: transform 0.2s ease-out;

  &.dead {
    @keyframes piece-dead {
      0% {
        z-index: 2;
        filter: grayscale(2);
        opacity: 1;
      }

      70% {
        filter: grayscale(2);
      }

      100% {
        opacity: 0;
      }
    }

    pointer-events: none;
    animation: piece-dead 1.2s ease-in forwards;
  }
`;

const AimWrapper = styled(Wrapper)`
  width: ${PIECE_RADIUS * 1.6}px;
  height: ${PIECE_RADIUS * 1.6}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #96c24e;
  background-color: #fff;
  border-radius: 50%;
  font-size: ${PIECE_RADIUS * 1.4}px;
  z-index: 1;

  * {
    pointer-events: none;
  }
`;

const AttackWrapper = styled(Wrapper)`
  width: ${PIECE_RADIUS * 2}px;
  height: ${PIECE_RADIUS * 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: rgba(192, 44, 56, 0.5);
  border-radius: 50%;
  font-size: ${PIECE_RADIUS}px;
  z-index: 1;

  * {
    pointer-events: none;
  }
`;

@observer
export class PieceComponent extends Component<{
  piece: Piece;
}> {
  private get chessStore(): IChessStore {
    return this.context.chessStore;
  }

  @computed
  private get piece(): Piece {
    return this.props.piece;
  }

  @computed
  private get active(): boolean {
    return this.chessStore.selecting === this.props.piece.globalId;
  }

  render(): ReactNode {
    let {position, dead, Icon} = this.piece;
    let {left, top} = getTranslateStyle(position);

    let {moveable, attackable} = this.active
      ? groupPositions(this.piece)
      : {
          moveable: [],
          attackable: [],
        };

    return (
      <>
        <Wrapper
          className={dead ? 'dead' : undefined}
          style={{
            transform: `translate(calc(${left}px - 50%), calc(${top}px - 50%)) ${
              this.active ? 'scale(1.4)' : ''
            }`,
          }}
          onClick={this.onSelect}
        >
          <Icon />
        </Wrapper>
        {moveable.map((position, index) => {
          let {left, top} = getTranslateStyle(position);

          return (
            <AimWrapper
              key={index}
              data-grid={`${position.x},${position.y}`}
              style={{
                transform: `translate(calc(${left}px - 50%), calc(${top}px - 50%))`,
              }}
              onClick={this.onMove}
            >
              <Aim />
            </AimWrapper>
          );
        })}
        {attackable.map((position, index) => {
          let {left, top} = getTranslateStyle(position);

          return (
            <AttackWrapper
              key={index}
              data-grid={`${position.x},${position.y}`}
              style={{
                transform: `translate(calc(${left}px - 50%), calc(${top}px - 50%))`,
              }}
              onClick={this.onAttack}
            >
              <Attack />
            </AttackWrapper>
          );
        })}
      </>
    );
  }

  private onSelect = (): void => {
    this.chessStore.changeSelectingPiece(this.active ? undefined : this.piece);
  };

  private onMove = (event: MouseEvent<HTMLDivElement>): void => {
    let [x, y] = (event.target as HTMLElement).dataset.grid!.split(',');

    this.chessStore.changePiecePosition(this.piece.globalId, {x: +x, y: +y});
    this.chessStore.changeSelectingPiece(undefined);
    this.chessStore.toggleCurrentFaction();
  };

  private onAttack = (event: MouseEvent<HTMLDivElement>): void => {
    let [x, y] = (event.target as HTMLElement).dataset.grid!.split(',');

    let position = {x: +x, y: +y};
    this.chessStore.changePieceDead(position, true);
    this.chessStore.changePiecePosition(this.piece.globalId, position);
    this.chessStore.changeSelectingPiece(undefined);
    this.chessStore.toggleCurrentFaction();
  };

  static contextType = MobXProviderContext;
}

function getTranslateStyle({x, y}: PiecePosition): {
  left: number;
  top: number;
} {
  return {
    left: x * GRID_SIZE + CONTAINER_PADDING,
    top: y * GRID_SIZE + CONTAINER_PADDING,
  };
}

function groupPositions(piece: Piece): {
  moveable: PiecePosition[];
  attackable: PiecePosition[];
} {
  let {
    faction,
    nextPositions,
    chessContext: {piecesGrid, getPiece},
  } = piece;

  let moveable: PiecePosition[] = [];
  let attackable: PiecePosition[] = [];

  for (let {x, y} of nextPositions) {
    if (
      x < 0 ||
      x > CHESSBOARD_COLUMN_SIZE - 1 ||
      y < 0 ||
      y > CHESSBOARD_ROW_SIZE - 1
    ) {
      continue;
    }

    if (piecesGrid[y][x]) {
      if (faction !== getPiece(piecesGrid[y][x]!).faction) {
        attackable.push({x, y});
      } else {
        // 合体 ?
      }
    } else {
      moveable.push({x, y});
    }
  }

  return {
    moveable,
    attackable,
  };
}
