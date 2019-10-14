import styled from 'styled-components';

import * as V from 'styles/variables';

export const ButtonBack = styled.div`
  &:not(:first-child) {
    margin-top: ${ V.Space.default };
  }

  &:not(:last-child) {
    margin-bottom: ${ V.Space.default };
  }
`;
