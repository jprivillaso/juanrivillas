import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const HeaderLogo = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  position: absolute;
`;

const HeaderText = styled.h2`
  margin: 0
`;

const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

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
