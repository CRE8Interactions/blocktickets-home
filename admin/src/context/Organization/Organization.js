import { createContext } from 'react';
import { getMyOrganizations } from '../../utilities/api';

const OrganizationContext = createContext({
  orgs: [],
  getOrgs: () => {
    return getMyOrganizations()
  },
  selectedEvent: ''
});

export default OrganizationContext;