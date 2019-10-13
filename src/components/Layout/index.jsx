import React from 'react';
import { TransitionPortal } from 'gatsby-plugin-transition-link';

import GlobalStyles from 'styles/global';
import Container from 'components/Container';
import Header from 'components/Header';

import * as S from './styled';

const Layout = ({ children }) => {
  return (
    <S.Layout>
      <GlobalStyles />
      <TransitionPortal level='top'>
        <Header/>
      </TransitionPortal>
      <S.Main>
        <Container>{children}</Container>
      </S.Main>
    </S.Layout>
  );
};

export default Layout;
