import React from 'react';
import { graphql } from 'gatsby';

import Metatags from 'components/MetaTags';
import Layout from 'components/Layout';
import NotFound from 'components/NotFound';

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
    <NotFound />
  </Layout>
);

export default NotFoundPage;
