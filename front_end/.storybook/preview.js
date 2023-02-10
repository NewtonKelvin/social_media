import React from "react"
import GlobalStyle from "../src/styles/globals"

export const decorators = [
  
  (Story) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
