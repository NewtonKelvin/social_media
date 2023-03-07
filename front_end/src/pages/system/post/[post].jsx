//Next React
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
//React Bootstrap / Material UI
import { Col, Row } from "react-bootstrap";
//Components
import Layout, { LayoutContext } from "../../../components/layout";
import StyledCarousel from "../../../components/carousel";
import StyledButton from "../../../components/button";
import StyledInput from "../../../components/input";
//Context
import { getAPIClient } from "../../../services/axios";
import { AlertContext } from "../../_app";
import { useAuth } from "../../../context/AuthContext";
//Moment
import * as moment from "moment";
moment.locale("pt-br");
import "moment/locale/pt-br";
//Icons
import { Comment, Delete, Favorite, ReplyAll, Send } from "@mui/icons-material";
//Utils
import formatNumber from "../../../utils/formatNumber";
import { useForm } from "react-hook-form";
//API
import { api } from "../../../services/api";

const CustomFeed = styled.div`
  div.row {
    margin: 10px 0;
  }
  .Profile {
    margin: 5px 0px 15px 0px;
    display: grid;
    grid-template-areas:
      "Photo Name"
      "Photo Username";
    grid-template-columns: 60px 1fr;
    align-items: center;
    .Photo {
      grid-area: Photo;
      padding: 0;
      display: flex;
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
  .Description {
    margin: 0 10px;
    grid-area: Description;
    font-size: 1rem;
    font-weight: bold;
    color: var(--text);
    transition: color var(--transition);
  }
  .Numbers {
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-weight: bold;
    align-items: center;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }
  .MyPhoto {
    img {
      border-radius: 5px;
    }
  }
  .Comments {
    display: grid;
    grid-template-areas:
      "Photo Name Actions"
      "Photo Comment Comment";
    grid-template-columns: 60px auto 40px;
    align-items: center;
    background-color: var(--input);
    border-radius: 10px;
    padding: 10px;
    transition: background-color var(--transition);

    @media (max-width: 500px) {
      .Username {
        display: none;
      }
    }

    .Photo {
      grid-area: Photo;
      padding: 0 5px;
      display: flex;
      border-radius: 10px;

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
      width: auto;

      word-break: break-all;
      overflow: hidden;
      transition: color var(--transition);
    }
    .Username {
      margin: 0 10px;
      font-size: 1rem;
      font-weight: bold;
      color: var(--opacity);

      word-break: keep-all;
      overflow: hidden;
    }
    .Comment {
      margin: 0 10px;
      grid-area: Comment;
      font-size: 1.2rem;
      font-weight: normal;
      color: var(--text);
      width: auto;

      overflow: hidden;
      transition: color var(--transition);
    }
    .Actions {
      margin: 0 10px;
      grid-area: Actions;
      color: var(--opacity);
      transition: color var(--transition);
      cursor: pointer;
      &:hover {
        color: var(--red);
      }
    }
  }
`;

