import React from 'react';
import { graphql } from 'gatsby';

import Metatags from 'components/MetaTags';
import Layout from 'components/Layout';
import GridTemplate from 'components/GridTemplate';
import GoToLink from 'components/GoToLink';

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

const NotFoundPage = props => {
  // eslint-disable-next-line no-undef
  if (typeof location !== 'undefined' && location.pathname === '/3_leadership/') {
    // eslint-disable-next-line no-undef
    location.href = `${ location.origin }/blog/leadership`;
  }

  return (
    <Layout>
      <Metatags
        title="404. Page Not Found"
        description={ props.data.site.siteMetadata.description }
        url={ props.data.site.siteMetadata.siteUrl }
        pathname={ props.location.pathname }
      />
      <GridTemplate>
        <h1>Ooops! Página não encontrada :(</h1>
        <GoToLink url='/' text='Voltar à página principal' />
      </GridTemplate>
    </Layout>
  );
};

export default NotFoundPage;
