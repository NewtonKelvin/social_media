import { Html, Head, Main, NextScript } from 'next/document'
const env = process.env.ENVIRONMENT || 'development'; //production

export default function Document() {
  return (
    <Html>
      <Head>
        {/* GOOGLE FONTS */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        {/* MATERIAL UI */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        {
          (env == 'development')
            ? <script
              src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js"
              crossOrigin="anonymous"
            ></script>
            : <script
              src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.js"
              crossOrigin="anonymous"
            ></script>
        }
        {/* REACT BOOTSTRAP */}
        <script
          src="https://unpkg.com/react/umd/react.production.min.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="anonymous"
        ></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        {/* ICON */}
        <link rel="shortcut icon" href="/images/logotipo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
