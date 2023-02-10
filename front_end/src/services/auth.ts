import { api } from "./api"

type SignInRequestData = {
  username: string,
  password: string
}

export async function signInRequest(data: SignInRequestData){

  const response = await api.get('/login', {
    params: {
      username: data.username,
      password: data.password
    }
  })

  .then((response) => {
    
    return response.data
    
  }).catch(({response}) => {

    return response.data

  })

  return response

}

export async function userInfo(){

  const response = await api.get('/userByToken')
  if(response.data.error === true){
    return null
  } else {
    return response
  }
  
}
