import React from 'react';
import { graphql } from 'gatsby';

import PaddedLayout from '../components/layouts/padded';
import ArticleList from '../components/pages/articles';

const Articles = props => {
  return (
    <PaddedLayout
      backgroundUrl="articles.jpg"
      backgroundPosition="bottom"
    >
      <ArticleList
        articles={ props.data.allMarkdownRemark.edges }
      />
    </PaddedLayout>
  );
};

export const listQuery = graphql`
  query ListQuery {
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
  }
`;

export default Articles;
