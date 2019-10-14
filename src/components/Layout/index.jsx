import React from 'react';
import { TransitionPortal } from 'gatsby-plugin-transition-link';

import GlobalStyles from 'styles/global';
import Container from 'components/Container';
import Header from 'components/Header';

import * as S from './styled';

const Layout = ({ children, fullscreen }) => {
  if (typeof document !== 'undefined') {
    // eslint-disable-next-line no-undef
    if (typeof location !== 'undefined' && location.pathname === '/') {
      document.getElementsByTagName('body')[0].classList.add('noScroll');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('noScroll');
    }
  }

  return (
    <S.Layout>
      <GlobalStyles />
      <TransitionPortal level='top'>
        <Header/>
      </TransitionPortal>
      <S.Main fullscreen={ fullscreen }>
        <Container fullscreen={ fullscreen }>{children}</Container>
      </S.Main>
    </S.Layout>
  );
};

export default Layout;
