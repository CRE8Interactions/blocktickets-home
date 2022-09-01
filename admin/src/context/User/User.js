import { createContext } from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  setOrganization: (org) => {},
  user: '',
  selectedEvent: ''
});

export default UserContext;