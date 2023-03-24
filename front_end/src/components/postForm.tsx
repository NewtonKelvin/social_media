import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";

import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { AlertContext } from "../pages/_app";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Close, Group, Lock, Public, Send } from "@mui/icons-material";
import { api } from "../services/api";
import StyledToggle from "./toggle";
import StyledButton from "./button";
import { PageInfo } from "./layout";

const CustomDropzone = styled.div`
  .dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--opacity);
    text-align: center;

    padding: 20px;
    height: 200px;
    border: 1px dashed var(--opacity) !important;
    border-radius: 10px;
  }
  .thumbs {
    padding: 10px;
    display: flex;
    flex-direction: row;
    gap: 0 10px;
    overflow: auto;
    width: auto;
    img {
      border-radius: 10px;
      object-fit: cover;
    }
  }
  div.row > div {
    margin: 10px 0;
  }
`;

interface PostFormType {
  description: string;
  files?: File[];
  privacy?: "public" | "private" | "friends";
}

interface PostElementType {
  formOpen: boolean;
  handleFormOpen: () => void;
  handleFormClose: () => void;
}

const PostForm = ({
  formOpen: modalOpen,
  handleFormOpen,
  handleFormClose,
}: PostElementType) => {
  //Create Post Modal
  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } =
    useContext(AlertContext);

  // const [modalOpen, setModalOpen] = useState(false);
  const [toggleValue, setToggleValue] = useState("public");

  const [errors, setErrors] = useState("");
  const router = useRouter();

  const handleToggleValue = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setToggleValue(newValue);
  };

  const { register: registerModal, handleSubmit: handleSubmitModal } =
    useForm<PostFormType>();

  //Dropzone
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file, index) => (
    <div key={index}>
      <Image
        src={file.preview}
        layout="fixed"
        height={200}
        width={200}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const ToggleValues = [
    {
      name: "Public",
      icon: <Public />,
      value: "public",
    },
    {
      name: "Friends",
      icon: <Group />,
      value: "friends",
    },
    {
      name: "Private",
      icon: <Lock />,
      value: "private",
    },
  ];

  const postSubmit: SubmitHandler<PostFormType> = async (data) => {
    const formData = new FormData();
    files.map((image) => {
      formData.append("files", image);
    });
    formData.append("privacity", toggleValue);
    formData.append("description", data.description);

    await api
      .post("/newPost", formData)
      .then((response) => {
        handleAlertSeverity("success");
        handleAlertMessage(`${response.data.message} Redirecionando...`);
        handleAlertOpen(true);

        // reset()
        setTimeout(() => {
          router.push(response.data.link);
        }, 3000);
      })
      .catch(({ response }) => {
        handleAlertSeverity("error");
        handleAlertMessage(response.data.message);
        setErrors(response.data.field);
        handleAlertOpen(true);
      });
  };

  return (
    <Dialog
      onClose={handleFormClose}
      aria-labelledby="customized-dialog-title"
      open={modalOpen}
      scroll={"paper"}
      maxWidth={"xl"}
      style={{ color: "red" }}
    >
      <DialogTitle id="customized-dialog-title" sx={{ m: 0, p: 2 }}>
        <PageInfo>
          <div className="Title">New post</div>
          <div className="Description">Lorem ipsum dolor sit amet</div>
        </PageInfo>
        <IconButton
          aria-label="close"
          onClick={handleFormClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={12}>
            <CustomDropzone>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                  Drag 'n' drop some files here, or click to select files
                  <br />
                  (Max.: 5 Files)
                </p>
              </div>
              <aside className="thumbs">{thumbs}</aside>
            </CustomDropzone>
          </Grid>
          <Grid item lg={6} xs={12}>
            <form onSubmit={handleSubmitModal(postSubmit)} autoComplete="off">
              <label>Descrição:</label>
              <textarea
                rows={5}
                style={{ width: "100%" }}
                {...registerModal("description")}
                aria-invalid={errors == "password" ? "true" : "false"}
              />
              <label>Privacidade:</label>
              <StyledToggle
                title="Privacidade"
                values={ToggleValues}
                toggleValue={toggleValue}
                handleToggleValue={handleToggleValue}
              />
              <StyledButton>
                <button type="submit">
                  <Send />
                  Publish
                </button>
              </StyledButton>
            </form>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
