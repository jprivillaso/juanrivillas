import React from 'react';

import * as S from './styled';

const Container = ({ children, fullscreen }) => {
  return (
    <S.Container fullscreen={ fullscreen }>
      { children }
    </S.Container>
  );
};

export default Container;
