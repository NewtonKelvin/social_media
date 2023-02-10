import React, { createContext, useContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { useRouter } from 'next/router'
//API
import { userInfo, signInRequest } from "../services/auth"
import { api } from "../services/api"
import { CommonHeaderProperties } from "../services/axios"

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  avatar: string,
  cover: string
}

interface SignInData {
  username: string,
  password: string
}

type SignInErrorType = {
  token?: string,
  error: boolean,
  message: string,
  field: string,
  user?:User
}

interface AuthContextType {
  isAuthenticated: boolean,
  user: User | null,
  signIn: (data: SignInData) => Promise<SignInErrorType>,
  signOut: () => Promise<void>,
  isLoading: boolean
}

interface PropsType {
  children: JSX.Element | JSX.Element[]
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }:PropsType) => {

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)

  const isAuthenticated = !!user
  const router = useRouter()

  const newUser = (usuario:User) => {
    if(!user)
      setUser(usuario)
  }
  const deleteUser = () => {
    setUser(null)
  }

  useEffect(() => {
    
    //AUTH CONTEXT

    async function fetchData(){
      const { 'social_media.token': token } = parseCookies()
      const pathName = router.pathname
      if(token){
        await userInfo()
        .then(response => {
          if(response){
            newUser(response.data.user)
          } else {
            deleteUser()
            Router.push('/login')
          }
        }).catch(() => {
          deleteUser()
          Router.push('/login')
        })
      } else {

        const substrings = [
          "/system/feed",
          "/system/editProfile"
        ];

        if (substrings.some(v => pathName.includes(v))) {
          deleteUser()
          Router.push('/login')
        }
      }
    
      setLoading(false)
    }
    fetchData()

  }, [])

  async function signIn({ username, password }: SignInData){

    const response = await signInRequest({ username, password })

    if(response){
      
      if(response.error === false){

        setCookie(undefined, 'social_media.token', response.token, {
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/'
        })
  
        api.defaults.headers = {
          Authorization: response.token
        } as CommonHeaderProperties
  
        newUser(response.user)
        Router.push('/feed/')
        return response

      } else {

        signOut()
        return response

      }

    }

  }

  async function signOut(){

    destroyCookie(undefined, 'social_media.token', {
      path: '/',
    })
    api.defaults.headers = {
      Authorization: null
    } as CommonHeaderProperties
    deleteUser()
    Router.push('/login')

  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext)
