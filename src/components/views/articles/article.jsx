import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Article = styled(Link)`
  color: black;
  padding: 1em;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif !important;
  display: flex;
  flex-direction: column;
  border: 1px solid  gainsboro;
  box-shadow: 0 -1px 4px #ede7e7;
  text-decoration: none;

  &:hover {
    background-color: whitesmoke;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    font-family: 'Anton', sans-serif !important;
  }
`;

const Content = styled.div`
  font-family: 'Roboto', sans-serif !important;
`;

const Date = styled.span`
  text-transform: capitalize;
`;

const article = ({ node, keyProp }) => (
  <Article
    className="article_item"
    to={node.fields.slug}
    key={`article-${ keyProp }`}
  >
    <Title className="post_header">
      <h1 className="post_title">{node.frontmatter.title}</h1>
      <Date>{node.frontmatter.date}</Date>
    </Title>
    <Content>
      <p>{node.frontmatter.description}</p>
    </Content>
  </Article>
);

export default article;
