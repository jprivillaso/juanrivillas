import styled from 'styled-components';

import * as V from 'styles/variables';

export const InfiniteLayout = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  transition: background-color ${ V.Transition.default };
  will-change: background-color;
  background-color: var(--bg);

  .header a {
    color: black;
  }

  @media (max-width: 1280px) {
    width: 100% !important;
  }
`;

export const Content = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
