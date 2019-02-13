import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layouts/default';
import Home from '../components/pages/home';
import Metatags from '../components/commons/meta_tags';

const IndexPage = props => (
  <Layout>
    <Metatags
      title="Home"
      description={props.data.site.siteMetadata.description}
      url={props.data.site.siteMetadata.siteUrl}
      pathname={props.location.pathname}
    />
    <Home />
  </Layout>
);

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

export default IndexPage;
