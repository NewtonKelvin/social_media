import styled from "styled-components"

const CustomInput = styled.div`
  label {
    font-weight: bold;
    color: #808080;
    display: block;
    font-size: 0.8rem;
  }

  svg {
    color: #808080;
    height: 2.5rem;
    position: absolute;
    margin: 0 .5rem;
  }

  input {
    font-weight: 500;
    width: 100%;
    color: #000000;
    height: 2.5rem;
    background-color: #E5E5E5;
    padding-left: 2.5rem;

    border-bottom: 1px solid transparent;
    transition: border-bottom 1s;
  }
`

export default function StyledInput({ children }){
  return (
    <CustomInput>
      {children}
    </CustomInput>
  )
}
