import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import { getActiveTheme } from 'utils/themes';
import Menu from 'components/Menu';

import * as S from './styled';

const Header = () => {
  return (
    <S.Header>
      <AniLink
        cover
        bg={getActiveTheme()}
        direction="down"
        duration={1}
        to="/"
        title="Voltar para home">
        <S.Brand>
          <S.Title>JR</S.Title>
        </S.Brand>
      </AniLink>
      <S.Main>
        <S.Menu>
          <Menu />
        </S.Menu>
      </S.Main>
    </S.Header>
  );
};

export default Header;
