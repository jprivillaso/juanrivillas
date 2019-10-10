import React from 'react';
import styled, { css } from 'styled-components';
import { Search } from 'styled-icons/fa-solid/Search';
import { Algolia } from 'styled-icons/fa-brands/Algolia';

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`;

const focus = css`
  background: white;
  color: ${ props => props.theme.darkBlue };
  cursor: text;
  width: 5em;
  + ${ SearchIcon } {
    color: ${ props => props.theme.darkBlue };
    margin: 0.3em;
  }
`;

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${ props => props.theme.lightBlue };
  + ${ SearchIcon } {
    color: white;
  }
  ${ props => props.focus && focus }
  margin-left: ${ props => (props.focus ? `-1.6em` : `-1em`) };
  padding-left: ${ props => (props.focus ? `1.6em` : `1em`) };
  ::placeholder {
    color: ${ props => props.theme.gray };
  }
`;

const expand = css`
  background: ${ props => props.theme.veryLightGray };
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${ SearchIcon } {
    margin: 0.3em;
  }
`;

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: ${ props => props.theme.shortTrans };
  border-radius: ${ props => props.theme.smallBorderRadius };
  { hightlight-next-line } ${ props => (props.collapse ? collapse : expand) };
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

export const HitsWrapper = styled.div`
  display: grid;
  max-height: 80vh;
  min-height: 300px;
  overflow: scroll;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  background: white;

  a, span, p, li {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  .ais-Hits-item {

  }
`;

export const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
);
