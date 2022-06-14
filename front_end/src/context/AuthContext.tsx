import { createContext, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { useRouter } from 'next/router'

interface User {
  id: number,
  name: string,
  email: string,
  avatar: string,
  type: number,
  expire: number
}

interface SignInData {
  username: string,
  password: string
}

type LoginErrorField = {
  username: boolean,
  password: boolean
}

type SignInErrorType = {
  error: boolean,
  message: string,
  errors: LoginErrorField
}

interface AuthContextType {
  isAuthenticated: boolean,
  user: User,
  signIn: (data: SignInData) => Promise<SignInErrorType>,
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthProvider({ children }) {
  
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  const router = useRouter()

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
