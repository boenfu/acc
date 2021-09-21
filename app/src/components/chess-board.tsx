import {Button} from 'antd';
import {computed} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, MouseEvent, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {
  CHESSBOARD_HEIGHT,
  CHESSBOARD_WIDTH,
  CONTAINER_HEIGHT,
  CONTAINER_PADDING,
  CONTAINER_WIDTH,
  GRID_SIZE,
  PIECE_RADIUS,
} from '../const';
import * as stores from '../stores';
import {IChessStore, IRoomStore} from '../stores';

import {PieceComponent} from './piece';

const ChessWrapper = styled.div`
  @keyframes container-mounted {
    from {
      transform: translateY(20%) scale(0.4);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  width: ${CONTAINER_WIDTH}px;
  height: ${CONTAINER_HEIGHT}px;
  position: relative;
  box-shadow: -2px 2px 12px #ccc;
  animation: container-mounted 0.4s ease-in;
  transform: scale(1.2);

  &.gameOver {
    pointer-events: none;

    svg {
      transition: all 2s ease-out;
      filter: grayscale(1);
    }
  }
`;

const Restart = styled.div`
  @keyframes restart-enter {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  padding: 4px 12px;
  color: #5d51e4;
  border: 1px solid #5d51e4;
  background-color: transparent;
  border-radius: 2px;
  pointer-events: all;
  cursor: pointer;

  animation: restart-enter 1s ease-in;
`;

@observer
export class ChessBoard extends Component {
  private get roomStore(): IRoomStore {
    return this.context.roomStore;
  }

  private get chessStore(): IChessStore {
    return this.context.chessStore;
  }

  private canvasRef = createRef<HTMLCanvasElement>();

  @computed
  private get gameOver(): boolean {
    let {gameOver} = this.chessStore;
    return gameOver;
  }

  componentDidMount(): void {
    initChessboard(this.canvasRef.current!);
  }

  render(): ReactNode {
    let gameOver = this.gameOver;
    let {room, api} = this.roomStore;

    console.log(room?.game);

    return (
      <ChessWrapper className={this.gameOver ? 'gameOver' : undefined}>
        <canvas ref={this.canvasRef} onClick={this.onCanvasClick} />
        {!room?.game ? (
          <Button onClick={() => api.startGame()}>开始对局</Button>
        ) : (
          Object.entries(stores.chessStore.pieceMap).map(([id, piece]) => (
            <PieceComponent key={id} piece={piece} />
          ))
        )}
        {gameOver ? (
          <Restart onClick={this.chessStore.restart}>再来一局</Restart>
        ) : undefined}
      </ChessWrapper>
    );
  }

  private onCanvasClick = ({
    nativeEvent: {offsetX, offsetY},
  }: MouseEvent<HTMLCanvasElement>): [x: number, y: number] | undefined => {
    let x = offsetX - CONTAINER_PADDING;
    let y = offsetY - CONTAINER_PADDING;

    let xIndex = Math.round(x / GRID_SIZE);
    let yIndex = Math.round(y / GRID_SIZE);

    if (
      Math.abs(x - GRID_SIZE * xIndex) > PIECE_RADIUS ||
      Math.abs(y - GRID_SIZE * yIndex) > PIECE_RADIUS
    ) {
      stores.chessStore.changeSelectingPiece(undefined);
      return;
    }

    console.info(xIndex, yIndex);
    stores.chessStore.changeSelectingPiece(undefined);
  };

  static contextType = MobXProviderContext;
}

/**
 * 初始化棋盘
 * @param canvasDom
 */
function initChessboard(
  canvasDom: HTMLCanvasElement,
): CanvasRenderingContext2D {
  let context = canvasDom.getContext('2d')!;

  canvasDom.style.width = `${CONTAINER_WIDTH}px`;
  canvasDom.style.height = `${CONTAINER_HEIGHT}px`;

  let ratio = window.devicePixelRatio;

  canvasDom.width = CONTAINER_WIDTH * ratio;
  canvasDom.height = CONTAINER_HEIGHT * ratio;

  context.scale(ratio, ratio);

  context.strokeStyle = '#999';

  // 画 竖线
  for (let index = 0; index <= 8; index++) {
    let x = CONTAINER_PADDING + index * GRID_SIZE;
    context.moveTo(x, CONTAINER_PADDING);
    context.lineTo(x, CONTAINER_PADDING + CHESSBOARD_HEIGHT);
  }

  // 画 横线
  for (let index = 0; index <= 9; index++) {
    let y = CONTAINER_PADDING + index * GRID_SIZE;
    context.moveTo(CONTAINER_PADDING, y);
    context.lineTo(CONTAINER_PADDING + CHESSBOARD_WIDTH, y);
  }

  for (let startY of [0, 7]) {
    // 画 \ 线
    context.moveTo(
      CONTAINER_PADDING + GRID_SIZE * 3,
      CONTAINER_PADDING + GRID_SIZE * startY,
    );
    context.lineTo(
      CONTAINER_PADDING + GRID_SIZE * 5,
      CONTAINER_PADDING + GRID_SIZE * (startY + 2),
    );

    // 画 / 线
    context.moveTo(
      CONTAINER_PADDING + GRID_SIZE * 5,
      CONTAINER_PADDING + GRID_SIZE * startY,
    );
    context.lineTo(
      CONTAINER_PADDING + GRID_SIZE * 3,
      CONTAINER_PADDING + GRID_SIZE * (startY + 2),
    );
  }

  context.stroke();

  // +1 -2 之类的操作 是为了不把边缘的线也清除了
  context.clearRect(
    CONTAINER_PADDING + 1,
    CONTAINER_PADDING + GRID_SIZE * 4 + 1,
    CHESSBOARD_WIDTH - 2,
    GRID_SIZE - 2,
  );

  return context;
}
