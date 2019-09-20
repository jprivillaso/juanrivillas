import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;

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
