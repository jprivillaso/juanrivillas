import React from 'react';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { DiscussionEmbed } from 'disqus-react';

import Metatags from '../../commons/meta_tags';
import Layout from '../../commons/layouts/infinite';
import Icon from '../../../img/favicon.png';

import {
  PostWrapper
} from './index_UI';

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

const BlogPost = props => {
  const post = props.data.markdownRemark;
  const url = props.data.site.siteMetadata.siteUrl;
  const { title, description } = post.frontmatter;
  const thumbnail = post.frontmatter.image && post.frontmatter.image.childImageSharp.resize.src;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: props.pageContext.slug, title },
  };

  return (
    <Layout>
      <Metatags
        title={ title }
        description={ description }
        thumbnail={ thumbnail ? url + thumbnail : url + Icon }
        url={ url }
        pathname={ props.location.pathname }
      />
      <PostWrapper className="post_wrapper">
        <h1>{ title }</h1>
        { thumbnail &&
          (
            <Img
              fluid={post.frontmatter.image.childImageSharp.fluid}
              style={{
                marginBottom: '40px'
              }}
            />
          )
        }
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <DiscussionEmbed {...disqusConfig} />
      </PostWrapper>
    </Layout>
  );
};

export default BlogPost;