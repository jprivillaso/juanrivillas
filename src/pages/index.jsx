import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layouts/default';
import Home from '../components/pages/home';
import Metatags from '../components/commons/meta_tags';

const IndexPage = props => {
  console.log(props);
  return (
    <Layout
      image={props.data.homeImage.sizes}
    >
      <Metatags
        title="Home"
        description={props.data.site.siteMetadata.description}
        url={props.data.site.siteMetadata.siteUrl}
        pathname={props.location.pathname}
      />
      <Home
        welcomeImg={props.data.welcomeImage}
      />
    </Layout>
  );
};

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
      sizes(maxWidth: 1920) {
        ...GatsbyImageSharpSizes
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

export default IndexPage;
