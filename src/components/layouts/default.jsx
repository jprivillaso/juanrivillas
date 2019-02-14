import React from 'react';
import styled from 'styled-components';

import Header from '../commons/header';
import './main.css';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../../../images/main_page.jpg") no-repeat center center;
  background-size: cover;
  background-position: center;
`;

const LayoutContent = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const layout = ({ children }) => (
  <Layout
    className="default_layout"
  >
    <LayoutContent>
      <Header />
      {children}
    </LayoutContent>
  </Layout>
);

export default layout;
