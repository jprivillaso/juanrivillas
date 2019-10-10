import styled from 'styled-components';
import Img from 'gatsby-image';

export const Avatar = styled(Img).attrs({
  alt: 'Welcome Text',
  'aria-label': 'Image containing Welcome Text'
})`
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  display: block;
  object-fit: cover;
  height: 300px;
  width: 500px;
`;
