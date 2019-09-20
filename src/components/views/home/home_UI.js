import styled from 'styled-components';
import Img from 'gatsby-image';

export const View = styled.div`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  max-width: 100% !important;
  margin: 0 !important;
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Image = styled(Img)`
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
`;

export const BackgroundImage = styled(Img)`
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
