import styled from "styled-components";

const CustomInput = styled.div`
  label {
    margin: 5px 10px;
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

    border-bottom: 1px solid transparent;
    transition: border-bottom 1s;

    padding-left: ${props => (props.noIcon) ? ".8rem" : "2.5rem"};
  }

  input:focus {
    border-bottom: 1px solid #0A84FF;
  }

  input[aria-invalid='true'] {
    border-bottom: 1px solid #FF453A;
  }
  input[aria-valid='true'] {
    border-bottom: 1px solid #30D158;
  }
`;

export default function StyledInput({ children, noIcon = false }) {
  return <CustomInput noIcon={noIcon}>{children}</CustomInput>;
}
