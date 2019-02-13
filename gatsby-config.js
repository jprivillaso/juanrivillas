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
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-eslint',
    'gatsby-plugin-styled-components',
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
        path: `${ __dirname }/src/pages/articles`,
        name: 'articles'
      }
    }
  ]
};
