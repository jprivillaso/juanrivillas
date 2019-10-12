import { Link } from 'gatsby';
import styled from 'styled-components';

import * as T from 'styles/typography';

export const LinkText = styled.h5`
  ${ T.MenuTitle }
`;

export const HeaderLink = styled(Link)`
  color: var(--primaryColor);
  text-decoration: none;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 300;
  letter-spacing: 1.2px;
  font-size: 12px;

  &:focus,
  &:hover {
    color: var(--highlightColor);
  }
`;

export const HeaderLinks = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: center;
`;
