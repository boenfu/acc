import React, { useRef, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvasDom: HTMLCanvasElement = canvasRef.current!;
    let context = initChessboard(canvasDom);

    // 初始化完返回的 context
    console.log(context);
  });

  return (
    <div className="App">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default App;

function initChessboard(
  canvasDom: HTMLCanvasElement
): CanvasRenderingContext2D {
  let context = canvasDom.getContext("2d")!;

  let itemSize = 40;
  let padding = 20;

  let width = itemSize * 8;
  let height = itemSize * 9;

  canvasDom.setAttribute("width", String(width + padding * 2));
  canvasDom.setAttribute("height", String(height + padding * 2));

  // 画 竖线
  for (let index = 0; index <= 8; index++) {
    let x = padding + index * itemSize;
    context.moveTo(x, padding);
    context.lineTo(x, padding + height);
  }

  // 画 横线
  for (let index = 0; index <= 9; index++) {
    let y = padding + index * itemSize;
    context.moveTo(padding, y);
    context.lineTo(padding + width, y);
  }

  for (let startY of [0, 7]) {
    // 画 \ 线
    context.moveTo(padding + itemSize * 3, padding + itemSize * startY);
    context.lineTo(padding + itemSize * 5, padding + itemSize * (startY + 2));

    // 画 / 线
    context.moveTo(padding + itemSize * 5, padding + itemSize * startY);
    context.lineTo(padding + itemSize * 3, padding + itemSize * (startY + 2));
  }

  context.stroke();

  // +1 -2 之类的操作 是为了不把边缘的线也清除了
  context.clearRect(
    padding + 1,
    padding + itemSize * 4 + 1,
    width - 2,
    itemSize - 2
  );

  return context;
}
