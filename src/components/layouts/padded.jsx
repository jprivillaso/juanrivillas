import React from 'react';
import styled from 'styled-components';
import Header from '../commons/header';

import './main.css';
import './padded.css';

const PaddedLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
`;

const PaddedContent = styled.section`
  margin: 5rem 20% 1.0875rem;
`;

const getImage = backgroundUrl => {
  return styled.div`
    background: url(/images/articles.jpg) no-repeat center center;
    height: -webkit-fill-available;
    background-color: #141618;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    opacity: .4;
    width: 100%;
    z-index: 1;
    will-change: transform;
  `;
};

const paddedLayout = ({ children, backgroundUrl }) => {
  const Image = getImage(backgroundUrl);

  return (
    <PaddedLayout
      className="padded_layout"
    >
      <Header />
      {
        backgroundUrl !== 'none'
          ? <Image className="page_main_image" />
          : null
      }
      <PaddedContent>
        {children}
      </PaddedContent>
    </PaddedLayout>
  );
};

export default paddedLayout;
