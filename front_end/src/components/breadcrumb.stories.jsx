// YourComponent.stories.js|jsx

import StyledBreadcrumb from "./breadcrumb"
import Link from "next/link"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Breadcrumb",
  component: StyledBreadcrumb,
};

//👇 We create a “template” of how args map to rendering
const Template = () => (
  <StyledBreadcrumb>
    <Link href="#">Profile</Link>
    <Link href="#">Kelvin Newton</Link>
    <Link href="#">Followers</Link>
  </StyledBreadcrumb>
);

export const Default = Template.bind({});
Default.args = {};
