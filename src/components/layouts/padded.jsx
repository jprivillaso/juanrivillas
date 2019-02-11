import React from 'react';
import styled from 'styled-components';
import Header from '../commons/header';

import './main.css';

const PaddedLayout = styled.div`
  width: 80%;
  height: 100%;
  overflow: hidden;
  padding: 4rem 1.0875rem 1.0875rem;
  margin: 0 auto;
`;

const paddedLayout = ({ children }) => (
  <PaddedLayout className="padded_layout">
    <Header />
    {children}
  </PaddedLayout>
);

export default paddedLayout;
