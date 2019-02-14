import React from 'react';
import { graphql } from 'gatsby';

import PaddedLayout from '../components/layouts/padded';
import ArticleList from '../components/pages/articles';
import Metatags from '../components/commons/meta_tags';

const Articles = ({ data, location }) => {
  console.log(data);
  return (
    <PaddedLayout
      backgroundUrl="articles.jpg"
      backgroundPosition="bottom"
      image={data.articlesImage.fluid}
    >
      <Metatags
        title="Articles"
        description={data.site.siteMetadata.description}
        url={data.site.siteMetadata.siteUrl}
        pathname={location.pathname}
      />
      <ArticleList
        data={ data }
      />
    </PaddedLayout>
  );
};

export const articlesMetadataQuery = graphql`
  query ArticlesMetadataQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title,
            description
          }
        }
      }
    }

    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }

    articlesImage: imageSharp(original: { src: { regex: "/articles_1/" } }) {
      fluid(maxWidth: 1920, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export default Articles;
