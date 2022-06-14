//Next and React
import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useForm } from 'react-hook-form'
//Packages
import { Box, Grid, Snackbar } from "@mui/material"
import Slide from '@mui/material/Slide'
import { Alert, Color } from '@material-ui/lab'
import { Col, Row } from "react-bootstrap"
//Style
import { StyledContainerL, StyledContainerR } from "../styles/login"
//Images
import Logotipo from "../../public/images/logotipo_name_blue.svg"
//Components
import StyledInput from "../components/input"
import StyledButton from "../components/button"
//Icons
import { AccountCircle, Fingerprint } from "@mui/icons-material"

export default function Login() {

  interface LoginErros {
    username: boolean,
    password: boolean
  }

  interface LoginFunction {
    data:(
      username: string,
      password: string
    ) => void
  }

  const [errors, setErrors] = useState<LoginErros>()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<Color>('error')

  const { register, handleSubmit } = useForm()

  async function handleSignin(data:LoginFunction) {

    /*const response = await signIn(data)

    if (response) {
      if (response.error === true) {
        setAlertSeverity('error')
        setErrors(response.errors)
      } else {
        setAlertSeverity('success')
      }

      if (response.message === "Primeiro login? Altere sua senha!")
        handleForgotPassword()

      setAlertMessage(response.message)
      setAlertOpen(true)
    }*/

  }

  return (
    <>

      <Head>
        <title>SOCIAL_MEDIA | LOGIN</title>
      </Head>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="info"
        //{alertSeverity}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Row style={{ margin: "0" }}>
        <Col xl={6} style={{ padding: "0" }}>

          <StyledContainerL>
            <Row>

              <Col>
                <Link href="/">
                  Back to the home page
                </Link>
              </Col>

              <Col md={{ span: 6, offset: 3 }} style={{ display: "flex", flexDirection: "column" }}>
                <form onSubmit={handleSubmit(handleSignin)} autoComplete='off'>

                  <Image src={Logotipo} layout="responsive" priority={true} />

                  <StyledInput>
                    <label>Username:</label>
                    <AccountCircle />
                    <input
                      type="text"
                      placeholder="Insert your username..."
                      aria-invalid={errors?.username ? "true" : "false"}
                      {...register('username')}
                    />
                  </StyledInput>

                  <StyledInput>
                    <label>Password:</label>
                    <Fingerprint />
                    <input
                      type="password"
                      placeholder="Insert your password..."
                      aria-invalid={errors?.password ? "true" : "false"}
                      {...register('password')}
                    />
                  </StyledInput>

                  <Link href="#">Forgot your password? Click here</Link>

                  <StyledButton>
                    <button type="button">
                      Login
                    </button>
                  </StyledButton>

                  <Link href="/register">Dont have a account? Register here</Link>

                </form>
              </Col>

              <Col style={{ display: "flex", alignItems: "end" }}>
                <Link href="#">
                  Contact the admin
                </Link>
              </Col>

            </Row>
          </StyledContainerL>

        </Col>
        <Col xl={6} style={{ padding: "0" }}>

          <StyledContainerR>

            <Row>
              <Col md={{ span: 8, offset: 2 }} style={{ display: "flex", flexDirection: "column" }}>

                <h1>What is Lorem Ipsum?</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                  <li>Vivamus faucibus enim molestie lectus cursus, id volutpat risus ullamcorper.</li>
                  <li>Maecenas pulvinar turpis vel arcu posuere ultrices.</li>
                  <li>Integer sagittis ex eget urna commodo scelerisque.</li>
                  <li>Nullam dapibus leo eget arcu varius, sit amet porta magna congue.</li>
                  <li>Suspendisse aliquet mauris non est lacinia pretium.</li>
                  <li>Nunc finibus magna ac metus tincidunt, et dignissim nunc gravida.</li>
                </ul>

              </Col>
            </Row>

          </StyledContainerR>

        </Col>
      </Row>

    </>
  )
}
