import {
  ImportOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {Button, Input, Popover, Tooltip, message} from 'antd';
import {MobXProviderContext, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {KingBlue, KingRed} from '../resources/icons';
import {IRoomStore} from '../stores';

import {SwopFaction} from './swop-faction';

const Wrapper = styled.div`
  position: absolute;
  left: 8px;
  right: 8px;
  top: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  color: #333;
  padding: 4px 8px;
  border-radius: 2px;
  box-shadow: 0 0 8px #ddd;
  background-color: #fff;

  button {
    font-size: 12px;
  }

  .ant-tooltip-inner {
    font-size: 12px;
  }
`;

const Head = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Menus = styled.div``;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Players = styled.div`
  flex: 1;
  display: flex;

  > div {
    max-width: 33%;
  }
`;

const Player = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @keyframes head-swop {
    0% {
      transform: rotate(0);
    }

    50% {
      transform: rotate(-20deg);
    }

    70% {
      transform: rotate(20deg);
    }

    100% {
      transform: rotate(0);
    }
  }

  svg {
    font-size: 24px;

    &:hover {
      animation: head-swop 1s infinite alternate;
    }
  }
`;

const PlayerName = styled.div`
  text-align: center;
  overflow: hidden;
`;

const SwopFactionWrapper = styled.div`
  flex: 1 0;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  button {
    box-sizing: border-box;
    font-size: 12px;
    white-space: pre-wrap;
    padding: 0.2em 0.4em;
    height: unset !important;
  }

  button + button {
    margin-top: 6px;
  }
`;

@observer
export class RoomInfo extends Component {
  private get roomStore(): IRoomStore {
    return this.context.roomStore;
  }

  render(): ReactNode {
    let {room, isRed, isBlue} = this.roomStore;

    if (!room) {
      return <></>;
    }

    let {id, redPlayer, bluePlayer} = room;

    return (
      <Wrapper>
        <Head>
          房间号#{id}
          <Menus>
            <Popover
              placement="bottom"
              title="输入 6 位房间号 (#`O′)"
              content={
                <div>
                  <Input
                    size="small"
                    maxLength={6}
                    autoFocus
                    onPressEnter={event => {
                      void this.roomStore.joinRoom(
                        (event.target as HTMLInputElement).value,
                      );
                    }}
                  />
                </div>
              }
              trigger="click"
              destroyTooltipOnHide
            >
              <Tooltip title="搜索房间号">
                <Button size="small">
                  <SearchOutlined />
                </Button>
              </Tooltip>
            </Popover>
            <Tooltip title="邀请好友">
              <Button
                size="small"
                onClick={() => {
                  void navigator.clipboard
                    .writeText(location.href)
                    .then(() => message.success('链接已复制'));
                }}
              >
                <UsergroupAddOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="退出当前房间">
              <Button
                size="small"
                onClick={() => {
                  this.roomStore.exitRoom();
                  void message.success('房间已退出');
                }}
              >
                <ImportOutlined />
              </Button>
            </Tooltip>
          </Menus>
        </Head>
        <Content>
          <Players>
            <Player>
              <KingRed />
              <PlayerName>
                {isRed
                  ? `${redPlayer?.displayName}（你）`
                  : redPlayer?.displayName ?? '暂无'}
              </PlayerName>
            </Player>
            <SwopFactionWrapper>
              <SwopFaction />
            </SwopFactionWrapper>
            <Player>
              <KingBlue />
              <PlayerName>
                {isBlue
                  ? `${bluePlayer?.displayName}（你）`
                  : bluePlayer?.displayName ?? '暂无'}
              </PlayerName>
            </Player>
          </Players>
        </Content>
      </Wrapper>
    );
  }

  static contextType = MobXProviderContext;
}
