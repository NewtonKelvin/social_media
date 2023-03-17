import StyledToggle from "./toggle";
import { Group, Lock, Public } from "@mui/icons-material";
import { useState } from "react";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Toggle",
  component: StyledToggle,
};

//👇 We create a “template” of how args map to rendering
const Template = ({ selected, title, values }) => {
  const [toggleValue2, setToggleValue2] = useState("public");
  const handleToggleValue2 = (event, newValue) => {
    setToggleValue2(newValue);
  };

  return (
    <StyledToggle
      selected={selected}
      title={title}
      values={values}
      toggleValue={toggleValue2}
      handleToggleValue={handleToggleValue2}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selected: "Public",
  title: "Privacity",
  values: [
    {
      name: "Public",
      icon: <Public />,
      value: "public",
    },
    {
      name: "Friends",
      icon: <Group />,
      value: "friends",
    },
    {
      name: "Private",
      icon: <Lock />,
      value: "private",
    },
  ],
  toggleValue: () => null,
  handleToggleValue: () => null,
};
