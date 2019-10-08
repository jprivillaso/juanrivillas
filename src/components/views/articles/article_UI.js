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
  margin-bottom: 0px;
  margin-top: 2em;

  &:hover {
    background-color: whitesmoke;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  h1 {
    font-weight: 700;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin-bottom: 0px;
  }
`;

export const Content = styled.div`
  font-family: -apple-system, system-ui, "Segoe UI",Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  h2 {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1rem;
    font-weight: 200;
  }
`;

export const Date = styled.span`
  text-transform: capitalize;
`;

export const Image = styled(Img)`
  margin-top: -10%;
`;

export const Tag = styled.div`
  background-color: ${ props => props.color || 'red' };
  min-width: 100px;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-left: 30px;
  border-radius: 3px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;
