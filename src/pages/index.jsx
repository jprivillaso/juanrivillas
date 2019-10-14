import React from 'react';

import Layout from 'components/Layout';
import GridTemplate from 'components/GridTemplate';
import FullScreen from 'components/FullScreen';
import LargeTitle from 'components/LargeTitle';
import AbsoluteCenter from 'components/AbsoluteCenter';
import Paragraph from 'components/Paragraph';
import Social from 'components/Social';
import SEO from 'components/MetaTags';

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Home' />
      <GridTemplate>
        <FullScreen>
          <AbsoluteCenter>
            <LargeTitle>
              Bem Vindo!
            </LargeTitle>
            <Paragraph>
              Oi, meu nome é Juan. Sou um Engenheiro de Software que ama criar coisas novas.
              Obrigado por visitar meu blog! Esse é um lugar onde experimento tecnologias novas
              e escrevo conteúdo relacionado à computação.
              Saiba mais sobre mim:
            </Paragraph>
            <Social />
          </AbsoluteCenter>
        </FullScreen>
      </GridTemplate>
    </Layout>
  );
};

export default IndexPage;
