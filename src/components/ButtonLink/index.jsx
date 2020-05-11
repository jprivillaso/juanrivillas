import React from 'react';

import { getActiveTheme } from 'utils/themes';

import * as S from './styled';

const ButtonLink = ({ children, to }) => {
  return (
    <S.ButtonLink
      to={to}
      fade
      direction="down"
      duration={1}
      bg={getActiveTheme()}>
      { children }
    </S.ButtonLink>
  );
};

export default ButtonLink;
