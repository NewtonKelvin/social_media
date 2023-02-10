//Next React
import { Col, Row } from "react-bootstrap"
//Components
import Layout from "../../components/layout"
import { useAuth } from "../../context/AuthContext"

export default function Feed() {

  const { user } = useAuth()

  return (
    <>
      <Layout title="Home">
        <Row>
          <Col md={12}>
            <h1>Olá {user?.name}</h1>
            <p>Seja bem-vindo!</p>
          </Col>
        </Row>
      </Layout>
    </>
  )

}
