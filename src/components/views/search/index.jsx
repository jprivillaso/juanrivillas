import React, { useState, useEffect, createRef } from 'react';
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { ThemeProvider } from 'styled-components';

import { Root, HitsWrapper, PoweredBy } from './styles';
import Input from './Input';
import * as hitComps from './hitComps';

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${ state.query }'`
);

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${ res.nbHits } result${ res.nbHits > 1 ? `s` : `` }`
);

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`];
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler();
  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, detectClickOutside);
    };
    return () => {
      for (const event of events) {
        document.removeEventListener(event, detectClickOutside);
      };
    };
  });
};

const theme = {
  smallBorderRadius: '3px',
  darkGray: 'gray',
  lightGray: 'gray',
  lightBlue: 'blue',
  darkBlue: 'blue',
  gray: 'gray',
  shortTrans: '1s',
  veryLightGray: 'gray'
};

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );

  useClickOutside(ref, () => setFocus(false));
  return (
    <ThemeProvider theme={ theme }>
      <InstantSearch
        searchClient={ searchClient }
        indexName={ indices[0].name }
        onSearchStateChange={({ query }) => setQuery(query)}
        root={{ Root, props: { ref } }}
      >
        <Input />
        <HitsWrapper
          show={ query.length > 0 && focus }
          asGrid={ hitsAsGrid }
        >
          {indices.map(({ name, hitComp }) => (
            <Index key={name} indexName={name}>
              <Stats />
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      </InstantSearch>
    </ThemeProvider>
  );
};
