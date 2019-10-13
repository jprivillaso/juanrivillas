import styled from 'styled-components';
import media from 'styled-media-query';

import * as V from 'styles/variables';
import * as T from 'styles/typography';

export const Menu = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;

  > a {
    align-items: center;
    color: ${ V.Color.white };
    cursor: pointer;
    display: inline-flex;
    font-size: 1.3rem;
    font-weight: 300;
    letter-spacing: 1.2px;
    font-family: -apple-system,system-ui,Segoe UI,Roboto,
      Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    text-transform: initial;
    height: ${ V.Height.headerSm };
    letter-spacing: .05rem;
    padding-left: ${ V.Space.xs };
    padding-right: ${ V.Space.xs };
    text-decoration: none;
    transition: color ${ V.Transition.default };
    will-change: color;

    ${ media.greaterThan('medium')`
      ${ T.LinkTransition }

      &:after {
        background-color: var(--highlightColor);
        margin-top: 0;
        top: calc(100% - 2px);
      }
    ` }

    &:not(:last-child) {
      margin-right: ${ V.Space.xs };
    }

    &.active {
      color: var(--highlightColor);
    }

    &:focus,
    &:hover {
      color: var(--highlightColor);
    }
  }
`;
