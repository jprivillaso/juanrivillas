const postQuery = `{
  posts: allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "/articles/" } }
  ) {
    edges {
      node {
        objectID: id
        fields{
          slug
        }
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
          tags
        }
      }
    }
  }
}`;

const flatten = arr => {
  return arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }));
};

const settings = { attributesToSnippet: [`excerpt: 20`] };

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings
  },
];

module.exports = queries;
