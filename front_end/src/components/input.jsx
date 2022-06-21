import styled from "styled-components"
import GlobalStyle, { Theme }  from '../styles/globals'

const CustomInput = styled.div`
  label {
    margin: 5px 10px;
    font-weight: bold;
    color: var(--opacity);
    display: block;
    font-size: 0.8rem;
  }

  svg {
    color: var(--opacity);
    height: 2.5rem;
    position: absolute;
    margin: 0 .5rem;
  }

  input {
    font-weight: 500;
    width: 100%;
    color: var(--text);
    height: 2.5rem;
    background-color: var(--input);

    border-bottom: 1px solid transparent;
    transition: all var(--transition);

    padding-left: ${props => (props.noIcon) ? ".8rem" : "2.5rem"};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:active,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:active,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:active,
  select:-webkit-autofill:focus {

    /*
    border: 0px solid var(--text);
    background-clip: text;
    transition: background-color 5000s ease-in-out 0s!important;
    caret-color: var(--text);
    box-shadow: 0 0 0px 1000px var(--input) inset !important;
    */

    //🤫
    transition: background-color 9999s ease-in-out 0s;
    caret-color: var(--text);
    -webkit-text-fill-color: var(--text);

  }

  input:focus {
    border-bottom: 1px solid var(--blue);
  }

  input[aria-invalid='true'] {
    border-bottom: 1px solid var(--red);
  }
  input[aria-valid='true'] {
    border-bottom: 1px solid var(--green);
  }
`;

export default function StyledInput({ children, noIcon = false }) {
  return (
    <CustomInput noIcon={noIcon}>
      {children}
    </CustomInput>
  );
}
