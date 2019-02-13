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

  .header a {
    color: black;
  }
`;

const PaddedContent = styled.section`
  margin: 5rem 20% 1.0875rem;
`;

const getImage = (backgroundUrl, backgroundPosition) => {
  return styled.div`
    background: url(../../images/${ backgroundUrl || 'articles.jpg' }) no-repeat center center;
    height: -webkit-fill-available;
    background-color: #141618;
    background-repeat: no-repeat;
    background-position: ${ backgroundPosition || 'center' };
    background-size: cover;
    width: 100%;
    z-index: 1;
    will-change: transform;
  `;
};

const paddedLayout = ({ children, backgroundUrl, backgroundPosition }) => {
  const Image = getImage(backgroundUrl, backgroundPosition);

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
