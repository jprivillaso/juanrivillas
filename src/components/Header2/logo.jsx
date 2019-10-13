import React from 'react';

import ButtonLink from 'components/ButtonLink';
import {
  HeaderLogo, HeaderText
} from './logo_UI';

const headerLogo = ({ siteTitle }) => (
  <HeaderLogo
    className="header_logo"
  >
    <HeaderText>
      <ButtonLink rel="prev" to="/">
        {siteTitle}
      </ButtonLink>
    </HeaderText>
  </HeaderLogo>
);

export default headerLogo;
