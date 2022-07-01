//Next React
import { useContext } from "react"
//Components
import Layout from "../../components/layout"
//Context
import { AuthContext } from "../../context/AuthContext"
import { getAPIClient } from "../../services/axios"

export default function Feed({ usuario }) {

  return (
    <>
      <Layout title="FEED" pageName="Home">
        <h1>Olá {usuario.name}</h1>
        <p>Seja bem-vindo!</p>
      </Layout>
    </>
  )

}

export const getServerSideProps = async (ctx) => {

  const apiClient = getAPIClient(ctx)
  // Fetch data from external API
  const response = await apiClient.get('/userByToken')

  const responseAvatar = apiClient.get(`/image/${response.data.user.avatar}`)
  const responseCover = apiClient.get(`/image/${response.data.user.cover}`)

  const usuario = response.data.user

  // Pass data to the page via props
  return {
    props: { usuario }
  }

}
