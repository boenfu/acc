import {computed} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {GameFaction} from 'shared';
import styled from 'styled-components';

import {IChessStore, IRoomStore} from '../stores';

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
  private get roomStore(): IRoomStore {
    return this.context.roomStore;
  }

  private get chessStore(): IChessStore {
    return this.context.chessStore;
  }

  @computed
  private get myTum(): boolean {
    let {myTum} = this.chessStore;
    return myTum;
  }

  @computed
  private get victor(): GameFaction | undefined {
    let {room} = this.roomStore;
    return room?.game?.victor;
  }

  render(): ReactNode {
    let myTum = this.myTum;

    let victor = this.victor;

    return (
      <>
        <Wrapper>
          {victor ? (
            <>对局结束</>
          ) : myTum ? (
            <>轮到你了 !</>
          ) : (
            <>等待对方行棋 !</>
          )}
        </Wrapper>
      </>
    );
  }

  static contextType = MobXProviderContext;
}
