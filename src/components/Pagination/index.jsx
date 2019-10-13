import React from 'react';
import ReactGA from 'react-ga';

import ButtonLink from 'components/ButtonLink';

import * as S from './styled';

const trackClick = item => {
  ReactGA.event({
    category: 'Pagination',
    action: 'click',
    label: `Pagination - Go to page ${ item }`
  });
};

const Pagination = ({
  isFirst,
  isLast,
  nextPage,
  prevPage,
  currentPage,
  numPages
}) => (
  <S.Pagination>
    {!isFirst && (
      <ButtonLink
        rel="prev"
        to={prevPage}
        onClick={() => trackClick(`previous page ${ prevPage }`)}>
        ← Anterior
      </ButtonLink>
    )}
    <span>{currentPage} de {numPages}</span>
    {!isLast && (
      <ButtonLink
        rel="next"
        to={nextPage}
        onClick={() => trackClick(`next page ${ nextPage }`)}>
        Próxima →
      </ButtonLink>
    )}
  </S.Pagination>
);

export default Pagination;
