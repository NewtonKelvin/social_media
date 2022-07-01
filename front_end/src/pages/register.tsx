//Next and React
import { useContext, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm, SubmitHandler } from "react-hook-form"
//Context
import { ThemeContext, AlertContext } from "./_app"
//API
import { api } from '../services/api'
//Packages
import { Box, Grid, Snackbar } from "@mui/material"
import Slide from '@mui/material/Slide'
import { Alert, Color } from '@material-ui/lab'
import { Col, Row } from "react-bootstrap"
//Style
import { StyledContainerL, StyledContainerR } from "../styles/login"
//Components
import StyledInput from "../components/input"
import StyledButton from "../components/button"
import StyledSwitch from "../components/switch"
import StyledBrand from "../components/brand"
//Icons
import { AccountCircle, Fingerprint, Tag, Mail, Brightness3, WbSunny } from "@mui/icons-material"

export default function Register() {

  const { theme, toggleTheme, isDark } = useContext(ThemeContext)
  const { handleAlertOpen, handleAlertMessage, handleAlertSeverity } = useContext(AlertContext)
  
  const router = useRouter()

  interface FormValues {
    username: string,
    name: string,
    email: string
  }

  const [errors, setErrors] = useState('')

  const { register, handleSubmit, reset } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data:FormValues) => {

    const response:any = await api.post('/register', data)
    .then((response) => {
      
      handleAlertSeverity('success')
      handleAlertMessage(response.data.message)
      setErrors('')
      handleAlertOpen(true)

      reset()
      setTimeout(() => {
        router.push('/login')
      }, 3000)
      
    }).catch(({response}) => {

      handleAlertSeverity('error')
      handleAlertMessage(response.data.message)
      setErrors(response.data.field)
      handleAlertOpen(true)

    })

  }
  
  return (
    <>
      <Head>
        <title>SOCIAL_MEDIA | REGISTER</title>
      </Head>

      <Row style={{ margin: "0" }}>
        <Col xl={6} style={{ padding: "0" }}>
          <StyledContainerL>
            <Row>

              <Col>
                <StyledSwitch
                  iconLeft={<WbSunny />}
                  iconRight={<Brightness3 />}
                  checked={isDark}
                  onChange={() => {toggleTheme(); reset()}}
                />
              </Col>

              <Col
                md={{ span: 6, offset: 3 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                  <StyledBrand />

                  <StyledInput>
                    <label>Name:</label>
                    <AccountCircle />
                    <input
                      type="text"
                      placeholder="Insert your name..."
                      aria-invalid={(errors == "name") ? "true" : "false"}
                      {...register("name")}
                    />
                  </StyledInput>

                  <StyledInput>
                    <label>Username:</label>
                    <Tag />
                    <input
                      type="text"
                      placeholder="Insert your username..."
                      aria-invalid={(errors == "username") ? "true" : "false"}
                      {...register("username")}
                    />
                  </StyledInput>

                  <StyledInput>
                    <label>Email:</label>
                    <Mail />
                    <input
                      type="email"
                      placeholder="Insert your email..."
                      aria-invalid={(errors == "email") ? "true" : "false"}
                      {...register("email")}
                    />
                  </StyledInput>

                  <Link href="/login">Remembered your password? Click here</Link>

                  <StyledButton>
                    <button type="submit">Register</button>
                  </StyledButton>
                </form>
              </Col>

              <Col style={{ display: "flex", alignItems: "end" }}>
                <Link href="/">Back to home page</Link>
              </Col>
            </Row>
          </StyledContainerL>
        </Col>
        <Col xl={6} style={{ padding: "0" }}>
          <StyledContainerR>
            <Row>
              <Col
                md={{ span: 8, offset: 2 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h1>What is Lorem Ipsum?</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </li>
                  <li>
                    Vivamus faucibus enim molestie lectus cursus, id volutpat
                    risus ullamcorper.
                  </li>
                  <li>Maecenas pulvinar turpis vel arcu posuere ultrices.</li>
                  <li>Integer sagittis ex eget urna commodo scelerisque.</li>
                  <li>
                    Nullam dapibus leo eget arcu varius, sit amet porta magna
                    congue.
                  </li>
                  <li>Suspendisse aliquet mauris non est lacinia pretium.</li>
                  <li>
                    Nunc finibus magna ac metus tincidunt, et dignissim nunc
                    gravida.
                  </li>
                </ul>
              </Col>
            </Row>
          </StyledContainerR>
        </Col>
      </Row>
    </>
  );
}
