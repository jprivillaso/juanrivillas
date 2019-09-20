import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

export const View = styled(Link)`
  color: black;
  padding: 1em;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif !important;
  display: flex;
  flex-direction: column;
  border: 1px solid  gainsboro;
  box-shadow: 0 -1px 4px #ede7e7;
  text-decoration: none;

  &:hover {
    background-color: whitesmoke;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  h1 {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
`;

export const Content = styled.div`
font-family: -apple-system, system-ui, "Segoe UI",
Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const Date = styled.span`
  text-transform: capitalize;
`;

export const Image = styled(Img)`
  margin-top: -10%;
`;
