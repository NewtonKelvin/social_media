//Next React
import { useState } from "react";
import { useRouter } from "next/router";

//Components
import Layout from "../../../components/layout";

//Context
import { getAPIClient } from "../../../services/axios";
//Moment
import * as moment from "moment";
moment.locale("pt-br");
import "moment/locale/pt-br";

import Post from "../../../components/post";

export default function Feed({ post, uLikes }) {
  const router = useRouter();
  const { post: token } = router.query;

  const [likeList, setLikeList] = useState(uLikes);

  return (
    <>
      <Layout title={`${post.user.name}'s post`}>
        <Post
          profile={post.user}
          post={post}
          liked={likeList.some(() => likeList.includes(token)) ? true : false}
          setLikeList={setLikeList}
        />
      </Layout>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { post: token } = ctx.params;
  if (!token) {
    ctx.res.statusCode = 302;
    ctx.res.setHeader("Location", "/feed");
    return { props: {} };
  }

  let post = null;
  let uLikes = null;

  const apiClient = getAPIClient(ctx);

  //Pega os dados da publicação
  await apiClient
    .get(`/post/${token}`)
    .then(async ({ data }) => {
      post = data.post;
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
    props: { post, uLikes },
  };
};
