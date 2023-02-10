import { useState } from "react";
import StyledSwitch from "./switch"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Switch",
  component: StyledSwitch
};

//👇 We create a “template” of how args map to rendering
const Template = ({ iconLeft, iconRight }) => {
  const [state, setState] = useState(false)
  return (
    <StyledSwitch
      iconLeft={iconLeft}
      iconRight={iconRight}
      checked={state}
      onChange={() => setState(!state)}
    />
  )
};

export const Default = Template.bind({});
Default.args = {
  iconLeft: "Light",
  iconRight: "Dark",
};
