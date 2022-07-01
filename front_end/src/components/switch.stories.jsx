import Link from "next/link"
import StyledSwitch from "./switch"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Switch",
  component: StyledSwitch
};

//👇 We create a “template” of how args map to rendering
const Template = ({ iconLeft, iconRight, checked, onChange }) => (
  <StyledSwitch
    iconLeft={iconLeft}
    iconRight={iconRight}
    checked={checked}
    onChange={() => !checked}
  />
);

export const Default = Template.bind({});
Default.args = {
  iconLeft: "Light",
  iconRight: "Dark",
  checked: false,
  onChange: () => null
};
