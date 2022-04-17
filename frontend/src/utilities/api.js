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
  const isLoggedIn = authService?.isLoggedIn();
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

export const createOrganization = async (data) => {
  return instance.post('/organizations', data)
}

export const getPaymentIntent = async (total) => {
  return instance.get(`/payment/intent/${total}`)
}

export const getCategories = async () => {
  return instance.get('/categories')
}

export const getVenues = async () => {
  return instance.get('/venues')
}

export const getVenue = async (id) => {
  return instance.get(`/venues?filters[id][$eq]=${id}`)
}

export const getEvents = async () => {
  return instance.get('/events?filters[status][$eq]=on_sale')
}

export const getEvent = async (id) => {
  return instance.get(`/events/${id}?filters[status][$eq]=on_sale`)
}

export const getEventTickets = async (id) => {
  return instance.get(`/tickets?filters[eventId][$eq]=${id}&filters[on_sale_status][$eq]=available`)
}