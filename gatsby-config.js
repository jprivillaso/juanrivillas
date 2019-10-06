const queries = require('./src/utils/algolia');
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
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-eslint',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: '2001TEZ445',
        apiKey: '5dca5a3e614ed3e17cb1dd222a4e24fb',
        queries,
        chunkSize: 10000
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
    }
  ]
};
