import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Content = styled.span`
  background-color: #f5f5f5;
  font-weight: 400;
  border-radius: 13px;
  padding: 5px 7px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  margin: 10px 10px 0 0;
  display: flex;
  align-items: center;
`;

export const Tag = ({ children }) => <Content>{children}</Content>;

Tag.propTypes = {
  children: PropTypes.string.isRequired
};
