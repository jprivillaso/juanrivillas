import React from 'react';
import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

const HeaderSocial = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  position: absolute;
  right: 0;
`;

const Anchor = styled.a`
  font-size: 2em;
  color: black;
`;

const headerSocial = () => (
  <HeaderSocial className="header_socials">
    <Anchor
      href="https://github.com/jprivillaso"
      title="github"
    >
      <FaGithub />
    </Anchor>
  </HeaderSocial>
);

export default headerSocial;
