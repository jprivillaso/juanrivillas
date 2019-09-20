import Img from 'gatsby-image';
import styled from 'styled-components';

export const Articles = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2em;
  margin-bottom: 0em;

  @media (max-width: 1280px) {
    width: 100% !important;
    margin: 0;
    padding: 2em;
    margin-top: 3em;
  }
`;

export const View = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 2em;
`;

export const Image = styled(Img)`
  margin-top: -10%;
`;
