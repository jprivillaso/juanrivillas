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

const BackgroundImage = styled(Img)`
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

const home = props => {
  const welcomeImage = props.data.welcomeImage;
  let normalizedProps = welcomeImage;

  if (normalizedProps.fluid && normalizedProps.fluid.presentationWidth) {
    let isWindowSmallerThanImg =
      typeof window !== `undefined` && window.outerWidth < welcomeImage.fluid.presentationWidth;

    normalizedProps = {
      ...welcomeImage,
      style: {
        ...(welcomeImage.style || {}),
        maxWidth: welcomeImage.fluid.presentationWidth,
        width: isWindowSmallerThanImg
          ? welcomeImage.fluid.presentationWidth * 0.7
          : welcomeImage.fluid.presentationWidth
      }
    };
  }

  return (
    <Home className="page_home">
      <BackgroundImage
        title="Home image"
        alt="A table with a phone on the right, a Macbook in the middle and a mouse on the right."
        fixed={typeof window === 'undefined' ? { src: {} } : undefined}
        fluid={props.data.homeImage.fluid}
      />
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
