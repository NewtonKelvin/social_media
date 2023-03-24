import { Post } from "../types/post";
import Image from "next/image";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Link from "next/link";

interface ImageGridType {
  postList: Post[];
}

const CustomImage = styled(Image)`
  object-fit: cover;
  border-radius: 10px;

  -webkit-filter: grayscale(0) blur(0);
  filter: grayscale(0) blur(0);
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;

  :hover {
    cursor: pointer;

    -webkit-filter: grayscale(100%) blur(3px);
    filter: grayscale(100%) blur(3px);
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;

const ImageGrid = ({ postList }: ImageGridType) => {
  return (
    <>
      <Grid container>
        {postList ? (
          postList.map((post, index) => {
            return (
              <Grid
                key={index}
                lg={4}
                md={6}
                xs={12}
                style={{ padding: "5px" }}
              >
                <Link href={`/post/${post.token}`}>
                  <CustomImage
                    src={`${process.env.BACK_END}/image/${post.files[0]}`}
                    layout="responsive"
                    height={400}
                    width={400}
                    alt="1"
                  />
                </Link>
              </Grid>
            );
          })
        ) : (
          <>🧐 Ainda não há nenhuma publicação</>
        )}
      </Grid>
    </>
  );
};

export default ImageGrid;
