import styled from "styled-components"

export const StyledContainerL = styled.div`
  background-color: var(--container) !important;
  border-radius: 10px !important;
  height: calc(100vh - 10px);
  padding: 5px;

  transition: all var(--transition);

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
    margin: 10px auto;
  }
`

export const StyledContainerR = styled.div`
  background-color: transparent !important;
  border-radius: 10px !important;
  height: calc(100vh - 10px);
  padding: 5px;
  color: var(--text);

  display: flex;
  flex-direction: column;
  justify-content: center;
  
  transition: all var(--transition);

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
export default function StyledContainerL2({ children, isDark }) {
  return (
    <StyledContainerL isDark={isDark}>
      {children}
    </StyledContainerL>
  );
}
