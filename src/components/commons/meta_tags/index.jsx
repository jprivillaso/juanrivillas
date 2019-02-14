import React from 'react';
import Helmet from 'react-helmet';

function Metatags(props) {
  return (
    <Helmet
      title={props.title}
      meta={[
        { name: 'title', content: props.title },

        { name: 'description', content: props.description },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:url',
          content: props.pathname ? props.url + props.pathname : props.url,
        },

        {
          property: 'og:image',
          content: props.thumbnail && props.thumbnail,
        },
        {
          property: 'og:image:secure_url',
          content: props.thumbnail && props.thumbnail,
        },

        {
          property: 'og:description',
          content: props.description,
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

        { name: 'twitter:title', content: props.title },

        {
          name: 'twitter:description',
          content: props.description,
        },
        {
          name: 'twitter:image',
          content: props.thumbnail && props.thumbnail,
        },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },

        { name: 'twitter:creator', content: '@jprivillaso' },
        { property: 'og:site_name', content: 'www.juanrivillas.com' },
      ]}
    >
      <html lang="en" />
      <noscript>{`Enable your JS please`}</noscript>
      <link href="https://fonts.googleapis.com/css?family=Anton|Roboto" rel="stylesheet" />
    </Helmet>
  );
}

export default Metatags;
