import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    color: #FFF;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style: none;
  }
`;
