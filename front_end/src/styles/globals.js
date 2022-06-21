import { createGlobalStyle } from 'styled-components'
import Image from 'next/image'

import backgroundLight from '../../public/images/background_light.jpg'
import backgroundDark from '../../public/images/background_dark.jpg'

const GlobalStyle = createGlobalStyle`

  /* RESET */

  *,
  *::before,
  *::after {
    margin: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: 'Montserrat', sans-serif;
  }
  body {
    -webkit-font-smoothing: antialiased !important;

    width: 100vw;
    height: 100vh;
    padding: 10px;

    background-image: var(--background);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: var(--text);

    transition: background-image var(--transition);
  }
  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; //15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 106.25%; //17px
    }
  }

  /* THEMES */

  :root {
    --blue: #0A84FF;
    --red: #FF453A;
    --green: #30D158;
    --white: #FFFFFF;
    --transition: .5s ease-in-out;

    
    --breakpoint-desktop: 1564px;
    --breakpoint-tablet: 768px;
    --breakpoint-phone: 320px;
    --xs: 0px;    //extra-small
    --sm: 600px;  //small
    --md: 960px;  //medium
    --lg: 1280px; //large
    --xl: 1920px;  //extra-large
    
    --page-padding: 10px;
    --navbar-height: 62px;
    --sidebar-width: 300px;
  }

  :root > body,
  :root > body[data-theme="light"] {
    --primary: #0A84FF;
    --secondary: #25A6EF;
    //--tertiary": #25A6EF;
    --container: #FFFFFF;
    --input: #E5E5E5;
    --text: #000000;
    --opacity: #808080;
    --background: url(${backgroundLight.src})
  }
  :root > body[data-theme="dark"] {
    --primary: #0A84FF;
    --secondary: #25A6EF;
    //--"tertiary: #25A6EF;
    --container: #151718;
    --input: #1D1F20;
    --text: #FFFFFF;
    --opacity: #6D6D6D;
    --background: url(${backgroundDark.src})
  }


  /* OVERLAP */

  div.MuiAlert-root {
    border-radius: 10px;
    font-weight: bold;
  }

  /* CUSTOM */

  hr {
    border: 1px solid var(--text);
    transition: border var(--transition);
  }

  input, textarea, button {
    background-color: var(--input);
    border-radius: 10px;
    padding: 7px;
  }

  a {
    display: block;
    width: max-content;

    text-decoration: none!important;
    color: var(--primary);
    position: relative;
    font-weight: 500;
    &::before {
      content: '';
      position: absolute;
      width: 70%;
      height: 1px;
      border-radius: 4px;
      color: var(--primary);
      background-color: var(--primary);
      bottom: 0;
      left: 15%;
      transform-origin: right;
      transform: scaleX(0);
      transition: transform var(--transition);
    }
    
    &:hover::before {
      transform-origin: left;
      transform: scaleX(1);
      color: var(--primary);
    }
  }
`;
 
export default GlobalStyle
