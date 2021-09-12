import {Provider, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {ApplicationCard, ChessBoard, FactionTip, PieceCard} from './components';
import {CONTAINER_WIDTH} from './const';
import * as stores from './stores';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > div {
    height: 100%;
  }
`;

const Left = styled.div`
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
export default class extends Component {
  render(): ReactNode {
    return (
      <Wrapper className="app">
        <Provider {...stores}>
          <Left>
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
