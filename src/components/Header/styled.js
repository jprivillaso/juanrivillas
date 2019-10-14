import styled from 'styled-components';
import media from 'styled-media-query';

import * as V from 'styles/variables';

export const Header = styled.header.attrs({
  role: 'banner',
})`
  background-color: ${ V.Color.brown };
  color: ${ V.Color.white };
  display: block;
  left: 0;
  position: fixed;
  right: 0;
  text-transform: lowercase;
  top: 0;
  transition: background-color .3s;
  width: 100%;
  will-change: background-color;
  z-index: ${ V.ZIndex.header };
  display: flex;
  align-items: baseline;
  z-index: 10;
  text-align: center;
  transition: top 0.3s,
              background-color 0.3s ease-out;

  ${ media.greaterThan('medium')`
    background-color: ${ V.Color.brown };
  ` }

  > div {
    display: flex;
    align-items: space-between;
    padding-left: 0;
    padding-right: 0;
    width: 80%;

    ${ media.greaterThan('medium')`
      min-width: 65rem;
    ` }
  }

`;

export const Main = styled.div`
  align-items: center;
  display: flex;
  height: ${ V.Height.headerSm };
  width: 100%;

  ${ media.greaterThan('medium')`
    height: ${ V.Height.headerLg };
  ` }
`;

export const Brand = styled.div`
  align-items: center;
  display: flex;

  > *:not(:last-child) {
    margin-right: ${ V.Space.sm };
  }
`;

export const Menu = styled.div`
  align-items: center;
  display: flex;
  width: 100%;

  ${ media.lessThan('small')`
    margin-right: -${ V.Space.xs };
  ` }

  > *:not(:last-child) {
    margin-right: ${ V.Space.xs };
  }
`;

export const Title = styled.h1`
  color: ${ V.Color.white };
  display: inline-block;
  font-size: 1.7rem;
  letter-spacing: .025rem;
  text-transform: initial;

  ${ media.lessThan('350px')`
    display: none;
  ` }

  ${ media.greaterThan('small')`
    font-size: 2.1rem;
  ` }
`;
