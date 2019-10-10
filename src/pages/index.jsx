import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/DefaultLayout';
import Metatags from 'components/MetaTags';
import FullScreen from 'components/FullScreen';
import HomeImage from 'components/HomeImage';
import WelcomeImage from 'components/WelcomeImage';

export const homeMetadataQuery = graphql`
  query HomeMetadataQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }
  }
`;

const IndexPage = ({ data, location }) => {
  return (
    <Layout>
      <Metatags
        title="Home"
        description={ data.site.siteMetadata.description }
        url={ data.site.siteMetadata.siteUrl }
        pathname={ location.pathname }
      />
      <FullScreen>
        <HomeImage />
        <WelcomeImage />
      </FullScreen>

    </Layout>
  );
};

export default IndexPage;
