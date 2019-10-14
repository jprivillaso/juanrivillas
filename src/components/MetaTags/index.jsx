import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Metatags({ description, pathname, title, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const ogImage = image || 'https://juanrivillas.com/assets/favicon.png';
  const ogUrl = pathname || site.siteMetadata.siteUrl;

  return (
    <Helmet
      title={title}
      meta={[
        { name: 'title', content: title },
        { name: 'description', content: metaDescription },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:url',
          content: ogUrl,
        },
        {
          property: 'og:image',
          content: ogImage,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:locale',
          content: 'en',
        },
        {
          property: 'og:locale:alternate',
          content: 'pt_BR',
        },
        {
          property: 'og:locale:alternate',
          content: 'es_CO',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: ogImage,
        },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },

        { name: 'twitter:creator', content: '@jprivillaso' },
        { property: 'og:site_name', content: 'www.juanrivillas.com' },
      ]}
    >
      <html lang="en" />
      <noscript>{`Enable your JS please`}</noscript>
    </Helmet>
  );
}

export default Metatags;
