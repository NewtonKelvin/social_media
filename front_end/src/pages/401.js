//Next and React
import { useContext, useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
//API
import { ThemeContext } from "./_app"
//Packages
import { Col, Row } from "react-bootstrap"
//Style
import StyledContainerL2, { StyledContainerL, StyledContainerR } from "../styles/login"
//Components
import StyledSwitch from "../components/switch"
//Icons
import { AccountCircle, Fingerprint, Brightness3, WbSunny } from "@mui/icons-material"
//Image
import Unauthorized from '../../public/images/unauthorized.svg'

export default function Login() {

  const { theme, toggleTheme, isDark } = useContext(ThemeContext)
  
  const router = useRouter()

  return (
    <>
      <Head>
        <title>SOCIAL_MEDIA | 404 ERROR</title>
      </Head>

      <Row style={{ margin: "0" }}>
        <Col xl={6} style={{ padding: "0" }}>
          <StyledContainerL2 isDark={isDark}>
            <Row>

              <Col>
              </Col>

              <Col
                md={{ span: 6, offset: 3 }}
                style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
              >
                <h1>🧐✋</h1>
                <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>Hey, stop! You are not allowed to do that.</h1>
                <hr />
                <h2>Unauthorized page</h2>
              </Col>

              <Col style={{ display: "flex", alignItems: "end" }}>
                <Link href="/">Back to home page</Link>
              </Col>
            </Row>
          </StyledContainerL2>
        </Col>
        <Col xl={6} style={{ padding: "0" }}>
          <StyledContainerR>
            <Row>
              <Col
                md={{ span: 8, offset: 2 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Image src={Unauthorized} />
              </Col>
            </Row>
          </StyledContainerR>
        </Col>
      </Row>
    </>
  );
}