export default function Feed({ post, comments, uLikes }) {
  const router = useRouter();
  const { post: token } = router.query;

  const { scrollToTop, scrollToBottom } = useContext(LayoutContext);

  const { user } = useAuth();

  const [liked, setLiked] = useState(
    uLikes.some(() => uLikes.includes(token)) ? true : false
  );
  const [allComments, setAllComments] = useState(comments);

  let errorMessage = "🤖🔧 Falha ao realizar ação, tente novamente mais tarde";

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    reset,
  } = useForm();
  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } =
    useContext(AlertContext);

  const onSubmit = async ({ comment }) => {
    await api
      .put("/postComment", {
        token,
        comment,
      })
      .then(({ data }) => {
        setAllComments(data.comments);
        reset();
        handleAlertSeverity("success");
        handleAlertMessage(data.message || errorMessage);
        handleAlertOpen(true);
      })
      .catch(({ response }) => {
        handleAlertSeverity("error");
        handleAlertMessage(response.data.message || errorMessage);
        handleAlertOpen(true);
      });
  };

  const onLike = async () => {
    await api
      .put(`/postLike/${token}`)
      .then((response) => {
        post.likes = response.data.postLikes;
        uLikes = response.data.userLikes;
        setLiked(uLikes.some(() => uLikes.includes(token)) ? true : false);
      })
      .catch(({ response }) => {
        handleAlertSeverity("error");
        handleAlertMessage(response.data.message || errorMessage);
        handleAlertOpen(true);
      });
  };

  const deleteComment = async (token) => {
    await api
      .delete(`/deleteComment/${post.token}/${token}`)
      .then((response) => {
        setAllComments(response.data.comments);

        handleAlertSeverity("success");
        handleAlertMessage(response.data.message);
        handleAlertOpen(true);
      })
      .catch(({ response }) => {
        handleAlertSeverity("error");
        handleAlertMessage(response.data.message || errorMessage);
        handleAlertOpen(true);
      });
  };

  return (
    <>
      <Layout title={`${post.user.name}'s post`}>
        <CustomFeed>
          <Row>
            <Col>
              <StyledCarousel slideList={post.files} />
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 12, offset: 0 }}>
              <div className="Profile">
                <div className="Photo">
                  <Image
                    src={`${process.env.BACK_END}/image/${post.user.avatar}`}
                    layout="fixed"
                    height={60}
                    width={60}
                    className="WithBackground"
                  />
                </div>
                <div className="Name">{user?.name}</div>
                <div className="Username">
                  @{user?.username} - {moment(post.createdAt).fromNow()}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="Description">{post.description}</Col>
          </Row>
          <Row>
            <Col md={3} className="Numbers">
              <StyledButton className={liked ? "primary" : "opacity"} square>
                <button onClick={() => onLike()}>
                  <Favorite />
                </button>
              </StyledButton>
              {formatNumber(post.likes)} {post.likes == 1 ? "Like" : "Likes"}
            </Col>
            <Col md={3} className="Numbers">
              <StyledButton className="opacity" square>
                <button>
                  <Comment />
                </button>
              </StyledButton>
              {formatNumber(allComments.length)}{" "}
              {allComments.length == 1 ? "Comment" : "Comments"}
            </Col>
            <Col md={3} className="Numbers">
              <StyledButton className="opacity" square>
                <button onClick={scrollToBottom}>
                  <ReplyAll />
                </button>
              </StyledButton>
              {formatNumber(post.shares)}{" "}
              {post.shares == 1 ? "Share" : "Shares"}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <StyledInput>
                <form onSubmit={handleSubmitComment(onSubmit)}>
                  <label htmlFor="">Deixe um comentário:</label>
                  <Comment fontSize="small" />
                  <input
                    type="text"
                    placeholder="Insert a comment..."
                    {...registerComment("comment")}
                  />
                  <button type="submit">
                    <Send fontSize="small" />
                  </button>
                </form>
              </StyledInput>
            </Col>
          </Row>
          {allComments.map((comment, index) => {
            return (
              <Row key={index}>
                <Col md={12}>
                  <div className="Comments">
                    <div className="Photo">
                      <Image
                        src={`${process.env.BACK_END}/image/${comment.user.avatar}`}
                        layout="intrinsic"
                        height={80}
                        width={80}
                        className="WithBackground"
                      />
                    </div>
                    <div className="Name">
                      {comment.user.name}
                      <span className="Username">
                        @{comment.user.username} -{" "}
                        {moment(comment.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="Actions">
                      <Delete
                        fontSize="small"
                        onClick={() => deleteComment(comment.token)}
                      />
                    </div>
                    <div className="Comment">{comment.value}</div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </CustomFeed>
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
  let comments = null;
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

  //Pega os comentários da publicação
  await apiClient
    .get(`/postComments/${token}`)
    .then(async ({ data }) => {
      comments = data.comments;
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
    props: { post, uLikes, comments },
  };
};
