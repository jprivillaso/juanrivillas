import React from 'react';

import Header from '../../header';
import {
  Layout,
  Content
} from './default_UI';

import '../default.css';

const layout = ({ children }) => (
  <Layout>
    <Content>
      <Header />
      {children}
    </Content>
  </Layout>
);

export default layout;
