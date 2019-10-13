import React from 'react';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import { getActiveTheme } from 'utils/themes';

import Menu from 'components/Menu';
import Container from 'components/Container';
// import LightButton from 'components/LightButton'

import * as R from 'components/Responsive';

import * as S from './styled';

const Header = () => {
  return (
    <S.Header>
      <Container>
        <S.Main>
          <AniLink
            cover
            bg={getActiveTheme()}
            direction="down"
            duration={1}
            to="/"
            title="Voltar para home">
            <S.Brand>
              <R.GreaterThanSmallMobile>
                <S.Title>Juan Rivillas</S.Title>
              </R.GreaterThanSmallMobile>
            </S.Brand>
          </AniLink>
          <S.Menu>
            <Menu />
            {/* <LightButton /> */}
          </S.Menu>
        </S.Main>
      </Container>
    </S.Header>
  );
};

export default Header;
