//React Next StyledComponents
import styled from "styled-components";
import Head from "next/head";
import { createContext, useRef, useState } from "react";
//Context
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Grid } from "@mui/material";
import PostForm from "./postForm";

export const PageInfo = styled(Grid)`
  margin: 20px 0px;
  div.PageInfo {
    margin-bottom: 30px;
  }
  div.Title {
    padding-left: 23px;
    font-weight: bold;
    font-size: 2.4rem;
    text-transform: uppercase;
  }
  div.Description {
    font-weight: normal;
    font-size: 1.2rem;
    padding-left: 20px;
    border-left: 3px solid var(--primary);
  }
`;

const MyLayout = styled.div`
  @media (max-width: 899px) {
    .Sidebar[aria-expanded="true"] + .Content {
      opacity: 0.5;
    }
    .Sidebar {
      &[aria-expanded="true"] {
        margin: 0;
      }
      margin-left: -100vw;
      max-width: calc(80vw - (var(--page-padding) * 2));
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

  width: calc(100vw - (var(--page-padding) * 2));

  & > div {
    padding: var(--page-padding);
    background-color: var(--container);
    border-radius: 10px;

    transition: all var(--transition);
    color: var(--text);
  }

  .Navbar {
    grid-area: Navbar;
    height: var(--navbar-height);
    width: calc(100vw - (var(--page-padding) * 2));
  }
  .Sidebar {
    grid-area: Sidebar;
    height: calc(100vh - var(--navbar-height) - (var(--page-padding) * 3));
    overflow-y: auto;
    overflow-x: hidden;
  }
  .Content {
    grid-area: Content;
    height: calc(100vh - var(--navbar-height) - (var(--page-padding) * 3));
    overflow-y: auto;
    overflow-x: hidden;
    @media (max-width: 900px) {
      div.container {
        padding: 0;
      }
    }
  }
`;

interface LayoutType {
  /** Conteúdo da página com elemenos JSX */
  children: JSX.Element | JSX.Element[];
  /** Nome do item no menu lateral, também vai como título de cabeçalho/página */
  title:
    | "Home"
    | "Profile"
    | "Messages"
    | "Bookmarks"
    | "Explore"
    | "Edit profile"
    | "None";
  /** Descrição que vai na descrição da página */
  description?: string;
  /** Breadcrumbs: Deve vir Link dentro de StyledBreadcrumbs */
  breadcrumbs?: JSX.Element | JSX.Element[];
}

export const LayoutContext = createContext({});

export default function Layout({
  children,
  title,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras volutpat sagittis odio.",
  breadcrumbs,
}: LayoutType) {
  const bottomRef = useRef(null);
  const topRef = useRef(null);

  const [sideOpen, setSideOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(title);

  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };
  const handleFormClose = () => {
    setFormOpen(false);
  };

  return (
    <MyLayout>
      <Head>
        <title>SOCIAL_MEDIA | {title.toUpperCase()}</title>
      </Head>

      <LayoutContext.Provider
        value={{
          sideOpen,
          setSideOpen,
          currentPage,
          setCurrentPage,
        }}
      >
        <div className="Navbar">
          <Navbar handleFormOpen={handleFormOpen} />
        </div>

        <div className="Sidebar" aria-expanded={sideOpen}>
          <Sidebar handleFormOpen={handleFormOpen} />
        </div>

        <div className="Content">
          <div ref={topRef} />

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
              filter: "grayscale(0) blur(0)",
            }}
          >
            <Grid item xl={10} xs={12}>
              <Grid container>
                <Grid item md={12} className="Breadcrumbs">
                  <Grid>{breadcrumbs}</Grid>
                </Grid>
                {title !== "Profile" && (
                  <PageInfo item md={12}>
                    <div className="Title">{title}</div>
                    <div className="Description">{description}</div>
                  </PageInfo>
                )}
                <Grid md={12} item>
                  {children}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div ref={bottomRef} />
        </div>
        <PostForm
          formOpen={formOpen}
          handleFormOpen={() => handleFormOpen()}
          handleFormClose={() => handleFormClose()}
        />
      </LayoutContext.Provider>
    </MyLayout>
  );
}
