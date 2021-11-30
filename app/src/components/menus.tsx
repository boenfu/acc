import {observer} from 'mobx-react';
import React, {Component, FC, HtmlHTMLAttributes, ReactNode} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import {Dog, Egg, Penguin} from '../resources/icons';

import {ApplicationCard} from './application-card';
import {RoomInfo} from './room-info';

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(93, 81, 228, 0.88);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;

  .application-card {
    color: #fff;

    svg {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      padding: 4px;
      font-size: 36px;
      box-shadow: 0 0 4px #999;
    }
  }
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  overflow: hidden;
  margin: 0;

  svg {
    font-size: 82px;
  }
`;

const MenuItem = styled.li`
  --offset: 4px;
  --border-size: 1px;

  display: flex;
  align-items: center;
  position: relative;
  padding: 8px 24px;
  margin: 24px;
  appearance: none;
  border: 0;
  text-align: center;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  outline: none;
  cursor: pointer;
  border-radius: 0;
  font-size: 13px;
  box-shadow: inset 0 0 0 var(--border-size) currentcolor;
  transition: background-color 0.8s ease;

  svg {
    font-size: 24px;
    margin-right: 12px;
    opacity: 0.8;
    transition: opacity 0.2s linear;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);

    svg {
      opacity: 1;
    }
  }

  .horizontal,
  .vertical {
    opacity: 0.9;
    position: absolute;
    top: var(--horizontal-offset, 0);
    right: var(--vertical-offset, 0);
    bottom: var(--horizontal-offset, 0);
    left: var(--vertical-offset, 0);
    transition: transform 0.8s ease;
    will-change: transform;

    &::before {
      content: '';
      position: absolute;
      border: inherit;
    }
  }

  .horizontal {
    --vertical-offset: calc(var(--offset) * -1);
    border-top: var(--border-size) solid currentcolor;
    border-bottom: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--vertical-offset) - var(--border-size));
      bottom: calc(var(--vertical-offset) - var(--border-size));
      left: calc(var(--vertical-offset) * -1);
      right: calc(var(--vertical-offset) * -1);
    }
  }

  &:hover .horizontal {
    transform: scaleX(0);
  }

  .vertical {
    --horizontal-offset: calc(var(--offset) * -1);
    border-left: var(--border-size) solid currentcolor;
    border-right: var(--border-size) solid currentcolor;

    &::before {
      top: calc(var(--horizontal-offset) * -1);
      bottom: calc(var(--horizontal-offset) * -1);
      left: calc(var(--horizontal-offset) - var(--border-size));
      right: calc(var(--horizontal-offset) - var(--border-size));
    }
  }

  &:hover .vertical {
    transform: scaleY(0);
  }
`;

const Menu: FC<HtmlHTMLAttributes<HTMLLIElement>> = ({children, ...props}) => (
  <MenuItem {...props}>
    {children}
    <div className="horizontal" />
    <div className="vertical" />
  </MenuItem>
);

@observer
export class Menus extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <ApplicationCard basic />
        {/* <RoomInfo /> */}
        <MenuList>
          <Menu>
            <Penguin />
            加入房间
          </Menu>
          <Link to="/store">
            <Menu onClick={this.onOpenStore}>
              <Egg />
              许愿屋
            </Menu>
          </Link>
          <Menu onClick={this.onOpenAbout}>
            <Dog />
            关于
          </Menu>
        </MenuList>
      </Wrapper>
    );
  }

  private onOpenStore = (): void => {};

  private onOpenAbout = (): void => {};
}
