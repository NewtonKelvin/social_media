import StyledCarousel from "./carousel";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Carousel",
  component: StyledCarousel,
};

//👇 We create a “template” of how args map to rendering
const Template = ({ slideList }) => <StyledCarousel slideList={slideList} unoptimized={true} />;

export const Default = Template.bind({});
Default.args = {
  slideList: [
    "post/b8b282c29afdae6a3f2f/44ee3c371da96cec3a77",
    "post/b8b282c29afdae6a3f2f/977194a0956fce426bb0",
    "post/b8b282c29afdae6a3f2f/702c397b88a0bbd59b90",
    "post/b8b282c29afdae6a3f2f/696c154965535a56023b",
    "post/b8b282c29afdae6a3f2f/1906826067797be6495e"
  ]
};
