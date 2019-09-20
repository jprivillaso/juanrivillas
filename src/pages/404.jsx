import React from 'react';
import { graphql } from 'gatsby';

import Metatags from '../components/commons/meta_tags';
import Layout from '../components/commons/layouts/default';
import NotFound from '../components/views/notFound';

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
