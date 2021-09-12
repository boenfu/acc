import {computed} from 'mobx';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Piece} from '../piece';
import {IChessStore} from '../stores';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 80%;
  padding: 48px;

  > svg {
    font-size: 128px;
  }

  h2 {
    font-weight: 900;
  }

  p {
    margin-top: 24px;
    padding: 16px 24px;
    line-height: 24px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

@observer
export class PieceCard extends Component {
  private get chessStore(): IChessStore {
    return this.context.chessStore;
  }

  @computed
  private get piece(): Piece | undefined {
    let {selecting, pieceMap} = this.chessStore;
    return selecting ? pieceMap[selecting] : undefined;
  }

  render(): ReactNode {
    if (!this.piece) {
      return <></>;
    }

    let {
      Icon,
      factionIdentity,
      identity: {name, description},
    } = this.piece;

    return (
      <>
        <Wrapper>
          <Icon />
          <h2>{`${name}（代号: ${factionIdentity.displayName}）`}</h2>
          <p>{description}</p>
        </Wrapper>
      </>
    );
  }

  static contextType = MobXProviderContext;
}
