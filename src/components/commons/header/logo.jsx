import React from 'react';

import {
  HeaderLogo, HeaderText, HeaderLink
} from './logo_UI';

const headerLogo = ({ siteTitle }) => (
  <HeaderLogo
    className="header_logo"
  >
    <HeaderText>
      <HeaderLink
        to="/"
      >
        {siteTitle}
      </HeaderLink>
    </HeaderText>
  </HeaderLogo>
);

export default headerLogo;
