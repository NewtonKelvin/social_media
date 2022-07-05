//Next React
import { useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import Link from "next/link"
//Style
import styled from "styled-components"
//Context
import { AuthContext } from "../../context/AuthContext"
import { AlertContext } from "../_app"
import NProgress from "nprogress"
//API
import { api } from "../../services/api"
import { getAPIClient } from "../../services/axios"
//Bootstrap
import { Col, Row } from "react-bootstrap"
//Components
import Layout from "../../components/layout"
import StyledInput from "../../components/input"
import StyledButton from "../../components/button"
import StyledBreadcrumb from "../../components/breadcrumb"
//Icons
import { AccountCircle, AttachFile, Mail, Tag } from "@mui/icons-material"

const CustomEditProfile = styled.div`
  img {
    border-radius: 10px;
  }
  label {
    margin-left: 20px;
  }
  .Image {
    margin: 0;
    padding: 0;
  }
  .Cover img {
    width: 100%;
    height: auto;
  }
  textarea {
    width: calc(100% - 15px);
    height: 200px;
  }
`
const CustomInput = styled.div`
  img {
    border-radius: 10px;
    object-fit: cover;
    /* height: 300px !important; */
    /* width: 820px !important; */

    width: 100%;
    aspect-ratio: 14 / 5;

  }
  input {
    display: none;
  }
  .Upload {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: -60px;
    margin-left: 10px;
    position: absolute;

    background-color: var(--primary);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    svg {
      color: var(--white);
    }
  }
`;

export default function EditProfile({ usuario }) {

  const { user } = useContext(AuthContext)

  const [avatarPicture, setAvatarPicture] = useState(`${process.env.BACK_END}/image/${usuario.avatar}`)
  const [coverPicture, setCoverPicture] = useState(`${process.env.BACK_END}/image/${usuario.cover}`)

  useEffect(() => {
    setAvatarPicture(`${process.env.BACK_END}/image/${usuario.avatar}`)
    setCoverPicture(`${process.env.BACK_END}/image/${usuario.cover}`)
  }, [usuario.avatar, usuario.cover])
  
  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } = useContext(AlertContext)
  const [errors, setErrors] = useState('')

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      "name": usuario.name,
      "username": usuario.username,
      "email": usuario.email,
      "bio": usuario.bio
    }
  })

  const profilePic = useRef(null)
  const coverPic = useRef(null)

  const onSubmit = async (data) => {

    NProgress.start()

    await api.post("/profile/update", data)
    .then((response) => {

      usuario.name = data.name
      usuario.username = data.username
      usuario.bio = data.bio
      user.name = data.name
      user.username = data.username
      user.bio = data.bio

      handleAlertSeverity('success')
      handleAlertMessage(response.data.message)
      setErrors('')
      handleAlertOpen(true)
      
    }).catch(({response}) => {

      handleAlertSeverity('error')
      handleAlertMessage(response.data.message)
      setErrors(response.data.field)
      handleAlertOpen(true)

    })

    NProgress.done()

  }

  const handleCover = async (event) => {

    NProgress.start();

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("cover", file)
    if(file){
      setCoverPicture(URL.createObjectURL(file))
      await api.post("/profile/updateCover", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {

        usuario.cover = response.data.filename
        user.cover = response.data.filename

        handleAlertSeverity('success')
        handleAlertMessage(response.data.message)
        setErrors('')
        handleAlertOpen(true)
        
      }).catch(({response}) => {
  
        handleAlertSeverity('error')
        handleAlertMessage(response.data.message)
        setErrors(response.data.field)
        handleAlertOpen(true)
  
      })
    }

    NProgress.done();

  }

  const handleAvatar = async (event) => {

    NProgress.start();

    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("avatar", file)
    if(file){
      setAvatarPicture(URL.createObjectURL(file))
      await api.post("/profile/updateAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {

        usuario.avatar = response.data.filename
        user.avatar = response.data.filename

        handleAlertSeverity('success')
        handleAlertMessage(response.data.message)
        setErrors('')
        handleAlertOpen(true)
        
      }).catch(({response}) => {
  
        handleAlertSeverity('error')
        handleAlertMessage(response.data.message)
        setErrors(response.data.field)
        handleAlertOpen(true)
  
      })
    }

    NProgress.done();

  }

  return (
    <Layout
      title="Edit profile"
      breadcrumbs={(
        <StyledBreadcrumb>
          <Link href="#" className='disabled-link'>Configurations</Link>
          <Link href="/config/editProfile">Edit profile</Link>
        </StyledBreadcrumb>
      )}
    >
      <CustomEditProfile>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

          <Row>
            <Col className="Cover">

              <label>Cover picture:</label>

              <CustomInput style={{ marginTop: "15px" }}>

                <Image
                  src={coverPicture}
                  layout="intrinsic"
                  height={1080}
                  width={1920}
                  className="WithBackground"
                />

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={(e) => {
                    coverPic.current = e
                  }}
                  onChange={(event) => handleCover(event)}
                />
                
                <div className="Upload">
                  <AttachFile onClick={() => coverPic.current.click()} />
                </div>
              </CustomInput>

            </Col>
          </Row>

          <Row>
            <Col xl={3} className="Profile">
              <label>Profile picture:</label>

              <CustomInput style={{ marginTop: "15px" }}>

                <Image
                  src={avatarPicture}
                  layout="fixed"
                  width={200}
                  height={200}
                  className="WithBackground"
                />

                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={(e) => {
                    profilePic.current = e
                  }}
                  onChange={(event) => handleAvatar(event)}
                />
                
                <div className="Upload">
                  <AttachFile onClick={() => profilePic.current.click()} />
                </div>

              </CustomInput>
            </Col>

            <Col xl={9}>
              <label>Bio message:</label>
              <textarea
                name="bio"
                {...register("bio")}
              />
            </Col>
            
            <Col lg={4}>
              <StyledInput>
                <label>Name:</label>
                <AccountCircle />
                <input
                  type="text"
                  placeholder="Insert your name..."
                  aria-invalid={errors == "name" ? "true" : "false"}
                  {...register("name")}
                />
              </StyledInput>
            </Col>

            <Col lg={4}>
              <StyledInput>
                <label>Username:</label>
                <Tag />
                <input
                  type="text"
                  placeholder="Insert your username..."
                  aria-invalid={errors == "username" ? "true" : "false"}
                  {...register("username")}
                />
              </StyledInput>
            </Col>

            <Col lg={4}>
              <StyledInput>
                <label>Email:</label>
                <Mail />
                <input
                  type="email"
                  placeholder="Insert your email..."
                  aria-invalid={errors == "email" ? "true" : "false"}
                  {...register("email")}
                  disabled
                />
              </StyledInput>
            </Col>

          </Row>
          <Row>

            <Col lg={{ span: 4, offset: 4 }} style={{ margin: "20px 0" }}>
              <StyledButton>
                <button type="submit">Save</button>
              </StyledButton>
            </Col>

          </Row>

        </form>
      </CustomEditProfile>
    </Layout>
  );

}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx)
  // Fetch data from external API
  const response = await apiClient.get('/userByToken')

  const responseAvatar = await apiClient.get(`/image/${response.data.user.avatar}`)
  const responseCover = await apiClient.get(`/image/${response.data.user.cover}`)

  const usuario = response.data.user

  // Pass data to the page via props
  return {
    props: { usuario }
  }

}
