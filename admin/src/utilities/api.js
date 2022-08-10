import axios from "axios";
import authService from './services/auth.service';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 3000,
  withCredentials: false
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const isLoggedIn = (authService?.isLoggedIn() || authService?.getSignUpToken());
  if (isLoggedIn) {
   if (authService?.isLoggedIn()) config.headers.common['Authorization'] = `Bearer ${authService.token()}`;
   if (authService?.getSignUpToken()) config.headers.common['Authorization'] = `Bearer ${authService.getSignUpToken()}`;
  }
  return config;
}, function (error) {
  // Do something with request errors
  console.error('API Error:', error.response.data)
  return Promise.reject(error);
});

export const signUp = async (data) => {
  return instance.post('/verifies/admin-signup', data)
}

export const login = async (data) => {
  return instance.post('/auth/local', data)
}

export const getMyOrganizations = async () => {
  return instance.get('/organizations/myOrgs')
}

export const createOrganization = async (data) => {
  return instance.post('/verifies/admin-create-org', data)
}

export const getOrganizationRoles = async () => {
  return instance.get('/organization-roles/roles')
}

export const getOrganizationPermissions = async () => {
  return instance.get('/organization-permissions')
}

export const createOrEditRole = async (data) => {
  return instance.post('/organization-roles/create', data)
}

export const getCategories = async () => {
  return instance.get('/categories')
}

export const getVenues = async () => {
  return instance.get('/venues')
}

export const createEvent = async (data) => {
  return instance.post('/events', data)
}

export const publishEvent = async (data) => {
  return instance.post('/events/publish', data)
}

export const creatTickets = async (data) => {
  return instance.post('/tickets', data)
}