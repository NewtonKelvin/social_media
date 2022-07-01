import styled from "styled-components"
import { Theme }  from '../styles/globals'

const CustomButton = styled.div`
  margin: 5px;
  button {
    display: flex;
    align-items: center;
    justify-content: ${props => props.alignLeft ? "flex-start" : "center"};
    width: 100%;
    height: 38px;
    color: ${props => props.transparent ? "var(--text)" : "var(--white)"};
    background: ${props => props.transparent ? "transparent" : "var(--primary)"};
    font-weight: bold;
    transition: all var(--transition);

    &:hover {
      background-color: var(--secondary);
      color: var(--white);
    }

    svg {
      margin: 0 5px;
      /* stroke: var(--white); */
      stroke-width: 1;
      height: 70%;
    }
  }
`

export default function StyledButton({ children, transparent = false, alignLeft = false }){
  return (
    <CustomButton transparent={transparent} alignLeft={alignLeft}>
      {children}
    </CustomButton>
  )
}
