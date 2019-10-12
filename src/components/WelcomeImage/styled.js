import styled from 'styled-components';
import Img from 'gatsby-image';

export const Avatar = styled(Img).attrs({
  alt: 'Welcome Text',
  'aria-label': 'Image containing Welcome Text'
})`
  display: block;
  object-fit: cover;
`;
