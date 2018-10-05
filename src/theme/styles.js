import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
  }
`;
