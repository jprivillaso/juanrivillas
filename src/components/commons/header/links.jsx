import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const LinkText = styled.h5`
`;

const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const HeaderLinks = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: center;
`;

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Articles',
    path: '/articles',
  },
  {
    label: 'Talks',
    path: '/talks',
  },
];

const headerLinks = () => {
  const items = menuItems.map(item => {
    return (
      <LinkText
        key={`${ item.label }-h5`}
        className="header_menu_item"
      >
        <HeaderLink
          key={item.label}
          to={`/${ item.path.toLowerCase() }`}
        >
          {item.label}
        </HeaderLink>
      </LinkText>
    );
  });

  return (
    <HeaderLinks
      className="header_menu"
    >
      {items}
    </HeaderLinks>
  );
};

export default headerLinks;
