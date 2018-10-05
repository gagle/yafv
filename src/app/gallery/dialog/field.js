import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const FieldName = styled.span`
  padding-bottom: 4px;
  color: rgba(0, 0, 0, 0.54);
`;

const FieldValue = styled.span`
  color: rgba(0, 0, 0, 0.87);
`;

export const Field = ({ name, value }) => (
  <FieldWrapper>
    <FieldName>{name}</FieldName>
    <FieldValue>{value}</FieldValue>
  </FieldWrapper>
);

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};
