import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {Crown, Logo, LogoLegend, Magic} from '../resources/icons';

const Wrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  box-sizing: border-box;

  .lottery-card {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120px;
    height: 160px;
    box-shadow: 0 0 4px #999;
    transform: translate(-50%, -50%);
    transition: left 0.4s ease-out, top 0.4s ease-out;
    background-color: #fff;
    transform-style: preserve-3d;
    border-radius: 4px;
    overflow: hidden;
    color: #333;
  }

  .lottery-card-front {
    width: 100%;
    height: 100%;
    padding: 4px;
  }

  .lottery-card-back {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 1s linear;
    transform-style: preserve-3d;
    border: 4px solid #fff;
    box-shadow: 0 0 -4px #333;
    font-size: 40px;
    background-color: #5d51e4;
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M762 512L512 912 262 512l250-400z" fill="black" fill-opacity="0.05"></path></svg>');
    background-size: 24px;

    &.legend {
      background-color: #f39369;

      .crown {
        font-size: 0.8em;
        margin-bottom: -14px;
        z-index: 1;
      }
    }
  }
`;

type LotteryCardQuality = 'normal' | 'epic' | 'legend';

export interface ILotteryCard {
  quality: LotteryCardQuality;
}

export interface LotteryProps {
  /**
   * 单抽模式
   * @default false
   */
  single?: boolean;
}

@observer
export class Lottery extends Component<LotteryProps> {
  private wrapperRef = createRef<HTMLDivElement>();

  _state: {
    wrapperRect: DOMRect | undefined;
  } = observable({
    wrapperRect: undefined,
  });

  componentDidMount(): void {
    let {width, height, ...rect} =
      this.wrapperRef.current!.getBoundingClientRect();

    this._state.wrapperRect = {
      width,
      height,
      ...rect,
    };
  }

  render(): ReactNode {
    let wrapperRef = this.wrapperRef;
    let {wrapperRect} = this._state;
    let arr = Array(10).fill(undefined);

    return (
      <Wrapper className="lottery-wrapper" ref={wrapperRef}>
        {arr.map((_, index) => {
          return (
            <div
              key={index}
              className="lottery-card"
              style={{
                ...(wrapperRect ? getPosition(wrapperRect, index) : {}),
                transitionDelay: `${index * 200}ms`,
              }}
            >
              {index === 3 ? (
                <div className="lottery-card-front">
                  <h2>一鼓作气</h2>
                  <p>增加我方一枚棋子一回合充能</p>
                  <div>
                    <Magic />
                  </div>
                </div>
              ) : (
                <div className="lottery-card-back">
                  <Logo />
                </div>
              )}
            </div>
          );
        })}
        <div className="lottery-card">
          <div className="lottery-card-back legend">
            <Crown className="crown" />
            <LogoLegend />
          </div>
        </div>
      </Wrapper>
    );
  }
}

function getPosition(
  {width, height}: DOMRect,
  index: number,
  padding = 0,
): {
  left: number;
  top: number;
} {
  width -= padding * 2;
  height -= padding * 2;

  let center = {x: width / 2 + padding, y: height / 2 + padding};
  let radius = Math.min(width, height) / 2;

  let radian = ((Math.PI * 2) / 360) * (index * 36 + 18);

  return {
    left: center.x + Math.sin(radian) * radius,
    top: center.y - Math.cos(radian) * radius,
  };
}
