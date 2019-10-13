import React from 'react';

import Header from 'components/Header';
import {
  DefaultLayout,
  Content
} from './styled';

import GlobalStyles from 'styles/global';

const Layout = ({ children }) => (
  <DefaultLayout>
    <GlobalStyles />
    <Header />
    <Content>
      {children}
    </Content>
  </DefaultLayout>
);

export default Layout;
