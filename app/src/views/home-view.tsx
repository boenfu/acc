import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {ChessBoard, FactionTip} from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

@observer
export class HomeView extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <FactionTip />
        <ChessBoard />
      </Wrapper>
    );
  }

  static contextType = MobXProviderContext;
}
