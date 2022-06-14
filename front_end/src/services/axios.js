import axios from "axios"
import { parseCookies } from "nookies"

export function getAPIClient(ctx) {
 
  const { 'social_media.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://192.168.15.81:3001/v1'
  })

  if (token) {
    api.defaults.headers['Authorization'] = token
  }

  return api

}
