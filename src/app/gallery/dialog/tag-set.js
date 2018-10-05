import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { Tag } from './tag';

const TagSetWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: -10px;
`;

export const TagSet = ({ tags }) => (
  <TagSetWrapper>
    {tags.map(tag => (
      <Tag key={uuid()}>{tag}</Tag>
    ))}
  </TagSetWrapper>
);

TagSet.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};
