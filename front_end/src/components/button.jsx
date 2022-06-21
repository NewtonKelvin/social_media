import styled from "styled-components"
import { Theme }  from '../styles/globals'

const CustomButton = styled.div`
  margin: 5px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 38px;
    color: var(--white);
    background:var(--primary);
    font-weight: bold;

    &:hover {
      background-color: var(--secondary);
    }

    svg {
      margin: 0 5px;
      stroke: var(--white);
      stroke-width: 1;
      height: 70%;
    }
  }
`

export default function StyledButton({ children }){
  return (
    <CustomButton>
      {children}
    </CustomButton>
  )
}
