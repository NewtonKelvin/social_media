// YourComponent.stories.js|jsx

import StyledButton from "./button";
//Icons
import { AccountCircle } from "@mui/icons-material"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Button",
  component: StyledButton,
};

//👇 We create a “template” of how args map to rendering
const Template = ({ text, icon, alignLeft, square }) => (
  <StyledButton alignLeft={alignLeft} square={square}>
    <button type="button">
      {(icon) && <AccountCircle />}
      {(!square) && text}
    </button>
  </StyledButton>
);

export const Default = Template.bind({});
Default.args = {
  text: "Button",
  icon: false,
  alignLeft: false,
  square: false
};
