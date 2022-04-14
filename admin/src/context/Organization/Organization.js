import { createContext } from 'react';
import { getMyOrganizations } from '../../utilities/api';

const OrganizationContext = createContext({
  orgs: [],
  getOrgs: () => {
    return getMyOrganizations()
  }
});

export default OrganizationContext;