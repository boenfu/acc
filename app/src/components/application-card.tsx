import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {Github, Logo} from '../resources/icons';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 82px;
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

const TODOList = styled.ul`
  padding: 24px 64px 24px 24px;
  border-radius: 2px;
  font-size: 12px;
  line-height: 20px;
  color: #444;
`;

const TODO = styled.li``;

@observer
export class ApplicationCard extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <Logo />
        <ApplicationInfo>
          Animal Chinese Chess
          <ApplicationVersion> V0.1.0</ApplicationVersion>
        </ApplicationInfo>
        <ApplicationInfo>(中国象棋动物版)</ApplicationInfo>
        <Links>
          <a href="https://github.com/boenfu/acc" target="_blank">
            <Github />
          </a>
        </Links>
        <TODOList>
          <TODO
            style={{
              textDecoration: 'line-through',
              opacity: 0.5,
            }}
          >
            基本的行棋规则
          </TODO>
          <TODO>动物合体机制</TODO>
          <TODO>用户魔法卡</TODO>
          <TODO>通过网络对战</TODO>
        </TODOList>
      </Wrapper>
    );
  }
}
