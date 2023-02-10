import styled from "styled-components"
//Material UI
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

const CustomToggle = styled.div`
  transition: background-color var(--transition);
  color: red !important;
  margin: 10px 0px;
  @media (max-width: 1024px){
    button > span {
      display: none;
    }
  }
  div.MuiToggleButtonGroup-root {
    background-color: var(--input);
    border-radius: 10px;
    border: 0px solid white;
    padding: 5px;

    width: 100%;
    justify-content: space-evenly;
  }
  svg {
    color: var(--text) !important;
  }
  button.MuiToggleButton-root {
    padding: 5px!important;
    font-family: 'Montserrat', sans-serif;
    color: var(--text);
    border-radius: 10px!important;
    border: none;
    width: 100%;
    &[aria-pressed="true"] {
      background-color: var(--primary);
      color: var(--white);
      svg {
        color: var(--white) !important;
      }
    }
    span.MuiTouchRipple-root {
      margin: 0px!important;
      color: var(--primary);
    }
    * {
      margin: 0px 5px;
    }
  }
`

export default function StyledToggle({ title, values, toggleValue, handleToggleValue }){

  return (
    <CustomToggle>
      <ToggleButtonGroup
        value={toggleValue}
        onChange={handleToggleValue}
        aria-label={title}
        exclusive
      >
        {values.map((item, key) => {
          return (
            <ToggleButton key={key} value={item.value} aria-label={item.name}>
              {item.icon}
              <span>{item.name}</span>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </CustomToggle>
  )
}
