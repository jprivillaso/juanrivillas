import React from 'react'
import PropTypes from 'prop-types'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5"
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes} className="theme-light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  usedTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                let usedTheme;
                try {
                  usedTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                setTheme(usedTheme || 'theme-light');
              })();
            `
            }}
          />

          {this.props.preBodyComponents}

          <noscript>
            Sem JavaScript isso aqui não funciona :/
          </noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}

          <script defer src='//appcues-bundler-development.global.ssl.fastly.net/17629.js'></script>
        </body>
      </html>
    );
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}