import axios, { HeadersDefaults } from "axios"
import { parseCookies } from "nookies"

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string | null;
}

export function getAPIClient(ctx?:any) {
 
  const { 'social_media.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://192.168.15.81:3001/v1',
    headers: {
      "Content-type": "application/json"
    }
  })

  if (token) {
    api.defaults.headers = {
      Authorization: token
    } as CommonHeaderProperties
  }

  return api

}
