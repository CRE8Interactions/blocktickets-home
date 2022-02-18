import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 3000
})

export const verifyUser = (data) => {
  return instance.post('/verifies', data)
}

export const verifiyCode = (data) => {
  return instance.post('/verifies/byPhone', data)
}