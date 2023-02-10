//React Next StyledComponents
import styled from "styled-components"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
//Images
import Logotipo from "../../public/images/logotipo.svg"
//Components
import StyledInput from "../components/input"
import StyledToggle from "../components/toggle"
//Icons
import { Search, Logout, Brightness3, WbSunny, Menu, Close, AddBox, Send } from "@mui/icons-material"
import { Group, Lock, Public } from "@mui/icons-material"
//Context
import { LayoutContext, PageInfo } from "./../components/layout"
import { ThemeContext, AlertContext } from "./../pages/_app"
import { useAuth } from "../context/AuthContext"
//Material UI - ReactBootstrap
import { Tooltip } from "@material-ui/core"
import Fade from "@mui/material/Fade"
import { Col, Modal, Row } from "react-bootstrap"
import { Container } from "@mui/system"
import StyledButton from "./button"
//Dropzone
import { useDropzone } from "react-dropzone"
//API
import { api } from "../services/api"

const CustomBrand = styled.div`
  /* height: 120px; */
  display: grid;
  grid-template-areas: "Logo Text";
  grid-template-columns: 60px 1fr;

  align-content: center;
  justify-content: space-around;
  align-items: center;

  span:first-of-type {
    margin: 0 auto !important;
  }

  .Logo {
    grid-area: Logo;
  }
  .Text {
    grid-area: Text;
    word-break: break;
    text-transform: uppercase;
    line-height: 40px;
    text-align: center;
    color: ${props => (props.isDark) ? "var(--white)" : "var(--primary)"};
    transition: color var(--transition);
    text-align: left;

    font-weight: bold;
    font-size: 1.3rem;
  }
`;

const CustomNavbar = styled.div`
  .Toggle {
    display: none;
  }
  @media (max-width: 768px){
    .Search, svg:not(.Toggle) {
      display: none;
    }
    .Toggle {
      display: inline;
    }
    .dropdown-menu {
      width: 100%;
    }
  }

  /* height: calc(var(--navbar-height) - 10px); */
  height: 100%;
  width: 100%!important;
  margin: 0!important;
  padding: 0!important;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  div {
    flex: 1;
    padding: 0;
  }
  .Brand {
    img {
      margin: 0;
      padding: 0;
    }
    .Text {
      color: var(--primary);
    }
    /* flex: 1; */
  }
  .Search {
    /* flex: 2; */
    padding: 0 !important;
    form > div {
      width: 300px;
      margin: 0 auto;
    }
  }
  .Shortcuts {
    /* flex: 1; */
    text-align: right;
    svg {
      margin: 0 10px;
      transition: color var(--transition);
      color: var(--text);
      &:hover {
        color: var(--primary);
      }
    }
    .Dropdown {
      margin: 0;
      padding: 0;
      button {
        color: var(--text) !important;
      }
      .dropdown-menu > a {
        color: var(--text) !important;
      }
    }
  }
  textarea {
    width: 100%;
  }
`

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
    }
  }
  div.row > div {
    margin: 10px 0;
  }
`


export default function Navbar(){

  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } = useContext(AlertContext)
  const { toggleTheme, isDark } = useContext(ThemeContext)
  const { sideOpen, setSideOpen } = useContext(LayoutContext)
  const { signOut } = useAuth()

  const [ modalOpen, setModalOpen ] = useState(false)
  const [ toggleValue, setToggleValue ] = useState(null)

  const [ errors, setErrors ] = useState('')
  const router = useRouter()

  const handleToggleValue = (event, newValue) => {
    setToggleValue(newValue)
  }

  //Dropzone
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map((file, index) => (
    // <Col md={4} key={index} className="text-center">
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
    // </Col>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const { register, handleSubmit } = useForm()
  const { register: registerModal, handleSubmit: handleSubmitModal } = useForm()

  const ToggleValues = [{
    name: "Public",
    icon: <Public />,
    value: "public"
  },{
    name: "Friends",
    icon: <Group />,
    value: "friends"
  },{
    name: "Private",
    icon: <Lock />,
    value: "private"
  }]

  const onSubmit = async (data) => {

    alert(data)

  }

  const postSubmit = async (data) => {

    const formData = new FormData()
    files.map(image => {
      formData.append("files", image)
    })
    formData.append("privacity", toggleValue)
    formData.append("description", data.description)
    
    await api.post('/newPost', formData)
    .then((response) => {
      
      handleAlertSeverity('success')
      handleAlertMessage(`${response.data.message} Redirecionando...`)
      handleAlertOpen(true)

      // reset()
      setTimeout(() => {
        router.push(response.data.link)
      }, 3000)
      
    }).catch(({response}) => {

      handleAlertSeverity('error')
      handleAlertMessage(response.data.message)
      setErrors(response.data.field)
      handleAlertOpen(true)

    })

  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }
  const handleModalClose = () => {
    setModalOpen(false)
  }

  return (
    <CustomNavbar>
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
        size="xl"
        animation={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col lg={6}>
                <CustomDropzone>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                      <br/>
                      (Max.: 5 Files)
                    </p>
                    
                  </div>
                  <aside className="thumbs">
                    {thumbs}
                  </aside>
                </CustomDropzone>
              </Col>
              <Col lg={6}>
                {/* <Col lg={6}> */}
                <PageInfo>
                  <div className="Title">New post</div>
                  <div className="Description">Lorem ipsum dolor sit amet</div>
                </PageInfo>
                {/* </Col> */}

                <form
                  onSubmit={handleSubmitModal(postSubmit)}
                  autoComplete="off"
                >
                  <label>Descrição:</label>
                  <textarea
                    name="description"
                    rows="5"
                    style={{ width: "100%" }}
                    {...registerModal("description")}
                    aria-invalid={errors == "password" ? "true" : "false"}
                  />
                  <label>Privacidade:</label>
                  <StyledToggle
                    selected="public"
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
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>

      <CustomBrand className="Brand">
        <Image
          className="Logo"
          src={Logotipo}
          layout="fixed"
          height={32}
          width={32}
          priority={true}
        />
        <span className="Text">SOCIAL_MEDIA</span>
      </CustomBrand>
      <div className="Search">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <StyledInput>
            <Search />
            <input
              type="text"
              placeholder="Search for something..."
              {...register("username")}
            />
            <button type="submit">
              <Send fontSize="small" />
            </button>
          </StyledInput>
        </form>
      </div>
      <div className="Shortcuts">
        <Tooltip TransitionComponent={Fade} title="Fazer uma nova publicação">
          <AddBox onClick={handleModalOpen} />
        </Tooltip>
        <Tooltip TransitionComponent={Fade} title="Alterar tema claro/escuro">
          {isDark === true ? (
            <Brightness3 onClick={toggleTheme} />
          ) : (
            <WbSunny onClick={toggleTheme} />
          )}
        </Tooltip>
        <Tooltip TransitionComponent={Fade} title="Sair do sistema">
          <Logout onClick={() => signOut()} />
        </Tooltip>

        {sideOpen === true ? (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Fechar menu"
          >
            <Close className="Toggle" onClick={() => setSideOpen(!sideOpen)} />
          </Tooltip>
        ) : (
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title="Abrir menu"
          >
            <Menu className="Toggle" onClick={() => setSideOpen(!sideOpen)} />
          </Tooltip>
        )}
      </div>
    </CustomNavbar>
  );
}
