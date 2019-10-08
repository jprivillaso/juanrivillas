// const queries = require('./src/utils/algolia1');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Juan Rivillas Personal Website',
    siteUrl: 'http://juanrivillas.com',
    description: `
    Personal website of Juan Pablo Rivillas Ospina. Contains articles related to
    technology and programming.
    `
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-eslint',
    'gatsby-plugin-styled-components',
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/img/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${ __dirname }/src/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${ __dirname }/articles`,
        name: 'articles'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${ __dirname }/src/img`,
        name: 'img'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${ __dirname }/static/assets`,
        name: `assets`,
      },
    },
  ]
};
