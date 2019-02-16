import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Home = styled.div`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  max-width: 100% !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  display: flex;
`;

const Image = styled(Img)`
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
`;

const home = ({ welcomeImg }) => {
  let normalizedProps = welcomeImg;

  if (normalizedProps.fluid && normalizedProps.fluid.presentationWidth) {
    let isWindowSmallerThanImg =
      typeof window !== `undefined` && window.outerWidth < welcomeImg.fluid.presentationWidth;

    normalizedProps = {
      ...welcomeImg,
      style: {
        ...(welcomeImg.style || {}),
        maxWidth: welcomeImg.fluid.presentationWidth,
        width: isWindowSmallerThanImg
          ? welcomeImg.fluid.presentationWidth * 0.7
          : welcomeImg.fluid.presentationWidth
      }
    };
  }

  return (
    <Home className="page_home">
      <Image
        className="welcome_image"
        title="Welcome Image"
        alt="A welcome text"
        {...normalizedProps}
        fixed={typeof window === 'undefined' ? { src: {} } : undefined}
      />
    </Home>
  );
};

export default home;
