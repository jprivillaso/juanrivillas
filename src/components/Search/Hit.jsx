import React from 'react';

import BlogItem from 'components/BlogItem';

const Hit = props => {
  const { hit } = props;

  return (
    <BlogItem
      slug={hit.fields.slug}
      date={hit.date}
      title={hit.title}
      description={hit.description}
      tags={hit.tags}
      timeToRead={hit.timeToRead}
    />
  );
};

export default Hit;
