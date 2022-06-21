import { useContext } from "react"
import Layout from "../../components/layout"
import { AuthContext } from "../../context/AuthContext"

export default function Feed({}) {

  const { user } = useContext(AuthContext)

  return (
    <>
      <Layout title="FEED">
        <h1>Olá {user?.name}</h1>
        <p>Seja bem-vindo!</p>
      </Layout>
    </>
  )

};
