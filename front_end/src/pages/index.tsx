import Head from "next/head"
import Link from "next/link"

export default function Home(){
  return (
    <div>
      <Head>
        <title>SOCIAL_MEDIA | HOME</title>
      </Head>
      <h1>Olá</h1>
      <Link href="/login">Click here to go to login page</Link>
    </div>
  )
}
