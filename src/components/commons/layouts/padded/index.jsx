import React from 'react';

import {
  Layout,
  Content
} from './padded_UI';
import Header from '../../header';

import '../main.css';

const paddedLayout = ({ children }) => (
  <Layout>
    <Header/>
    <Content>
      { children }
    </Content>
  </Layout>
);

export default paddedLayout;
