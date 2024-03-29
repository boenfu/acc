import {Provider, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {CONTAINER_WIDTH} from 'shared';
import styled from 'styled-components';

import {
  ApplicationCard,
  ChessBoard,
  FactionTip,
  PieceCard,
  RoomInfo,
} from './components';
import * as stores from './stores';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    height: 100%;
  }
`;

const Left = styled.div`
  position: relative;
  max-width: 372px;
  flex: 1;
  background-color: aliceblue;
`;

const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${CONTAINER_WIDTH * 1.2}px;
  flex: 1 0;
`;

const Right = styled.div`
  flex: 1;
`;

@observer
export class App extends Component {
  render(): ReactNode {
    return (
      <Wrapper className="app">
        <Provider {...stores}>
          <Left>
            <RoomInfo />
            <ApplicationCard />
          </Left>
          <Mid>
            <FactionTip />
            <ChessBoard />
          </Mid>
          <Right>
            <PieceCard />
          </Right>
        </Provider>
      </Wrapper>
    );
  }
}
