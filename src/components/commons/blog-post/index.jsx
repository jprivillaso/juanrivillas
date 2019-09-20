import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Metatags from '../meta_tags';
import PaddedLayout from '../layouts/padded';
import Icon from '../../../img/favicon.png';

const PostWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 1.0875rem;

  p {
    font-family: 'Roboto', sans-serif !important;
    text-align: justify;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Anton', sans-serif !important;
  }
`;

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;

function BlogPost(props) {
  const post = props.data.markdownRemark;
  const url = props.data.site.siteMetadata.siteUrl;
  const { title, description } = post.frontmatter;
  const thumbnail = post.frontmatter.image && post.frontmatter.image.childImageSharp.resize.src;

  return (
    <PaddedLayout>
      <Metatags
        title={title}
        description={description}
        thumbnail={thumbnail ? url + thumbnail : url + Icon}
        url={url}
        pathname={props.location.pathname}
      />
      <PostWrapper className="post_wrapper">
        <h1>{title}</h1>
        {thumbnail && (
          <Img
            fluid={post.frontmatter.image.childImageSharp.fluid}
            style={{
              marginBottom: '40px'
            }}
          />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostWrapper>
    </PaddedLayout>
  );
}

export default BlogPost;
