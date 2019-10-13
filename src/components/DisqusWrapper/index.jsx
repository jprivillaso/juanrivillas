import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';

import * as S from './styled';

const DisqusWrapper = ({ slug, title }) => {
  const url = `https://juanrivillas.com${ slug }`;

  return (
    <S.DisqusWrapper>
      <ReactDisqusComments
        shortname={process.env.GATSBY_DISQUS_NAME}
        identifier={url}
        title={title}
        url={url}
      />
    </S.DisqusWrapper>
  );
};

export default DisqusWrapper;
