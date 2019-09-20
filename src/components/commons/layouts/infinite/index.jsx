import React from 'react';

import {
  InfiniteLayout,
  Content
} from './index_UI';
import Header from '../../header';

import '../main.css';

const Layout = ({ children }) => (
  <InfiniteLayout>
    <Header/>
    <Content>
      { children }
    </Content>
  </InfiniteLayout>
);

export default Layout;
