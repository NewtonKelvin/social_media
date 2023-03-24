import styled from "styled-components";

const CustomInput = styled.div`
  position: relative;
  padding-right: 5px;
  img {
    max-width: 40px !important;
    max-height: 40px !important;
    min-width: 40px !important;
    min-height: 40px !important;

    margin: auto 0 !important;
    padding: 5px !important;
    border-radius: 10px !important;
    background-color: transparent !important;
    margin: 0 16px !important;
  }

  svg,
  img {
    color: var(--opacity);
    height: 2.5rem;
    position: absolute;
    margin: 0 0.5rem;
  }

  button {
    background-color: var(--primary);
    height: 1.8rem;
    width: 1.8rem;
    position: absolute;

    margin: 5px -2.2rem;
    padding: 5px;
    border-radius: 7px;

    svg {
      top: 0;
      left: 0;
      color: var(--white);
      height: 1.8rem;
      width: 1.8rem;
      padding: 5px;
      margin: 0;
    }

    /*color: var(--opacity);
    height: calc(2.5rem - 10px);
    width: calc(2.5rem - 10px);
    position: absolute;
    margin: 5px 30px 5px 5px;
    padding: 0px;
    background-color: var(--primary);*/
  }

  input {
    font-weight: 500;
    width: 100%;
    color: var(--text);
    height: 2.5rem;
    background-color: var(--input);

    border-bottom: 1px solid transparent;
    transition: all var(--transition);

    padding-left: ${(props) => (!props.withIcon ? ".8rem" : "2.5rem")};
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

  input[aria-invalid="true"] {
    border-bottom: 1px solid var(--red);
  }
  input[aria-checked="true"] {
    border-bottom: 1px solid var(--green);
  }
`;

export default function StyledInput({ children, withIcon = true }) {
  return <CustomInput withIcon={withIcon}>{children}</CustomInput>;
}
