import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Router from './Router';

import authService from './utilities/services/auth.service';
import UserContext from './context/User/User';
import OrganizationContext from './context/Organization/Organization';
import { getMyOrganizations, createOrganization } from './utilities/api';
import { toggleContainer, changeBackground } from './utilities/helpers';

import { Navigation, CreateOrg } from './components';

function App() {
    const user = authService.getUser();
    const [
        authenticated,
        setAuthenticated
    ] = useState(false);
    const [
        orgs,
        setOrgData
    ] = useState([]);
    const [
        sideNavEnabled,
        setSideNavEnabled
    ] = useState(false);
    const myOrgs = useContext(OrganizationContext);

    // useEffect(() => {
    // 	if (user) getOrg();
    // }, []);

    let location = useLocation();

    useLayoutEffect(() => {
        changeBackground(location.pathname)
        toggleContainer(location.pathname)

    }, [location.pathname])

    const getOrg = () => {
        myOrgs
            .getOrgs()
            .then((res) => {
                setOrgData(res.data);
                res.data.length === 0 ? setSideNavEnabled(false) : setSideNavEnabled(true);
            })
            .catch((err) => console.error(err));
    };

    const createOrg = async (data) => {
        await createOrganization(data).then((res) => getOrg()).catch((err) => console.error(err));
    };

    return (
        <div className="App">
            <UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
                <Navigation />
                <div className="main my-container" id="main-container">
                    <Router />
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default App;
