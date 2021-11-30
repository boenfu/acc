import {Provider, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';

import {Background, Menus} from './components';
import * as stores from './stores';
import {HomeView, StoreView} from './views';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
  }
`;

const Top = styled.div`
  position: relative;
  flex: none;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 0 4px #333;
`;

const Mid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0;
`;

const Footer = styled.div`
  height: 24px;
  color: #333;
  text-align: right;
  font-size: 10px;
  padding-right: 12px;
`;

@observer
export class App extends Component {
  render(): ReactNode {
    return (
      <Router basename="app">
        <Wrapper className="app">
          <Provider {...stores}>
            <Top>
              <Menus />
            </Top>
            <Mid>
              <Switch>
                <Route exact path="/store">
                  <StoreView />
                </Route>
                <Route path="/">
                  <HomeView />
                </Route>
              </Switch>
            </Mid>
            <Footer>2021 foya.ltd - 渝 ICP 备 12315 号 - 1</Footer>
          </Provider>
          <Background />
        </Wrapper>
      </Router>
    );
  }
}
