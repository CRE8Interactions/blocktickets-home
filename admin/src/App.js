import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

import Router from './Router';

import authService from './utilities/services/auth.service';
import UserContext from './context/User/User';

import { toggleContainer, toggleSpacing, changeBackground } from './utilities/helpers';

import { Navigation } from './components';

function App() {

    let location = useLocation();

    const user = authService.getUser()
    const me = useContext(UserContext)

    useEffect(() => {

    })

    const [
        authenticated,
        setAuthenticated
    ] = useState(false);

    const [
        org,
        setOrganization
    ] = useState('');

    useLayoutEffect(() => {
        changeBackground(location.pathname)
        toggleContainer(location.pathname);
        toggleSpacing(location.pathname);

    }, [location.pathname])

    return (
        <div className="App">
            <UserContext.Provider value={{ authenticated, setAuthenticated, user, setOrganization }}>
                <Navigation user={user} me={me} />
                <div className="container" id="main-container">
                    <Router />
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default App;
