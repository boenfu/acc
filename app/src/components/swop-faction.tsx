import {Button, Tooltip, message} from 'antd';
import {reaction} from 'mobx';
import {MobXProviderContext, disposeOnUnmount, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {RequestStatus} from '../../../shared';
import {IRoomStore} from '../stores';

@observer
export class SwopFaction extends Component {
  private get roomStore(): IRoomStore {
    return this.context.roomStore;
  }

  componentDidMount(): void {
    disposeOnUnmount(
      this,
      reaction(
        () => this.roomStore.room?.swopFaction,
        () => {
          let {room, isRed, isBlue} = this.roomStore;

          if (!room) {
            return;
          }

          let {swopFaction} = room;

          if (swopFaction >= RequestStatus.NONE) {
            return;
          }

          if (
            (isRed && swopFaction === RequestStatus.BLUE_REFUSED) ||
            (isBlue && swopFaction === RequestStatus.RED_REFUSED)
          ) {
            void message.warn('阵营交换被拒绝');
          }
        },
      ),
    );
  }

  render(): ReactNode {
    let {room, isBlue, isRed, api} = this.roomStore;

    if (!room) {
      return <></>;
    }

    let {swopFaction} = room;

    if (swopFaction > RequestStatus.NONE) {
      if (
        (isRed && swopFaction === RequestStatus.BLUE_REQUESTING) ||
        (isBlue && swopFaction === RequestStatus.RED_REQUESTING)
      ) {
        return (
          <>
            <Button type="primary" onClick={() => api.swopFaction()}>
              同意
            </Button>
            <Tooltip
              placement="bottom"
              title="对方正在申请交换阵营"
              color="cyan"
              visible
            >
              <Button onClick={() => api.refuseSwopFaction()}>拒绝</Button>
            </Tooltip>
          </>
        );
      } else {
        return (
          <Tooltip
            placement="bottom"
            title="正在申请交换阵营"
            color="volcano"
            visible
          >
            <Button onClick={() => api.refuseSwopFaction()}>取消</Button>
          </Tooltip>
        );
      }
    }

    return <Button onClick={() => api.swopFaction()}>交换阵营</Button>;
  }

  static contextType = MobXProviderContext;
}
