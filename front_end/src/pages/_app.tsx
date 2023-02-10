//NEXT AND REACT
import type { AppProps } from "next/app"
import { useEffect, useState, createContext } from "react"
import Router from "next/router"
//PACKAGES
import { parseCookies, setCookie } from "nookies"
import NProgress from "nprogress"
//MATERIAL UI
import { Snackbar } from "@mui/material"
import Slide from '@mui/material/Slide'
//STYLE
import GlobalStyle  from "../styles/globals"
import GlobalNProgress  from "../styles/nprogress"
//???
import { Alert, Color } from '@material-ui/lab'
import { AuthProvider } from "../context/AuthContext"

//NProgress
if (typeof window !== "undefined") {
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", () => {
    NProgress.done();
  });
}

type ThemeContextType = {
  theme: string,
  isDark: boolean,
  toggleTheme: () => void
}

type AlertContextType = {
  handleAlertOpen: (open:boolean) => void,
  handleAlertMessage: (message:string) => void,
  handleAlertSeverity: (severity:Color) => void
}

export const ThemeContext = createContext({} as ThemeContextType)
export const AlertContext = createContext({} as AlertContextType)

export default function MyApp({ Component, pageProps }: AppProps) {

  const cookies = parseCookies()
  const [theme, setTheme] = useState(cookies.DataTheme)
  const [isDark, setIsDark] = useState(true)
  
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<Color>('error')

  const handleAlertOpen = (open:boolean) => {
    setAlertOpen(open)
  }
  const handleAlertMessage = (message:string) => {
    setAlertMessage(message)
  }
  const handleAlertSeverity = (severity:Color) => {
    setAlertSeverity(severity)
  }

  useEffect(() => {
    if(!theme || theme === 'undefined' || theme === null){
      setTheme('light')
      setIsDark(false)
    } else {
      setIsDark((theme == 'light')?false:true)
    }
  }, [])

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    setCookie(null, 'DataTheme', theme, {
      path: '/',
    })
  }, [theme])

  function toggleTheme(){
    let newTheme = null
    let newIsDark = false
    if(theme == 'light'){

      newTheme = 'dark'
      newIsDark = true
    } else {
      newTheme = 'light'
      newIsDark = false

    }
    setTheme(newTheme)
    setIsDark(newIsDark)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      <AlertContext.Provider value={{ handleAlertOpen, handleAlertMessage, handleAlertSeverity }}>
        <GlobalStyle />
        <GlobalNProgress />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={alertOpen}
          autoHideDuration={6000}
          onClose={() => setAlertOpen(false)}
          TransitionComponent={Slide}
        >
          <Alert
            onClose={() => setAlertOpen(false)}
            severity={alertSeverity}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </AlertContext.Provider>
    </ThemeContext.Provider>
  )
}
