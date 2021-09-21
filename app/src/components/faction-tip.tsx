import {computed} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {GameFaction} from '../../../shared';
import {KingBlue, KingRed} from '../resources/icons';
import {IChessStore} from '../stores';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 82px 24px;
  font-size: 24px;

  > svg {
    font-size: 48px;
    margin: 0 12px;
  }
`;

@observer
export class FactionTip extends Component {
  private get chessStore(): IChessStore {
    return this.context.chessStore;
  }

  @computed
  private get currentFaction(): GameFaction {
    let {currentFaction} = this.chessStore;
    return currentFaction;
  }

  @computed
  private get gameOver(): boolean {
    let {gameOver} = this.chessStore;
    return gameOver;
  }

  render(): ReactNode {
    // let faction = this.currentFaction;
    // let gameOver = this.gameOver;

    return (
      <>
        <Wrapper>
          {/* {gameOver ? (
            <>{faction === 'red' ? <KingBlue /> : <KingRed />}胜利 !</>
          ) : (
            <>轮到{faction === 'red' ? <KingRed /> : <KingBlue />}了 !</>
          )} */}
        </Wrapper>
      </>
    );
  }

  static contextType = MobXProviderContext;
}
