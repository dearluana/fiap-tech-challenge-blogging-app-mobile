import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: ${({ theme }) => theme.colors.dark2};
  }

  a{
      text-decoration: none;
  }

   a:hover{
      text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  p, a{
    line-height: 1.6;
    font-size: 14px;
  }

  input, button, textarea {
    line-height: 1.6;
    font-size: 16px;    
  }

  button {
    cursor: pointer;
    text-transform: uppercase;
  }
`;
