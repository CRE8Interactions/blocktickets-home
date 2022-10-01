import axios from "axios";
import authService from './services/auth.service';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
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

export const register = async (data) => {
  return axios.post(`${process.env.REACT_APP_AUTH}/api/auth/local/register`, data)
}

export const signUp = async (data) => {
  return instance.post('/verifies/admin-signup', data)
}

export const login = async (data) => {
  return instance.post('/auth/local', data)
}

export const getMyOrganizations = async () => {
  return instance.get('/organizations/myOrgs')
}

export const getMyPermissions = async () => {
  return instance.get('/organizations/my-permissions')
}

export const getTeam = async () => {
  return instance.get('/organizations/team')
}

export const addMember = async (data) => {
  return instance.post('/organizations/add-member', data)
}

export const updateOrgDetails = async (data) => {
  return instance.post('/organizations/update-details', data)
}

export const emailVaid = async (data) => {
  return instance.post('/organizations/email-valid', data)
}

export const updateUserEmail = async (data) => {
  return instance.post('/organizations/update-user-email', data)
}

export const updateUsersName = async (data) => {
  return instance.post('/organizations/update-users-name', data)
}

export const resetPassword = async (data) => {
  return instance.post('/organizations/update-users-password', data)
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

export const createPaymentInfo = async (data) => {
  return instance.post('/organizations/create-payment-info', data)
}

export const getPaymentInfo = async () => {
  return instance.get(`/organizations/payment-info`)
}

export const createW9 = async (data) => {
  return instance.post('/organizations/create-w9', data)
}

export const createPromoLink = async (data) => {
  return instance.post('/organizations/create-promo', data)
}

export const createOrEditMember = async (data) => {
  return instance.post('/organizations/invite-member', data)
}

export const removeTeamMember = async (data) => {
  return instance.post('/organizations/remove-member', data)
}

export const removeRoles = async (data) => {
  return instance.post('/organization-roles/remove', data)
}

export const removeBankAccount = async (data) => {
  return instance.post('/organizations/remove-bankaccount', data)
}

export const getCategories = async () => {
  return instance.get('/categories')
}

export const getVenues = async () => {
  return instance.get('/venues')
}

export const getPromoStats = async (uuid) => {
  return instance.get(`/organizations/promo-stats?uuid=${uuid}`)
}

export const getW9 = async (uuid) => {
  return instance.get(`/organizations/w9`)
}

export const createEvent = async (data) => {
  return instance.post('/events', data)
}

export const editEvent = async (data) => {
  return instance.put('/events/update-event', data)
}

export const addDetailsToEvent = async (data) => {
  return instance.post('/organizations/add-details', data)
}

export const getEvents = async () => {
  return instance.get('/organizations/events')
}

export const getEvent = async (uuid) => {
  return instance.get(`/organizations/event?uuid=${uuid}`)
}

export const getEventStats = async (uuid, range = '') => {
  return instance.get(`/organizations/event-stats?uuid=${uuid}&range=${range}`)
}

export const getAllEventStats = async (uuid) => {
  return instance.get(`/organizations/all-event-stats`)
}

export const getOrders = async (uuid) => {
  return instance.get(`organizations/event-orders?uuid=${uuid}`)
}

export const publishEvent = async (data) => {
  return instance.post('/events/publish', data)
}

export const createTickets = async (data) => {
  return instance.post('/tickets', data)
}

export const updateTickets = async (data) => {
  return instance.post('/tickets/update-all', data)
}

export const inactivateTickets = async (data) => {
  return instance.post('/tickets/inactivate', data)
}

export const upload = async (data) => {
  return instance.post('/upload/', data)
}

export const getTicketDetails = async (uuid) => {
  return instance.get(`organizations/all-ticket-details?uuid=${uuid}`)
}

export const inviteValid = async (code) => {
  return instance.get(`/organizations/invite-valid?code=${code}`)
}