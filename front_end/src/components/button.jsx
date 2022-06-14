import styled from "styled-components"

const CustomButton = styled.div`
  margin: 5px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 38px;
    color: #FFFFFF;
    background: #0A84FF;
    font-weight: bold;
    transition: all .5s;

    &:hover {
      background-color: #25A6EF;
    }

    svg {
      margin: 0 5px;
      stroke: #FFFFFF;
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
