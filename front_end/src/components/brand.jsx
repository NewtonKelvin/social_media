import styled from "styled-components"
import Image from "next/image"
//Images
import Logotipo from "../../public/images/logotipo.svg"

const CustomBrand = styled.div`
  /* height: 120px; */
  display: grid;
  grid-template-areas: "Logo Text";
  grid-template-columns: 1fr 3fr;

  align-content: center;
  justify-content: space-around;
  align-items: center;

  margin: 30px 0;

  .Logo {
    grid-area: Logo;
  }
  .Text {
    grid-area: Text;
    word-break: break;
    text-transform: uppercase;
    line-height: 40px;
    text-align: center;
    color: ${props => (props.isDark) ? "var(--white)" : "var(--primary)"};
    transition: color var(--transition);

    font-weight: bold;
    font-size: 2rem;
  }
`;

export default function StyledBrand() {
  return (
    <CustomBrand>
      <Image className="Logo" src={Logotipo} layout="responsive" height={120} priority={true} />
      <span className="Text">SOCIAL_MEDIA</span>
    </CustomBrand>
  );
}
