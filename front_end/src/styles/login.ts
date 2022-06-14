import styled from "styled-components"

export const StyledContainerL = styled.div`
  background-color: #FFFFFF !important;
  border-radius: 10px !important;
  height: calc(100vh - 10px);
  padding: 5px;


  div.row {
    height: 100%;
    margin: 0;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }

  div.col {
    margin: 10px 5px;
  }

  div.col-md-6 > * {
    margin: 5px;
  }

  a {
    text-align: center;
    margin: 0 auto;
  }

  img {
    padding: 0 60px !important;
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

  .row {
    margin: 0;
  }

  ul {
    font-weight: bold;
  }

  @media (max-width: 1200px){
    display: none;
  }
`
