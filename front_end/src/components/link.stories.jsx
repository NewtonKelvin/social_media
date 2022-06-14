import Link from "next/link"

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Link"
};

//👇 We create a “template” of how args map to rendering
const Template = ({ text }) => (
  <Link href="#">{text}</Link>
);

export const Default = Template.bind({});
Default.args = {
  text: "Go to home page",
};
