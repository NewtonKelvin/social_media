import Layout from "../../../components/layout";
import Image from "next/image";
import { getAPIClient } from "../../../services/axios";
import styled from "styled-components";
import { Box, Grid, Tab, Typography } from "@mui/material";
import { useState } from "react";

import ImageGrid from "../../../components/imageGrid";
import {
  PersonPin,
  PhotoLibrary,
  ThumbUp,
  Bookmark,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

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

const ProfileData = styled(Grid)`
  color: var(--text);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: var(--primary);
  border-radius: 10px;
  padding: 10px;
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
`;

const CustomTabs = styled(Box)`
  /* width: 300px; */
  div.MuiBox-root {
    border: none;
  }
  div.MuiTabs-root {
    margin: 20px 0;
    background-color: var(--input);
    border-radius: 10px;
  }
  /* width: 300px; */
  button {
    color: var(--text);
  }
  button[aria-selected="true"] {
    border-radius: 10px;
    margin: 5px;
    background-color: var(--primary);
    color: var(--white);
  }
  span.MuiTabs-indicator {
    display: none;
  }
`;

export default function Profile({ profile, posts }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout title={`Profile`}>
      <Grid container alignItems={"center"}>
        <Grid item md={12} xs={12}>
          <CoverImage
            src={`${process.env.BACK_END}/image/${profile?.cover}`}
            layout="intrinsic"
            height={500}
            width={1920}
          />
        </Grid>
        <Grid item md={1} xs={2}>
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
        <Grid item md={8} xs={10}>
          <Typography>{profile?.name}</Typography>
          <Typography>@{profile?.username}</Typography>
        </Grid>
        <ProfileData item md={3} xs={12}>
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
        </ProfileData>
        <Grid item md={12} xs={12}>
          <CustomTabs xs={{ width: "200px" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    icon={<PhotoLibrary />}
                    iconPosition="start"
                    label="Posts"
                    value="1"
                  />
                  <Tab
                    label="Tagged"
                    value="2"
                    icon={<PersonPin />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Liked"
                    value="3"
                    icon={<ThumbUp />}
                    iconPosition="start"
                  />
                  <Tab
                    label="Bookmark"
                    value="4"
                    icon={<Bookmark />}
                    iconPosition="start"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ImageGrid postList={posts} />
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item Four</TabPanel>
            </TabContext>
          </CustomTabs>
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

  // Pass data to the page via props
  return {
    props: { profile, posts },
  };
};
