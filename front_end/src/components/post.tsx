import { useState } from "react";
import StyledCarousel from "./carousel";
import Image from "next/image";
import StyledButton from "./button";
import {
  Comment,
  Delete,
  Edit,
  Favorite,
  ReplyAll,
  Send,
} from "@mui/icons-material";
import formatNumber from "../utils/formatNumber";
import moment from "moment";
import styled from "styled-components";

import { Comments, Post, User } from "../types/post";
import { api } from "../services/api";
import { useContext } from "react";
import { AlertContext } from "../pages/_app";
import StyledInput from "./input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

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
    grid-template-columns: 60px auto 60px;
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
      margin: 0;
      grid-area: Actions;
      color: var(--opacity);
      cursor: pointer;
      svg {
        margin: 0 5px;
      }
      & svg:hover {
        color: var(--red);
        transition: color var(--transition);
      }
    }
  }
`;

export interface PostType {
  size: "extended" | "short";
  profile: User;
  post: Post;
  liked: boolean;
  setLikeList: (likeList: string[]) => void;
}

const PostComponent = ({
  size,
  profile,
  post,
  liked,
  setLikeList,
}: PostType) => {
  //Dialog anchor
  const [newComment, setNewComment] = useState({
    token: "",
    postToken: post.token,
    value: "",
  });

  const [confirmDialog, setConfirmDialog] = useState(false);
  const [formDialog, setFormDialog] = useState(false);
  const handleOpenConfirmDialog = (comment: Comments) => {
    setNewComment(comment);
    setConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog(false);
  };
  const handleOpenFormDialog = (comment: Comments) => {
    setNewComment(comment);
    setFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setFormDialog(false);
  };

  const errorMessage =
    "🤖🔧 Falha ao realizar ação, tente novamente mais tarde";

  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } =
    useContext(AlertContext);

  const [allComments, setAllComments] = useState(post?.comments);

  const onLike = async () => {
    await api
      .put(`/postLike/${post.token}`)
      .then((response) => {
        post.likes = response.data.postLikes;
        setLikeList(response.data.userLikes);
      })
      .catch(({ response }) => {
        handleAlertSeverity("error");
        handleAlertMessage(response.data.message || errorMessage);
        handleAlertOpen(true);
      });
  };

  type FormValues = {
    comment: string;
  };

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async ({ comment }) => {
    await api
      .put("/postComment", {
        token: post.token,
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

  const deleteComment = async () => {
    await api
      .delete(`/deleteComment/${newComment.postToken}/${newComment.token}`)
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
    handleCloseConfirmDialog();
  };

  const updateComment = async () => {
    await api
      .put(`/updateComment/${newComment.postToken}/${newComment.token}`, {
        value: newComment.value,
      })
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
    handleCloseFormDialog();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment((prev) => {
      return { ...prev, value: event.target.value };
    });
  };

  const source = profile?.avatar.includes("http")
    ? profile?.avatar
    : `${process.env.BACK_END}/image/${profile?.avatar}`;

  return (
    <>
      <CustomFeed>
        <Grid container gap={1}>
          <Grid md={12} xs={12}>
            <StyledCarousel unoptimized={false} slideList={post?.files} />
          </Grid>

          <Grid md={12} xs={12}>
            <div className="Profile">
              <div className="Photo">
                <Image
                  src={source}
                  layout="fixed"
                  height={60}
                  width={60}
                  className="WithBackground"
                  alt="1"
                />
              </div>
              <div className="Name">{profile?.name}</div>
              <div className="Username">
                @{profile?.username} - {moment(post?.updatedAt).fromNow()}
              </div>
            </div>
          </Grid>

          <Grid md={12} xs={12} className="Description">
            {post.description}
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid xl={2} md={4} sm={12} xs={12} className="Numbers">
              <StyledButton className={liked ? "primary" : "opacity"} square>
                <button onClick={() => onLike()}>
                  <Favorite />
                </button>
              </StyledButton>
              {formatNumber(post.likes)} {post.likes == 1 ? "Like" : "Likes"}
            </Grid>
            <Grid xl={2} md={4} sm={12} xs={12} className="Numbers">
              <StyledButton className="opacity" square>
                <button>
                  <Comment />
                </button>
              </StyledButton>
              {formatNumber(allComments?.length)}{" "}
              {allComments?.length == 1 ? "Comment" : "Comments"}
            </Grid>
            <Grid xl={2} md={4} sm={12} xs={12} className="Numbers">
              <StyledButton className="opacity" square>
                <button>
                  <ReplyAll />
                </button>
              </StyledButton>
              {formatNumber(post.shares)}{" "}
              {post.shares == 1 ? "Share" : "Shares"}
            </Grid>
          </Grid>

          <Grid md={12} xs={12}>
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
          </Grid>
          <Grid md={12} xs={12}>
            {allComments?.map((comment, index) => {
              return (
                <Grid container key={index} marginY={1}>
                  <Grid md={12}>
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
                          {moment(comment.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className="Actions">
                        <Delete
                          fontSize="small"
                          onClick={() => handleOpenConfirmDialog(comment)}
                        />
                        <Edit
                          fontSize="small"
                          onClick={() => handleOpenFormDialog(comment)}
                        />
                      </div>
                      <div className="Comment">{comment.value}</div>
                    </div>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Dialog
          open={confirmDialog}
          onClose={handleCloseConfirmDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"🤔 Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete this comment you cannot go back. Right below it
              click confirm to proceed or cancel to go back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteComment}>Confirm</Button>
            <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={formDialog}
          onClose={handleCloseFormDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>🪶 Editar comentário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Write something wrong? No problem, insert the new text below to
              edit the comment.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Edit comment"
              type="text"
              fullWidth
              variant="standard"
              value={newComment?.value}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={updateComment}>Edit</Button>
            <Button onClick={handleCloseFormDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </CustomFeed>
    </>
  );
};

export default PostComponent;
