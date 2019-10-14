import styled from 'styled-components';
import media from 'styled-media-query';

import * as V from 'styles/variables';

export const BoxHandler = styled.article`
  border: ${ V.Border.box };
  border-radius: ${ V.BorderRadius.box };
  box-shadow: ${ V.BoxShadow.box };
  box-sizing: border-box;
  color: var(--primaryColor);
  display: block;
  height: 100%;
  padding: ${ V.Space.sm };
  position: relative;
  will-change: border-color;

  ${ media.greaterThan('medium')`
    padding: ${ V.Space.default };
  ` }

  &:after,
  &:before {
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: transform ${ V.Transition.default };
  }

  &:before {
    border-radius: ${ V.BorderRadius.box };
    border-left: 1px solid var(--highlightColor);
    border-right: 1px solid var(--highlightColor);
    transform: scaleY(0);
  }

  &:after {
    border-radius: ${ V.BorderRadius.box };
    border-bottom: 1px solid var(--highlightColor);
    border-top: 1px solid var(--highlightColor);
    transform: scaleX(0);
  }

  &:hover {
    box-shadow: none;
    border: solid 1px transparent;

    &:before {
      transform: scaleY(1)
    }

    &:after {
      transform: scaleX(1)
    }
  }
`;
