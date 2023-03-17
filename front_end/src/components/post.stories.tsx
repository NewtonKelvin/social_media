// YourComponent.stories.js|jsx

import { useState } from "react";
import Post, { PostType } from "./post";

//👇 This default export determines where your story goes in the story list
export default {
  title: "Components/Post",
  component: Post,
};

//👇 We create a “template” of how args map to rendering
const Template = ({ post, profile }: PostType) => {
  const [likeList, setLikeList] = useState([""]);
  const liked = likeList.some(() => likeList.includes(post.token))
    ? true
    : false;

  const handleLikeList = (list: string[]) => {
    setLikeList(list);
  };

  return (
    <Post
      profile={profile}
      liked={liked}
      setLikeList={() => handleLikeList([post.token])}
      post={post}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  post: {
    files: [
      "post/b8b282c29afdae6a3f2f/44ee3c371da96cec3a77",
      "post/b8b282c29afdae6a3f2f/977194a0956fce426bb0",
      "post/b8b282c29afdae6a3f2f/702c397b88a0bbd59b90",
      "post/b8b282c29afdae6a3f2f/696c154965535a56023b",
      "post/b8b282c29afdae6a3f2f/1906826067797be6495e",
    ],
    id: 1,
    token: "ba7a3fc21bc8c49b285a",
    userId: 1,
    description: "Teste 123 xD",
    privacity: "public",
    likes: 1,
    shares: 0,
    createdAt: "2023-02-10T20:55:37.000Z",
    updatedAt: "2023-03-07T03:53:00.000Z",
    comments: [
      {
        id: 1,
        token: "4f6f283dd54c381b19eb",
        postToken: "709147632327d11c185c",
        value: "Este é um comentário de teste 1!!!",
        likes: 0,
        updatedAt: "2023-03-16T18:39:56.000Z",
        userId: 1,
        user: {
          id: 1,
          name: "Kelvin Newton",
          username: "kelvin.newton",
          avatar: "avatar/f5fa80108104fab53a4f",
        },
      },
      {
        id: 2,
        token: "b12adc8e35cafd8cad95",
        postToken: "709147632327d11c185c",
        value: "Este é um comentário de teste 2!!!",
        likes: 0,
        updatedAt: "2023-03-16T18:40:04.000Z",
        userId: 1,
        user: {
          id: 1,
          name: "Kelvin Newton",
          username: "kelvin.newton",
          avatar: "avatar/f5fa80108104fab53a4f",
        },
      },
      {
        id: 3,
        token: "34e5d0f22ca60cbd12be",
        postToken: "709147632327d11c185c",
        value: "Este é um comentário de teste 3!!!",
        likes: 0,
        updatedAt: "2023-03-16T18:52:10.000Z",
        userId: 1,
        user: {
          id: 1,
          name: "Kelvin Newton",
          username: "kelvin.newton",
          avatar: "avatar/f5fa80108104fab53a4f",
        },
      },
    ],
  },
  profile: {
    id: 1,
    username: "kelvin.newton",
    name: "Kelvin Newton",
    avatar: "avatar/f5fa80108104fab53a4f",
  },
};
