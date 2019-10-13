import React from 'react';

import Menu from 'components/Menu';

import * as S from './styled';

const Header = () => {
  return (
    <S.Header>
      <S.Main>
        <S.Menu>
          <Menu />
        </S.Menu>
      </S.Main>
    </S.Header>
  );
};

export default Header;
