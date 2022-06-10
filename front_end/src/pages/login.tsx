//Next
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
//Packages
import { Box, Grid } from "@mui/material"
import { Col, Row } from "react-bootstrap"
//Style
import { StyledContainerL, StyledContainerR } from "../styles/login"
//Images
import Logotipo from "../../public/images/logotipo_name_blue.svg"
//Components
import StyledInput from "../components/input"
import StyledButton from "../components/button"
//Icons
import { AccountCircle, Fingerprint, Check } from "@mui/icons-material"

export default function Home() {
  return (
    <>

      <Head>
        <title>SOCIAL_MEDIA | LOGIN</title>
      </Head>

      <Row>
        <Col xl={6}>

          <StyledContainerL>
            <Row>
              <Col md={{ span: 6, offset: 3}} style={{ display: "flex", flexDirection: "column" }}>
                <Image src={Logotipo} layout="fixed" width={300} />
                <StyledInput>
                  <label>Username:</label>
                  <AccountCircle />
                  <input type="text" placeholder="Insert your username..." />
                </StyledInput>
                <StyledInput>
                  <label>Password:</label>
                  <Fingerprint />
                  <input type="password" placeholder="Insert your password..." />
                </StyledInput>
                <Link href="#">Forgot your password? Click here</Link>
                <StyledButton>
                  <button type="button">
                    Login
                  </button>
                </StyledButton>
                <Link href="/register">Dont have a account? Register here</Link>
              </Col>
            </Row>
          </StyledContainerL>

        </Col>
        <Col xl={6}>

          <StyledContainerR>
            
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
              <li>Aliquam a est vel tortor faucibus malesuada.</li>
              <li>Vestibulum vestibulum elit dictum justo pharetra semper vitae quis magna.</li>
            </ul>

          </StyledContainerR>

        </Col>
      </Row>

    </>
  )
}
