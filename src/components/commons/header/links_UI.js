import { Link } from 'gatsby';
import styled from 'styled-components';

export const LinkText = styled.h5``;

export const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  font-weight: 300;
  letter-spacing: 1.2px;
  font-size: 12px;
`;

export const HeaderLinks = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
  display: flex;
  width: 100%;
  max-width: 100%;
  justify-content: center;
`;
