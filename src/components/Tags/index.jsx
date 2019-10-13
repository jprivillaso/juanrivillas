import React from 'react';

import * as S from './styled';

const Tags = ({ tags, isLink }) => {
  return (
    <S.Tags>
      <S.TagIcon />
      {tags.map((tag, i) => (
        <S.TagHolder key={i}>
          <S.TagItem>{tag}</S.TagItem>
        </S.TagHolder>
      ))}
    </S.Tags>
  );
};

export default Tags;
