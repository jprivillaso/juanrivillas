import React from 'react';
import { graphql } from 'gatsby';

import PaddedLayout from '../components/layouts/padded';
import ArticleList from '../components/pages/articles';
import Metatags from '../components/commons/meta_tags';

const Articles = props => {
  return (
    <PaddedLayout
      backgroundUrl="articles.jpg"
      backgroundPosition="bottom"
    >
      <Metatags
        title="Articles"
        description={props.data.site.siteMetadata.description}
        url={props.data.site.siteMetadata.siteUrl}
        pathname={props.location.pathname}
      />
      <ArticleList
        data={ props.data }
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
            title
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
  }
`;

export default Articles;
