import styled from 'styled-components';
import media from 'styled-media-query';

import * as T from 'styles/typography';

export const Text = styled.p`
  ${ T.Text1 }
  color: var(--primaryColor);
  text-align: justify;

  ${ media.lessThan('large')`
    font-size: 1.3rem;
  ` }
`;
