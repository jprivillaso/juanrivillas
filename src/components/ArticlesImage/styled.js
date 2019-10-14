import styled from 'styled-components';
import Img from 'gatsby-image';
import media from 'styled-media-query';

export const Avatar = styled(Img).attrs({
  alt: '',
  'aria-label': ''
})`
  margin-top: -10%;

  ${ media.greaterThan('medium')`
    margin-top: 0;
  ` }
`;
