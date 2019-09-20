import React from 'react';

import Header from '../../header';
import {
  Layout,
  Content
} from './index_UI';

import '../main.css';

const layout = ({ children }) => (
  <Layout>
    <Header />
    <Content>
      {children}
    </Content>
  </Layout>
);

export default layout;
