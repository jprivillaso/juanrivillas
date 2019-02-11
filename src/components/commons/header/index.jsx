import React from 'react';
import styled from 'styled-components';

import HeaderLogo from './logo';
import HeaderLinks from './links';
import HeaderSocial from './social';

const HeaderContainer = styled.header`
  background: transparent;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  alignItems: center;

  .header_menu_item {
    padding: 0px 20px;
  }
`;

const Header = () => (
  <HeaderContainer className="header">
    <HeaderLogo siteTitle={'JR'} />
    <HeaderLinks />
    <HeaderSocial />
  </HeaderContainer>
);

export default Header;
