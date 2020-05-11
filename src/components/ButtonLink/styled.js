import styled from 'styled-components';
import TransitionLink from 'gatsby-plugin-transition-link';

import * as T from 'styles/typography';

export const ButtonLink = styled(TransitionLink)`
  ${ T.Link }
  display: inline-block;
  font-size: 1.6rem;
`;
