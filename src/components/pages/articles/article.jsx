import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Article = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1px solid  gainsboro;
  padding: .5rem;
  box-shadow: 0 -1px 4px #ede7e7;
  margin: 1rem;
  margin-bottom: 50px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: whitesmoke;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
`;

const article = ({ node, keyProp }) => (
  <Article
    className="article_item"
    to={node.fields.slug}
    key={`article-${ keyProp }`}
  >
    <Title className="post_title">
      <h1>{node.frontmatter.title}</h1>
      <span>{node.frontmatter.date}</span>
    </Title>
    <Content>
      <p>{node.excerpt}</p>
    </Content>
  </Article>
);

export default article;
