import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Metatags from '../components/commons/meta_tags';
import PaddedLayout from '../components/layouts/padded';
import Icon from '../images/gatsby-icon.png';

const PostWrapper = styled.div`
  margin-bottom: 50px;
`;

function BlogPost(props) {
  const post = props.data.markdownRemark;
  const url = props.data.site.siteMetadata.siteUrl;
  const { title, description } = post.frontmatter;
  const thumbnail = post.frontmatter.image && post.frontmatter.image.childImageSharp.resize.src;

  return (
    <PaddedLayout
      backgroundUrl="none"
    >
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
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
        )}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostWrapper>
    </PaddedLayout>
  );
}

export default BlogPost;

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
