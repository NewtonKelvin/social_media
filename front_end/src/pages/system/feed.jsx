//Next React
import { Col, Row } from "react-bootstrap"
//Components
import Layout from "../../components/layout"
//Context
import { getAPIClient } from "../../services/axios"

export default function Feed({ usuario }) {

  return (
    <>
      <Layout title="Home">
        <Row>
          <Col>
            <h1>Olá {usuario.name}</h1>
            <p>Seja bem-vindo!</p>
          </Col>
        </Row>
      </Layout>
    </>
  )

}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx)
  // Fetch data from external API
  const response = await apiClient.get('/userByToken')

  apiClient.get(`/image/${response.data.user.avatar}`)
  apiClient.get(`/image/${response.data.user.cover}`)

  const usuario = response.data.user

  // Pass data to the page via props
  return {
    props: { usuario }
  }

}
