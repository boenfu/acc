import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Github, Logo} from '../resources/icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 32px;
  }
`;

const ApplicationInfo = styled.div`
  padding: 12px;

  & + & {
    padding-top: 0;
    font-size: 0.6em;
  }
`;

const ApplicationVersion = styled.span`
  font-size: 12px;
  font-style: italic;
`;

const Links = styled.div`
  margin: 12px;

  svg {
    font-size: 24px;
    cursor: pointer;
    color: #000;
  }
`;

@observer
export class ApplicationCard extends Component<{basic?: boolean}> {
  render(): ReactNode {
    let {basic = false} = this.props;

    return (
      <Wrapper className="application-card">
        <Logo />
        <ApplicationInfo>
          Animal Chinese Chess ( Online )
          {!basic && <ApplicationVersion> V0.1.0</ApplicationVersion>}
        </ApplicationInfo>
        {!basic && (
          <>
            <ApplicationInfo>(中国象棋动物版)</ApplicationInfo>
            <Links>
              <a href="https://github.com/boenfu/acc" target="_blank">
                <Github />
              </a>
            </Links>
          </>
        )}
      </Wrapper>
    );
  }
}
