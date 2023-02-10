import styled from "styled-components"
import { Switch } from "@mui/material"

const CustomSwitcher = styled.div`
  span.active {
    color: var(--primary);
  }
  &:first-child {
    color: var(--opacity);
  }
  .MuiSwitch-root {
    padding: 5px;
  }
  .MuiSwitch-thumb {
    border-radius: 50%;
    color: white;
  }
  .MuiSwitch-root > .MuiButtonBase-root {
    position: absolute;
    padding: 9px;
    margin: 0;
    top: 0;
    left: 0;
  }
  .MuiSwitch-track {
    border-radius: 20px;
    background-color: var(--input);
    opacity: 1;
    /* height: 28px!important; */
    /* width: 48px!important; */
  }
  .Mui-checked + .MuiSwitch-track {
    background-color: var(--primary);
    opacity: 1;
  }
`;

export default function StyledSwitch({ iconLeft, iconRight, checked, onChange }/*:SwitchProps*/) {
  return (
    <CustomSwitcher className="text-center">
      <span className={!checked ? "active" : ""}>{iconLeft}</span>
      <Switch
        color="default"
        checked={checked}
        onChange={onChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <span className={checked ? "active" : ""}>{iconRight}</span>
    </CustomSwitcher>
  );
}
