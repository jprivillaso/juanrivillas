import styled from 'styled-components';
import media from 'styled-media-query';

import * as V from 'styles/variables';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${ props => props.fullscreen ? '100%' : V.MaxSize.lg };
  padding-left: ${ props => props.fullscreen ? '0px' : V.Space.sm };
  padding-right: ${ props => props.fullscreen ? '0px' : V.Space.sm };

  ${ media.greaterThan('medium')`
    padding-left: ${ props => props.fullscreen ? '0px' : V.Space.default };
    padding-right: ${ props => props.fullscreen ? '0px' : V.Space.default };
  ` }
`;
