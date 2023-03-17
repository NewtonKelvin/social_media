import Layout from "../../../components/layout";
import Image from "next/image";
import { getAPIClient } from "../../../services/axios";
import styled from "styled-components";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import Post from "../../../components/post";

const CoverImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;

  width: 100%;
  aspect-ratio: 14 / 5;
`;
const ProfileImage = styled.div`
  img {
    border-radius: 10px;
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1/1;

    height: 150px;
    width: 150px;
  }

  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const ProfileData = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto auto;

  grid-template-areas:
    "Name Data"
    "Username Data";
  h1 {
    grid-area: Name;
    color: var(--text);
  }
  h2 {
    grid-area: Username;
    color: var(--opacity);
  }
  div {
    grid-area: Data;
    justify-content: space-around;
    width: auto;
    display: flex;
    flex-direction: row;

    background-color: var(--primary);
    border-radius: 10px;
    padding: 10px 20px;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: var(--white);
      }
      span:first-child {
        font-size: 2rem;
        font-weight: 700;
      }
      span:last-child {
        font-size: 1rem;
        font-weight: 600;
      }
    }
  }
`;

const CustomTabs = styled(Box)`
  margin: 20px 0;
  background-color: var(--input);
  border-radius: 10px;
  button {
    color: var(--text);
  }
  button[aria-selected="true"] {
    border-radius: 10px;
    margin: 5px;
    background-color: var(--primary);
    color: var(--white);
  }
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Profile({ profile, posts, uLikes }) {
  const [likeList, setLikeList] = useState(uLikes);

  const [tabs, setTabs] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChangeTabs = (event, newValue) => {
    setTabs(newValue);
  };

  return (
    <Layout title={`Profile`}>
      <Grid container>
        <Grid md={12} xs={12}>
          <CoverImage
            src={`${process.env.BACK_END}/image/${profile?.cover}`}
            layout="intrinsic"
            height={500}
            width={1920}
            className="WithBackground"
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid md={2} xs={12}>
          <ProfileImage>
            <Image
              src={`${process.env.BACK_END}/image/${profile?.avatar}`}
              layout="intrinsic"
              width={150}
              height={150}
              className="WithBackground"
            />
          </ProfileImage>
        </Grid>

        <Grid md={10} xs={12}>
          <ProfileData>
            <h1>{profile?.name}</h1>
            <h2>@{profile?.username}</h2>
            <div>
              <div>
                <span>123K</span>
                <span>Followers</span>
              </div>
              <div>
                <span>123K</span>
                <span>Followers</span>
              </div>
              <div>
                <span>123K</span>
                <span>Followers</span>
              </div>
            </div>
          </ProfileData>
        </Grid>

        <Grid md={12}>
          <CustomTabs>
            <Tabs
              value={tabs}
              onChange={handleChangeTabs}
              aria-label="basic tabs example"
              variant="fullWidth"
              indicatorColor="transparent"
            >
              <Tab label="Posts" {...a11yProps(0)} />
              <Tab label="Tagged" {...a11yProps(1)} />
              <Tab label="Likes" {...a11yProps(2)} />
              <Tab label="Bookmarks" {...a11yProps(3)} />
            </Tabs>
          </CustomTabs>
          <TabPanel value={tabs} index={0}>
            {posts.map((post, index) => {
              return (
                <>
                  {post && profile && (
                    <Post
                      key={index}
                      profile={profile}
                      post={post}
                      liked={
                        likeList.some(() => likeList.includes(post.token))
                          ? true
                          : false
                      }
                      setLikeList={setLikeList}
                    />
                  )}
                </>
              );
            })}
          </TabPanel>
          <TabPanel value={tabs} index={1}>
            Tagged
          </TabPanel>
          <TabPanel value={tabs} index={2}>
            Likes
          </TabPanel>
          <TabPanel value={tabs} index={3}>
            Bookmarks
          </TabPanel>
        </Grid>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const { profile: username } = ctx.params;
  if (!username) {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", "/feed");
    return { props: {} };
  }

  let profile = null;
  let posts = null;
  let uLikes = null;

  const apiClient = getAPIClient(ctx);

  //Pega os dados do perfil
  await apiClient
    .get(`/profile/${username}`)
    .then(async ({ data }) => {
      profile = data.user;
    })
    .catch(() => {
      ctx.res.statusCode = 302;
      ctx.res.setHeader("Location", "/feed");
      ctx.res.end();
      return { props: {} };
    });

  //Pega as publicações do perfil
  await apiClient
    .get(`/posts/${username}`)
    .then(async ({ data }) => {
      posts = data.posts;
    })
    .catch(() => {
      ctx.res.statusCode = 302;
      ctx.res.setHeader("Location", "/feed");
      ctx.res.end();
      return { props: {} };
    });
  //Pega os likes do usuário
  await apiClient
    .get("/userLikes")
    .then(async ({ data }) => {
      uLikes = data.likes;
    })
    .catch(() => {
      ctx.res.statusCode = 302;
      ctx.res.setHeader("Location", "/feed");
      ctx.res.end();
      return { props: {} };
    });

  // Pass data to the page via props
  return {
    props: { profile, posts, uLikes },
  };
};
