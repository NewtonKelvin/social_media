//Components
import Layout from "../../components/layout";
import { useAuth } from "../../context/AuthContext";
import { Grid } from "@mui/material";

export default function Feed() {
  const { user } = useAuth();

  return (
    <>
      <Layout title="Home">
        <Grid container>
          <Grid item md={12}>
            <h1>Olá {user?.name}</h1>
            <p>Seja bem-vindo!</p>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}
