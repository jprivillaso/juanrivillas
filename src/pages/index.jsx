import React from 'react';

import Layout from 'components/Layout';
import GridTemplate from 'components/GridTemplate';
import FullScreen from 'components/FullScreen';
import HomeImage from 'components/HomeImage';
import WelcomeImage from 'components/WelcomeImage';
import AbsoluteCenter from 'components/AbsoluteCenter';
import AboutMe from 'components/AboutMe';
import Social from 'components/Social';
import SEO from 'components/MetaTags';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Home' />
      <GridTemplate>
        <FullScreen>
          <HomeImage />
          <AbsoluteCenter>
            <WelcomeImage />
            <AboutMe />
            <Social />
          </AbsoluteCenter>
        </FullScreen>
      </GridTemplate>
    </Layout>
  );
};

export default IndexPage;
