import * as React from 'react';
import styled from 'styled-components';
import { Gallery } from './gallery/gallery';
import { GlobalStyle } from '../theme/styles';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <AppContainer>
      <Gallery />
    </AppContainer>
  </React.Fragment>
);
