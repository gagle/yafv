import * as React from 'react';
import styled from 'styled-components';
import { Gallery } from './gallery/gallery';
import { GlobalStyle } from '../theme/styles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <AppContainer>
      <Gallery />
    </AppContainer>
  </React.Fragment>
);
