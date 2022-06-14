// YourComponent.stories.js|jsx

import StyledInput from "./input";
//Icons
import { AccountCircle, Fingerprint, Check } from "@mui/icons-material"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Input",
  component: StyledInput,
  argTypes: {
    type: {
      options: ['text', 'password', 'email', 'number'],
      control: { type: 'select' },
    },
  },
};

//👇 We create a “template” of how args map to rendering
const Template = ({ label, labelText, noIcon, type, placeholder, ariaInvalid, ariaValid }) => (
  <StyledInput noIcon={noIcon}>
    {(label) && <label>{labelText}</label>}
    {(!noIcon) && <AccountCircle />}
    <input
      type={type}
      placeholder={placeholder}
      aria-invalid={ariaInvalid}
      aria-valid={ariaValid}
    />
  </StyledInput>
);

export const Default = Template.bind({});
Default.args = {
  label: true,
  labelText: "Username:",
  noIcon: false,
  type: "text",
  placeholder: "Insert your username...",
  ariaInvalid: false,
  ariaValid: false,
};
