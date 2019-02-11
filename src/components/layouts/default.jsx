import React from 'react';
import styled from 'styled-components';
import Header from '../commons/header';

import './main.css';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const layout = ({ children }) => (
  <Layout className="default_layout">
    <Header />
    {children}
  </Layout>
);

export default layout;
