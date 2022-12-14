import axios from "axios";
import authService from './services/auth.service';
import moment from 'moment';

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
  return instance.post('/verifies/by-phone-or-email', data)
}

export const phoneUnique = (data) => {
  return instance.post('/verifies/phone-unique', data)
}

export const createNewUser = (data) => {
  return instance.post('/verifies/newUser', data)
}

export const createOrder = (data) => {
  return instance.post('/orders', data)
}

export const getPricing = (data) => {
  return instance.post('/orders/pricing', data)
}

export const getOrder = (orderId) => {
  return instance.get(`/orders?filters[orderId][$eq]=${orderId}`)
}

export const getMyOrganizations = async () => {
  return instance.get('/organizations/myOrgs')
}

export const createOrganization = async (data) => {
  return instance.post('/organizations', data)
}

export const getPaymentIntent = async (data) => {
  return instance.post(`/payment/intent`, data)
}

export const getCategories = async () => {
  return instance.get('/categories')
}

export const getVenues = async () => {
  return instance.get('/venues')
}

export const getGuestPasses = async (eventId, phoneNumber) => {
  return instance.get(`/guest-passes?filters[eventId][$eq]=${eventId}&filters[phoneNumber][$eq]=${phoneNumber}`)
}

export const getGuestList = async (phoneNumber) => {
  return instance.get(`/guest-lists?phoneNumber=${phoneNumber}`)
}

export const getVenue = async (id) => {
  return instance.get(`/venues?filters[id][$eq]=${id}`)
}

export const getEvents = async () => {
  let date = new Date().toISOString();
  return instance.get(`/events?filters[status][$eq]=on_sale&filters[start][$gte]=${date}`)
}

export const getTaxRates = async (city, state) => {
  return instance.get(`organizations/tax-rates?city=${city}&state=${state}`)
}

export const searchEvents = async (q) => {
  return instance.post(`/events/search`, q)
}

export const getMyEvents = async () => {
  return instance.get('/events/myUpcomingEvents')
}

export const getEvent = async (id) => {
  return instance.get(`/events/${id}?filters[status][$eq]=on_sale`)
}

export const getEventTickets = async (id) => {
  let date = moment().toISOString();
  return instance.get(`/tickets?filters[eventId][$eq]=${id}&filters[on_sale_status][$eq]=available&filters[sales_start][$lte]=${date}&filters[sales_end][$gte]=${date}`)
}

export const getAllEventTickets = async (id, code) => {
  return instance.get(`/tickets/available?eventUUID=${id}&code=${code}`)
}

export const createTicketTransfer = (data) => {
  return instance.post('/ticket-transfers', data)
}

export const updatePersonalDetails = (data) => {
  return instance.post('/verifies/personalDetails', data)
}

export const createBankAccount = (data) => {
  return instance.post('/payment-information/generate', data)
}

export const getBankAccount = () => {
  return instance.get('/payment-informations/0')
}

export const removeBankAccount = () => {
  return instance.get('/payment-information/deactive')
}

export const getMyTransfers = () => {
  return instance.get('/ticket-transfers')
}

export const cancelMyTransfers = (data) => {
  return instance.post('/ticket-transfers/cancel', data)
}

export const getIncomingTransfers = () => {
  return instance.get('/ticket-transfers/incoming')
}

export const acceptIncomingTransfers = (data) => {
  return instance.post('/ticket-transfers/accept', data)
}

export const createListing = (data) => {
  return instance.post('/listings', data)
}

export const getListingsByEvent = (id) => {
  return instance.get(`/listings/byEvent?id=${id}`)
}

export const getMyListings = () => {
  return instance.get('/listings/mylisting')
}

export const getAvailableFunds = () => {
  return instance.get('/listings/available-funds')
}

export const removeMyListings = (id) => {
  return instance.delete(`/listings/${id}`)
}

export const updateMyListings = (id, data) => {
  return instance.put(`/listings/${id}`, data)
}

export const getResaleTickets = (eventId) => {
  return instance.get(`/tickets?filters[eventId][$eq]=${eventId}&filters[on_sale_status][$eq]=resaleAvailable`)
}

export const validEmail = (data) => {
  return instance.post('/verifies/emailValid', data)
}

export const requestNumberChange = (data) => {
  return instance.post('/verifies/change-number', data)
}

export const updateNumber = (data) => {
  return instance.post('/verifies/confirm-update', data)
}