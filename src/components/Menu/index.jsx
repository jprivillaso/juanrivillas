import React from 'react';
import ReactGA from 'react-ga';
import TransitionLink from 'gatsby-plugin-transition-link';

import { getActiveTheme } from 'utils/themes';

import menuLinks from './content';
import * as S from './styled';

const trackClick = item => {
  ReactGA.event({
    category: 'Menu',
    action: 'click',
    label: `Menu - ${ item }`
  });
};

const getCurrentPage = () => {
  // eslint-disable-next-line no-undef
  return typeof location !== 'undefined' && location.pathname;
};

const Menu = () => {
  return (
    <S.Menu>
      {
        menuLinks.map((link, i) => (
          <TransitionLink
            partiallyActive={true}
            key={i}
            bg={getActiveTheme()}
            direction="down"
            duration={1}
            to={link.url}
            onClick={() => trackClick(link.label)}
            activeClassName={ link.url === getCurrentPage() ? 'active' : '' }
          >
            {link.label}
          </TransitionLink>
        ))
      }
    </S.Menu>
  );
};

export default Menu;
