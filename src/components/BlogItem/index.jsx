import React from 'react';
import ReactGA from 'react-ga';

import { getActiveTheme } from 'utils/themes';
import DateTime from 'components/DateTime';
import BoxHandler from 'components/BoxHandler';
import Tags from 'components/Tags';

import * as S from './styled';

const trackClick = ({ item, label }) => {
  ReactGA.event({
    category: 'Blog',
    action: 'click',
    label: `${ label || 'Blog List' } - Go to ${ item }`
  });
};

const BlogItem = ({
  slug,
  date,
  timeToRead,
  title,
  tags,
  description,
  isMini
}) => {
  return (
    <S.BlogItem
      to={`/${ slug }`}
      fade
      direction="down"
      duration={1}
      title={title}
      bg={getActiveTheme()}
      onClick={() => trackClick(title)}>
      <BoxHandler>
        {date && (
          <DateTime>
            {date}
            {timeToRead && (
              <span> · Leitura de {timeToRead} min</span>
            )}
          </DateTime>
        )}
        <S.Title isMini={isMini}>{title}</S.Title>
        {description && (
          <S.Subtitle>{description}</S.Subtitle>
        )}
        {tags && (
          <Tags tags={tags} />
        )}
      </BoxHandler>
    </S.BlogItem>
  );
};

export default BlogItem;
