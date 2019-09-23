import React, { useRef, useEffect } from "react";
import "./App.css";

import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  CONTAINER_PADDING,
  CHESSBOARD_HEIGHT,
  CHESSBOARD_WIDTH,
  GRID_SIZE,
  PIECE_PADDING,
  PIECE_RADIUS,
} from "./constant";

const App: React.FC = () => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvasDom: HTMLCanvasElement = canvasRef.current!;
    let context = initChessboard(canvasDom);

    addEvent(canvasDom);

    drawPiece(context);
  });

  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;

/**
 * 初始化棋盘
 * @param canvasDom
 */
function initChessboard(
  canvasDom: HTMLCanvasElement
): CanvasRenderingContext2D {
  let context = canvasDom.getContext("2d")!;

  canvasDom.style.width = `${CONTAINER_WIDTH}px`;
  canvasDom.style.height = `${CONTAINER_HEIGHT}px`;

  let ratio = window.devicePixelRatio;

  canvasDom.width = CONTAINER_WIDTH * ratio;
  canvasDom.height = CONTAINER_HEIGHT * ratio;

  context.scale(ratio, ratio);

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
      CONTAINER_PADDING + GRID_SIZE * startY
    );
    context.lineTo(
      CONTAINER_PADDING + GRID_SIZE * 5,
      CONTAINER_PADDING + GRID_SIZE * (startY + 2)
    );

    // 画 / 线
    context.moveTo(
      CONTAINER_PADDING + GRID_SIZE * 5,
      CONTAINER_PADDING + GRID_SIZE * startY
    );
    context.lineTo(
      CONTAINER_PADDING + GRID_SIZE * 3,
      CONTAINER_PADDING + GRID_SIZE * (startY + 2)
    );
  }

  context.stroke();

  // +1 -2 之类的操作 是为了不把边缘的线也清除了
  context.clearRect(
    CONTAINER_PADDING + 1,
    CONTAINER_PADDING + GRID_SIZE * 4 + 1,
    CONTAINER_WIDTH - 2,
    GRID_SIZE - 2
  );

  return context;
}

/**
 * 初始化事件
 * @param context
 */
function addEvent(canvasDom: HTMLCanvasElement): void {
  canvasDom.addEventListener("click", ({ offsetX, offsetY }: MouseEvent) => {
    let x = offsetX - CONTAINER_PADDING;
    let y = offsetY - CONTAINER_PADDING;

    let xIndex = Math.round(x / GRID_SIZE);
    let yIndex = Math.round(y / GRID_SIZE);

    if (
      Math.abs(x - GRID_SIZE * xIndex) > PIECE_RADIUS ||
      Math.abs(y - GRID_SIZE * yIndex) > PIECE_RADIUS
    ) {
      return;
    }

    console.log(xIndex, yIndex);
  });
}

/**
 * 画棋子
 * @param context
 */
function drawPiece(context: CanvasRenderingContext2D): void {
  context.beginPath();
  context.strokeStyle = "#000";
  context.arc(20, 20, PIECE_RADIUS, 0, Math.PI * 2);
  context.stroke();

  context.beginPath();
  context.fillStyle = "#fff";
  context.arc(20, 20, PIECE_RADIUS - 1, 0, Math.PI * 2);
  context.fill();

  context.beginPath();
  context.arc(20, 20, PIECE_RADIUS - PIECE_PADDING, 0, Math.PI * 2);
  context.stroke();

  context.font = "18px STheiti, SimHei";
  context.fillStyle = "#000";

  context.fillText("馬", 11.5, 26);
}
