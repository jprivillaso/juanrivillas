require('dotenv').config({
  path: `.env.${ process.env.NODE_ENV }`,
});

const queries = require('./src/utils/algolia');

const plugins = [
  `gatsby-transformer-json`,
  'gatsby-plugin-resolve-src',
  `gatsby-plugin-svgr`,
  `gatsby-plugin-sitemap`,
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-sharp',
  'gatsby-image',
  'gatsby-transformer-sharp',
  'gatsby-plugin-offline',
  'gatsby-plugin-eslint',
  'gatsby-plugin-styled-components',
  `gatsby-plugin-netlify-cms`,
  `gatsby-plugin-netlify`,
  {
    resolve: 'gatsby-plugin-netlify-cache',
    options: {
      cachePublic: true
    }
  },
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
      name: 'Juan Rivillas',
      short_name: 'juanrivillas.com',
      start_url: '/',
      background_color: '#663399',
      theme_color: '#663399',
      display: 'minimal-ui',
      icon: 'static/assets/favicon.png'
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
      path: `${ __dirname }/static/assets`,
      name: 'images'
    }
  },
  {
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: '2001TEZ445',
      apiKey: '5dca5a3e614ed3e17cb1dd222a4e24fb',
      queries,
      chunkSize: 10000
    }
  }
];

module.exports = {
  siteMetadata: {
    title: 'Juan Rivillas Personal Website',
    author: 'Juan Rivillas',
    position: 'Technical Leader',
    siteUrl: 'http://juanrivillas.com',
    description: `
      Personal website of Juan Pablo Rivillas Ospina. Contains articles related to
      technology and programming.
    `,
    social: {
      twitter: `jprivillaso`,
      twitterLink: `https://twitter.com/jprivillaso`,
      linkedinLink: `https://www.linkedin.com/in/jprivillaso/`,
      githubLink: `https://github.com/jprivillaso`,
      mediumLink: `https://medium.com/@jprivillaso`,
      stackoverflowLink: `https://stackoverflow.com/users/2599811/jprivillaso`,
    },
  },
  plugins
};
