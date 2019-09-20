import React from 'react';

import {
  View,
  Image,
  BackgroundImage
} from './home_UI';

const Home = props => {
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
    <View className="page_home">
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
    </View>
  );
};

export default Home;
