import React from 'react';

import * as S from './styled';
import { Color as C } from 'styles/variables';

const getColor = tag => (
  C[tag] || C.default
);

const Tags = ({ tags }) => (
  <S.Tags>
    {tags.map((tag, i) => (
      <React.Fragment key={`tag-${ i }`} >
        <S.TagIcon
          color={getColor(tag)}
        />
        <S.TagHolder>
          <S.TagItem>{tag}</S.TagItem>
        </S.TagHolder>
      </React.Fragment>
    ))}
  </S.Tags>
);

export default Tags;
