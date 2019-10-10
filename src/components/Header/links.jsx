import React from 'react';

import {
  LinkText, HeaderLink, HeaderLinks
} from './links_UI';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Articles',
    path: '/articles',
  }
];

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

const headerLinks = () => {
  return (
    <HeaderLinks className="header_menu" >
      {items}
    </HeaderLinks>
  );
};

export default headerLinks;
