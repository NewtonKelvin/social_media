//React Next StyledComponents
import styled from "styled-components"
import Image from "next/image"
import { useContext } from "react"
import { useForm } from "react-hook-form"
//Images
import Logotipo from "../../public/images/logotipo.svg"
//Components
import StyledBrand from "./brand"
import StyledInput from "../components/input"
import { Dropdown } from "react-bootstrap"
//Icons
import { Search, Logout, Brightness3, WbSunny, Menu, Close } from "@mui/icons-material"
//Context
import { LayoutContext } from "./../components/layout"
import { ThemeContext } from "./../pages/_app"
import { AuthContext } from "../context/AuthContext"

const CustomBrand = styled.div`
  /* height: 120px; */
  display: grid;
  grid-template-areas: "Logo Text";
  grid-template-columns: 60px 1fr;

  align-content: center;
  justify-content: space-around;
  align-items: center;

  span:first-of-type {
    margin: 0 auto !important;
  }

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
    text-align: left;

    font-weight: bold;
    font-size: 1.3rem;
  }
`;

const CustomNavbar = styled.div`
  .Toggle {
    display: none;
  }
  @media (max-width: 768px){
    .Search, svg:not(.Toggle) {
      display: none;
    }
    .Toggle {
      display: inline;
    }
    .dropdown-menu {
      width: 100%;
    }
  }

  /* height: calc(var(--navbar-height) - 10px); */
  height: 100%;
  width: 100%!important;
  margin: 0!important;
  padding: 0!important;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    flex: 1;
    padding: 0;
  }
  .Brand {
    img {
      margin: 0;
      padding: 0;
    }
    .Text {
      color: var(--primary);
    }
    /* flex: 1; */
  }
  .Search {
    /* flex: 2; */
    padding: 0 !important;
    form > div {
      width: 300px;
      margin: 0 auto;
    }
  }
  .Shortcuts {
    /* flex: 1; */
    text-align: right;
    svg {
      margin: 0 10px;
      transition: color var(--transition);
      color: var(--text);
      &:hover {
        color: var(--primary);
      }
    }
    .Dropdown {
      margin: 0;
      padding: 0;
      button {
        color: var(--text) !important;
      }
      .dropdown-menu > a {
        color: var(--text) !important;
      }
    }
  }
`

export default function Navbar(){

  const { theme, toggleTheme, isDark } = useContext(ThemeContext)
  const { sideOpen, setSideOpen } = useContext(LayoutContext)
  const { signOut } = useContext(AuthContext)

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {

    alert(data)

  }

  return (
    <CustomNavbar>
      <CustomBrand className="Brand">
        <Image
          className="Logo"
          src={Logotipo}
          layout="fixed"
          height={32}
          width={32}
          priority={true}
        />
        <span className="Text">SOCIAL_MEDIA</span>
      </CustomBrand>
      <div className="Search">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <StyledInput>
            <Search />
            <input
              type="text"
              placeholder="Search for something..."
              {...register("username")}
            />
          </StyledInput>
        </form>
      </div>
      <div className="Shortcuts">
        {isDark === true ? (
          <Brightness3 onClick={toggleTheme} />
        ) : (
          <WbSunny onClick={toggleTheme} />
        )}
        <Logout onClick={() => signOut()} />
        {
          (sideOpen === true)
          ? <Close className="Toggle" onClick={() => setSideOpen(!sideOpen)} />
          : <Menu className="Toggle" onClick={() => setSideOpen(!sideOpen)} />
        }
      </div>
    </CustomNavbar>
  )
}
