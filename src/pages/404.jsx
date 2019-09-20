import React from 'react';
import { graphql } from 'gatsby';

import Metatags from '../components/commons/meta_tags';
import Layout from '../components/commons/layouts/default';

export const homeMetadataQuery = graphql`
  query NotFoundMetadataQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }
  }
`;

const NotFoundPage = props => (
  <Layout>
    <Metatags
      title="404. Page Not Found"
      description={ props.data.site.siteMetadata.description }
      url={ props.data.site.siteMetadata.siteUrl }
      pathname={ props.location.pathname }
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn't exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
