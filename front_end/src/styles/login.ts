import styled from "styled-components"

export const StyledContainerL = styled.div`
  background-color: #FFFFFF !important;
  border-radius: 10px !important;
  height: calc(100vh - 10px);
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  div.col-md-6 > * {
    margin: 5px;
  }

  a {
    text-align: center;
  }
`

export const StyledContainerR = styled.div`
  background-color: transparent !important;
  border-radius: 10px !important;
  height: calc(100vh - 10px);
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  ul {
    font-weight: bold;
  }

  @media (max-width: 1200px){
    display: none;
  }
`
