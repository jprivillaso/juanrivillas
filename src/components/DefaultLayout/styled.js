import styled from 'styled-components';
import Img from 'gatsby-image';

import * as V from 'styles/variables';

export const DefaultLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: background-color ${ V.Transition.default };
  will-change: background-color;
  background-color: var(--bg);
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Image = styled(Img)`
  margin-top: -10%;
  overflow: hidden;
  position: fixed !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media only screen and (max-width : 1024px) {
    margin-top: 0;
  }
`;
