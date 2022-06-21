//React Next StyledComponents
import styled from "styled-components"
import Head from "next/head"
import { createContext, useContext, useState } from "react"
import { useForm } from "react-hook-form"
//Context
import { ThemeContext } from "../pages/_app"
import Navbar from "./navbar"
import Sidebar from "./sidebar"



const MyLayout = styled.div`

  @media (max-width: 768px){
    .Sidebar[aria-expanded="true"] + .Content {
      opacity: .5;
    }
    .Sidebar {
      &[aria-expanded="true"] {
        margin: 0;
      }
      margin-left: -100vw;
      width: calc(80vw - (var(--page-padding) * 2));
      display: block;
      z-index: 2;
    }
    .Content {
      width: calc(100vw - (var(--page-padding) * 2));
      grid-area: Sidebar !important;
      z-index: 1;
    }
  }

  display: grid;
  grid-template-areas:
  "Navbar Navbar"
  "Sidebar Content";
  grid-gap: var(--page-padding);
  grid-template-columns: 300px 1fr;

  width: calc(100vw - (var(--page-padding)*2));

  div {
    padding: var(--page-padding);
    background-color: var(--container);
    border-radius: 10px;

    transition: all var(--transition);
    color: var(--text);
  }

  .Navbar {
    grid-area: Navbar;
    height: var(--navbar-height);
    width: calc(100vw - (var(--page-padding)*2));
  }
  .Sidebar {
    grid-area: Sidebar;
    height: calc(100vh - var(--navbar-height) - (var(--page-padding)*3));
  }
  .Content {
    grid-area: Content;
    height: calc(100vh - var(--navbar-height) - (var(--page-padding)*3));
  }
`

interface LayoutType {
  children: JSX.Element | JSX.Element[],
  title: string
}

interface LayoutContext {

}

export const LayoutContext = createContext({} as LayoutContext)

export default function Layout({ children, title }:LayoutType){

  const [sideOpen, setSideOpen] = useState(false)

  return (
    <>
      <MyLayout>

        <Head>
          <title>SOCIAL_MEDIA | {title}</title>
        </Head>
        
        <LayoutContext.Provider value={{ sideOpen, setSideOpen }}>

          <div className="Navbar">
            <Navbar />
          </div>

          <div className="Sidebar" aria-expanded={sideOpen}>
            <Sidebar />
          </div>

          <div className="Content">{children}</div>

        </LayoutContext.Provider>

      </MyLayout>
    </>
  );
}
