import { useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"
//Icones
import { AccountCircle, Home, Chat, Bookmarks, Explore, Settings } from "@mui/icons-material"
//Components
import StyledButton from "./button"
//Context
import { LayoutContext } from "./layout"
import { useAuth } from "../context/AuthContext"
import { Skeleton } from "@mui/material"


const CustomSidebar = styled.div`
  .Profile {
    margin: 5px 0px 15px 0px;
    display: grid;
    grid-template-areas: "Photo Name"
    "Photo Username";
    grid-template-columns: 60px 1fr;
    align-items: center;
    .Photo {
      grid-area: Photo;
      padding: 0;
      img {
        border-radius: 10px !important;
        width: 60px;
        height: 60px;
        
        object-fit: cover;
        width: 100%;
        aspect-ratio: 1 / 1;
      }
    }
    .Name {
      margin: 0 10px;
      grid-area: Name;
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--text);

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      transition: color var(--transition);
    }
    .Username {
      margin: 0 10px;
      grid-area: Username;
      font-size: 1rem;
      font-weight: bold;
      color: var(--opacity);

      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .Numbers {
    background-color: var(--primary);
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    padding: 5px;
    margin: 10px 0;
    div {
      padding: 0;
      width: 100%;
      border-radius: 0;
      display: flex;
      flex-direction: column;
      text-align: center;
      background-color: transparent;
      color: var(--white);

      .Number {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .Title {
        font-size: .8rem;
      }
    }
  }
  .Menu {
    padding: 0;
    & div {
      padding: 0 !important;
      margin: 10px 0px !important;
      border-radius: 0 !important;
    }
  }
`

export default function Sidebar() {

  const router = useRouter()
  
  const { currentPage } = useContext(LayoutContext)
  const { user } = useAuth()

  const ProfilePicture = `${process.env.BACK_END}/image/${user?.avatar}`

  const Menu = [
    {
      Title: "Home",
      Icon: <Home />,
      Link: "/feed"
    },
    {
      Title: "Profile",
      Icon: <AccountCircle />,
      Link: `/profile/${user?.username}`
    },{
      Title: "Messages",
      Icon: <Chat />,
      Link: "/messages"
    },
    {
      Title: "Bookmarks",
      Icon: <Bookmarks />,
      Link: "/bookmarks"
    },
    {
      Title: "Explore",
      Icon: <Explore />,
      Link: "/explore"
    },{
      Title: "Edit profile",
      Icon: <Settings />,
      Link: "/config/editProfile"
    },
  ]

  return (
    <CustomSidebar>
      <div className="Profile">
        <div className="Photo">
          <Image
            src={ProfilePicture}
            layout="responsive"
            height={60}
            width={60}
            className="WithBackground"
          />
        </div>
        <div className="Name">
          {(user) ? user?.name : <Skeleton variant="text" />}
        </div>
        <div className="Username">
          {(user) ? `@${user?.username}` : <Skeleton variant="text" />}
        </div>
      </div>
      <div className="Numbers">
        <div>
          <span className="Number">43K</span>
          <span className="Title">Followers</span>
        </div>
        <div>
          <span className="Number">167</span>
          <span className="Title">Following</span>
        </div>
        <div>
          <span className="Number">632</span>
          <span className="Title">Posts</span>
        </div>
      </div>
      <div className="Menu">

        {
          Menu.map((item, key) => {
            return (
              <StyledButton key={key} className={(item.Title === currentPage) ? "primary" : "transparent"} alignLeft>
                <button type="button" onClick={() => router.push(item.Link)}>
                  {item.Icon}
                  {item.Title}
                </button>
              </StyledButton>
            )
          })
        }
      </div>
    </CustomSidebar>
  )
}
