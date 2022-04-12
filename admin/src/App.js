import { useContext, useEffect, useState } from 'react';
import authService from './utilities/services/auth.service';
import UserContext from './context/User/User';
import OrganizationContext from './context/Organization/Organization';
import { Header, Sidenav } from './components';
import { Outlet } from 'react-router-dom';
import { getMyOrganizations, createOrganization } from './utilities/api';
import { CreateOrg } from './components'

function App() {
  const user = authService.getUser();
  const [authenticated, setAuthenticated] = useState(false);
  const [orgs, setOrgData] = useState([])
  const [sideNavEnabled, setSideNavEnabled] = useState(false)
  const myOrgs = useContext(OrganizationContext)

  useEffect(() => {
    if (user) getOrg()
  }, [])

  const getOrg = () => {
      myOrgs.getOrgs()
      .then((res) => { setOrgData(res.data); res.data.length === 0 ? setSideNavEnabled(false) : setSideNavEnabled(true) } )
      .catch(err => console.error(err))
  }

  const createOrg = async (data) => {
		await createOrganization(data)
			.then(res => getOrg())
			.catch(err => console.error(err))
	}

  const showHome = (orgs) => {
    if (orgs && orgs.length === 0) {
      return <CreateOrg submission={createOrg} />
    } else {
      return <Outlet />
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
        <Header />
        <div className="container-fluid">
          <Sidenav enabled={sideNavEnabled} />
          <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <OrganizationContext.Provider value={{ orgs }}>
              {showHome(orgs)}
            </OrganizationContext.Provider>
          </div>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
