import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/commons/layouts/default/index';
import Metatags from '../components/commons/meta_tags';
import Home from '../components/views/home';

export const homeMetadataQuery = graphql`
  query HomeMetadataQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }

    homeImage: imageSharp(original: { src: { regex: "/home/" } }) {
      fluid(maxWidth: 1920, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }

    welcomeImage: imageSharp(original: { src: { regex: "/welcome/" } }) {
      fluid(maxWidth: 500, quality: 100) {
        ...GatsbyImageSharpFluid
        presentationWidth
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
      <Home data={ data } />
    </Layout>
  );
};

export default IndexPage;
