import React from 'react';

import Tags from 'components/Tags';
import DateTime from 'components/DateTime';
import GoToLink from 'components/GoToLink';

import * as R from 'components/Responsive';
import * as S from './styled';

const PostHeader = ({
  image,
  tags,
  date,
  timeToRead,
  title,
  description
}) => {
  return (
    <S.PostHeader>
      {image && (
        <R.GreaterThanTablet>
          <div>
            <S.PostImage fluid={image.childImageSharp.fluid} />
          </div>
        </R.GreaterThanTablet>
      )}
      <GoToLink url='/blog/' text='← Voltar à lista de Artigos' />
      <DateTime>
        <span itemProp="datePublished">{date}</span>
        {timeToRead && (
          <span> · Leitura de {timeToRead} min</span>
        )}
      </DateTime>
      <S.Title>{title}</S.Title>
      <S.Subtitle>{description}</S.Subtitle>
      <S.Author>Juan Rivillas</S.Author>
      <Tags tags={tags} isLink={true} />
    </S.PostHeader>
  );
};

export default PostHeader;
