import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import Header from '../commons/header';
import './main.css';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const LayoutContent = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled(Img)`
  margin-top: -10%;
  overflow: hidden;
  position: fixed !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media only screen and (max-width : 1024px) {
    margin-top: 0;
  }
`;

const layout = ({ children, image }) => (
  <Layout
    className="default_layout"
  >
    <LayoutContent>
      <Image
        title="Home image"
        alt="A mac with mouse on the right and glasses on top of it."
        fixed={typeof window === 'undefined' ? { src: {} } : undefined}
        fluid={image}
      />
      <Header />
      {children}
    </LayoutContent>
  </Layout>
);

export default layout;
