require('dotenv').config({
  path: `.env.${ process.env.NODE_ENV }`,
});

const queries = require('./src/utils/algolia');

const feeds = [
  {
    serialize: ({ query: { site, allMarkdownRemark } }) => {
      return allMarkdownRemark.edges.map(edge => {
        return Object.assign({}, edge.node.frontmatter, {
          description: edge.node.frontmatter.description,
          date: edge.node.frontmatter.date,
          url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          custom_elements: [{ 'content:encoded': edge.node.html }]
        });
      });
    },
    query: `
      {
        allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                date
              }
              excerpt(truncate: true, pruneLength: 500, format: HTML)
            }
          }
        }
      }
    `,
    output: '/feed.xml',
    title: 'Felipe Fialho - RSS Feed'
  }
];

const plugins = [
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${ __dirname }/static/assets`,
      name: 'uploads'
    }
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${ __dirname }/static/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${ __dirname }/articles`,
      name: `blog`,
    },
  },
  `gatsby-transformer-json`,
  'gatsby-plugin-resolve-src',
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-svgr`,
  `gatsby-plugin-transition-link`,
  `gatsby-plugin-offline`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-relative-images',
        },
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 650,
            linkImagesToOriginal: false
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: 'static/assets/'
          }
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            usePrefix: false,
            providers: {
              include: [
                'Youtube',
                'Twitter',
                'Codepen',
              ],
              exclude: [
                'Reddit',
                'Flickr',
                'Instagram'
              ]
            },
          },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-remark-lazy-load`,
        `gatsby-remark-prismjs`,
        `gatsby-remark-external-links`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds
    }
  },
  {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyDefault: 'pt-br',
      useLangKeyLayout: false
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Juan Rivillas`,
      short_name: `juanrivillas.com`,
      start_url: `/`,
      background_color: `#fcfcfc`,
      theme_color: `#111111`,
      display: `minimal-ui`,
      icon: `static/assets/favicon.png`,
    },
  },
  `gatsby-plugin-netlify-cms`,
  `gatsby-plugin-netlify`,
  {
    resolve: 'gatsby-plugin-netlify-cache',
    options: {
      cachePublic: true
    }
  },
];

// if (process.env.CONTEXT === 'production') {
const algolia = {
  resolve: `gatsby-plugin-algolia-search`,
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    queries,
    chunkSize: 10000, // default: 1000
    enablePartialUpdates: true
  }
};

const analytics = {
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: process.env.GOOGLE_ANALYTICS_ID,
    head: false
  }
};

plugins.push(algolia);
plugins.push(analytics);
// }

module.exports = {
  siteMetadata: {
    title: `Juan Pablo Rivillas - Software Engineer`,
    author: `Juan Rivillas`,
    position: 'Release Manager - Technical Lead',
    description: ``,
    siteUrl: `https://juanrivillas.com/`,
    social: {
      twitter: `jprivillaso`,
      twitterLink: `https://twitter.com/jprivillaso`,
      linkedinLink: `https://www.linkedin.com/in/jprivillaso/`,
      githubLink: `https://github.com/jprivillaso`,
      stackoverflowLink: `https://stackoverflow.com/users/2599811/jprivillaso`,
      mediumLink: `https://medium.com/@jprivillaso`,
    },
  },
  plugins
};
