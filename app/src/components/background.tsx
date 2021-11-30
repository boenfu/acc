import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  font-size: 12px;
  background-image: linear-gradient(
    -10deg,
    #ffe985cc 10%,
    #fa742bcc 95%,
    #fff 0%
  );
  z-index: -1;

  li {
    position: absolute;
    bottom: -160px;
    width: 2em;
    height: 2em;
    background-color: rgba(255, 255, 255, 0.15);
    list-style: none;
    animation: bg-animate 15s infinite;
    transition-timing-function: linear;
    border-radius: 50%;

    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 4em;
      height: 4em;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 2.4em;
      height: 2.4em;
      animation-duration: 8s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 3.2em;
      height: 3.2em;
      animation-delay: 3s;
      background-color: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(7) {
      left: 32%;
      width: 2.8em;
      height: 2.8em;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 1.6em;
      height: 1.6em;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 1em;
      height: 1em;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(10) {
      left: 85%;
      width: 4em;
      height: 4em;
      animation-delay: 5s;
    }
  }

  @keyframes bg-animate {
    0% {
      opacity: 0.5;
      transform: translateY(0px);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px);
    }
    50% {
      opacity: 1;
      transform: translateY(-600px);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px);
    }
  }
`;

@observer
export class Background extends Component {
  render(): ReactNode {
    return (
      <Wrapper className="bg-bubbles">
        {Array(10)
          .fill(undefined)
          .map((_, index) => (
            <li key={index} />
          ))}
      </Wrapper>
    );
  }
}
