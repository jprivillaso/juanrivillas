import styled from 'styled-components';
import media from 'styled-media-query';

import * as T from 'styles/typography';
import * as V from 'styles/variables';

export const Text = styled.p`
  ${ T.Text1 }
  color: var(--primaryColor);
  text-align: justify;
  margin-bottom: ${ V.Space.default }

  ${ media.lessThan('large')`
    font-size: 1.3rem;
  ` }
`;
