import styled from "styled-components";

const CustomButton = styled.div`
  margin: 10px 0;
  width: ${(props) => (props.square ? "38px" : "auto")};

  &.transparent {
    button {
      color: var(--text);
      background-color: transparent;
    }
  }
  &.opacity {
    button {
      color: var(--text);
      background-color: var(--input);
    }
  }

  button {
    color: var(--text);
    background-color: var(--opacity);

    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.alignLeft ? "flex-start" : "center")};
    width: ${(props) => (props.square ? "38px" : "100%")};
    height: 38px;
    font-weight: bold;
    transition: all var(--transition);

    color: var(--white);
    background: var(--primary);

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
`;

export default function StyledButton(props) {
  return (
    <CustomButton alignLeft={props.alignLeft} square={props.square} {...props}>
      {props.children}
    </CustomButton>
  );
}
