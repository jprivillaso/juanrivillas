import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/InfiniteLayout';
import Metatags from 'components/MetaTags';
import ArticlesImage from 'components/ArticlesImage';
// import ArticleList from '../components/views/articles';

export const articlesMetadataQuery = graphql`
  query ArticlesMetadataQuery {
    # allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
    #   edges {
    #     node {
    #       fields{
    #         slug
    #       }
    #       excerpt(pruneLength: 250)
    #       frontmatter {
    #         date(formatString: "MMMM D/YYYY", locale: "pt")
    #         title,
    #         description
    #         tags
    #       }
    #     }
    #   }
    # }

    site {
      siteMetadata {
        title
        siteUrl
        description
      }
    }
  }
`;

const Articles = ({ data, location }) => {
  return (
    <Layout>
      <Metatags
        title="Articles"
        description={ data.site.siteMetadata.description }
        url={ data.site.siteMetadata.siteUrl }
        pathname={ location.pathname }
      />
      <ArticlesImage />
      {/* <ArticleList data={ data } /> */}
    </Layout>
  );
};

export default Articles;
