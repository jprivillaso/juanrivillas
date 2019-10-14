import styled from 'styled-components';
import Img from 'gatsby-image';
import media from 'styled-media-query';

export const Avatar = styled(Img).attrs({
  alt: '',
  'aria-label': ''
})`
  margin-top: -10%;
  overflow: hidden;
  position: fixed !important;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  ${ media.greaterThan('medium')`
    margin-top: 0;
  ` }
`;
