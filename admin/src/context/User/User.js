import { createContext } from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  user: '',
  orgs: [],
  selectedEvent: ''
});

export default UserContext;