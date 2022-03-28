import axios from "axios";
import authService from './services/auth.service';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 3000,
  withCredentials: false
})

const isLoggedIn = authService?.isLoggedIn();

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (isLoggedIn) {
    config.headers.common['Authorization'] = `Bearer ${authService.token()}`;
  }
  return config;
}, function (error) {
  // Do something with request errors
  console.error('API Error:', error.response.data)
  return Promise.reject(error);
});


export const verifyUser = (data) => {
  return instance.post('/verifies', data)
}

export const verifiyCode = (data) => {
  return instance.post('/verifies/byPhone', data)
}

export const createNewUser = (data) => {
  return instance.post('/verifies/newUser', data)
}

export const getMyOrganizations = async () => {
  return instance.get('/organizations/myOrgs')
}