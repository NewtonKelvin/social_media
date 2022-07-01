// YourComponent.stories.js|jsx

import StyledButton from "./button";
//Icons
import { AccountCircle, Fingerprint, Check } from "@mui/icons-material"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Button",
  component: StyledButton,
};

//👇 We create a “template” of how args map to rendering
const Template = ({ text, icon, transparent = false, alignLeft }) => (
  <StyledButton transparent={transparent} alignLeft={alignLeft}>
    <button type="button">
      {(icon) && <Check />}
      {text}
    </button>
  </StyledButton>
);

export const Default = Template.bind({});
Default.args = {
  text: "Button",
  icon: false,
  transparent: false,
  alignLeft: false
};
