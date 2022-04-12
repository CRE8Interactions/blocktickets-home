import { createContext } from 'react';

const UserContext = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
  user: ''
});

export default UserContext;