import React from 'react';

import Menu from 'components/Menu';
import DarkModeToggle from 'components/DarkModeToggle';
import Container from 'components/Container';

import * as S from './styled';

const Header = () => {
  return (
    <S.Header>
      <Container>
        <S.Main>
          <S.Menu>
            <Menu />
          </S.Menu>
        </S.Main>
        <DarkModeToggle />
      </Container>
    </S.Header>
  );
};

export default Header;
