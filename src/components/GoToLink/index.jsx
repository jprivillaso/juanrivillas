import React from 'react';

import ButtonLink from 'components/ButtonLink';

import * as S from './styled';

const GoToLink = ({ url, text }) => {
  return (
    <S.ButtonBack>
      <ButtonLink rel="prev" to={ url }>
        { text }
      </ButtonLink>
    </S.ButtonBack>
  );
};

export default GoToLink;
