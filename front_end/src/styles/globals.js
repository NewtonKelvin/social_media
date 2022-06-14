import { createGlobalStyle } from 'styled-components'
import Image from 'next/image'

import backgroundLight from '../../public/images/background_light.jpg'
import backgroundDark from '../../public/images/background_dark.jpg'

const Global = {
  "breakpointDesktop": "1564px",
  "breakpointTablet": "768px",
  "breakpointPhone": "320px",
  "xs": "0px",    //extra-small
  "sm": "600px",  //small
  "md": "960px",  //medium
  "lg": "1280px", //large
  "xl": "1920px"  //extra-large
}

const Theme = {
  "dark": {
    "primary": "#0A84FF",
    "container": "#151718",
    "input": "#1D1F20",
    "text": "#000000",
    "opacity": "#6D6D6D",
    "background": `${backgroundDark.src}`
  },
  "light": {
    "primary": "#0A84FF",
    "container": "#FFFFFF",
    "input": "#E5E5E5",
    "text": "#000000",
    "opacity": "#808080",
    "background": `${backgroundLight.src}`
  }
}

const GlobalStyle = createGlobalStyle`

  /* RESET */

  * {
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
    padding: 5px;

    background-image: url(${Theme.light.background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

  /* OVERLAP */

  div.MuiAlert-root {
    border-radius: 10px;
    font-weight: bold;
  }

  /* CUSTOM */

  input, textarea, button {
    background-color: ${Theme.light.input};
    border-radius: 10px;
    padding: 7px;
  }

  a {
    display: block;
    width: max-content;

    text-decoration: none!important;
    color: ${Theme.light.primary};
    position: relative;
    font-weight: 500;
    &::before {
      content: '';
      position: absolute;
      width: 70%;
      height: 1px;
      border-radius: 4px;
      color: ${Theme.light.primary};
      background-color: ${Theme.light.primary};
      bottom: 0;
      left: 15%;
      transform-origin: right;
      transform: scaleX(0);
      transition: transform 0.5s ease-in-out;
    }
    
    &:hover::before {
      transform-origin: left;
      transform: scaleX(1);
      color: ${Theme.light.primary};
    }
  }
`
 
export default GlobalStyle
