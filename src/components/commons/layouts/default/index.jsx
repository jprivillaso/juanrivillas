import React from 'react';

import Header from '../../header';
import {
  DefaultLayout,
  Content
} from './index_UI';

import '../main.css';

const Layout = ({ children }) => (
  <DefaultLayout>
    <Header />
    <Content>
      {children}
    </Content>
  </DefaultLayout>
);

export default Layout;
