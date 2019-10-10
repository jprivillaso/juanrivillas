import React from 'react';
import { FaGithub } from 'react-icons/fa';

import {
  HeaderSocial, Anchor
} from './social_UI';

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
