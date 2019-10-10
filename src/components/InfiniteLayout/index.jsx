import React from 'react';

import {
  InfiniteLayout,
  Content
} from './index_UI';
import Header from 'components/Header';

import GlobalStyles from 'styles/global';

const Layout = ({ children }) => (
  <InfiniteLayout>
    <GlobalStyles />
    <Header/>
    <Content>
      { children }
    </Content>
  </InfiniteLayout>
);

export default Layout;
