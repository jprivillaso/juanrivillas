import React from 'react';

import {
  LinkText, HeaderLinks
} from './links_UI';

import ButtonLink from 'components/ButtonLink';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Articles',
    path: '/blog',
  }
];

const items = menuItems.map(item => {
  return (
    <LinkText
      key={`${ item.label }-h5`}
      className="header_menu_item"
    >
      <ButtonLink
        key={item.label}
        rel="prev"
        to={`/${ item.path.toLowerCase() }`}
      >
        {item.label}
      </ButtonLink>
    </LinkText>
  );
});

const headerLinks = () => {
  return (
    <HeaderLinks className="header_menu" >
      {items}
    </HeaderLinks>
  );
};

export default headerLinks;
