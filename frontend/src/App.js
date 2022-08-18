import React, { Fragment, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UserContext from './context/User/user';
import AuthService from './utilities/services/auth.service';
import { checkUrl } from './utilities/helpers';

import { Navigation } from './components';
import Router from './Router';

function App() {
    const user = AuthService.getUser();
    const location = useLocation();

    const [
        authenticated,
        setAuthenticated
    ] = useState(false);

    useLayoutEffect(
        () => {
            if (checkUrl(location.pathname)) {
                [
                    'html',
                    'body'
                ].forEach((el) => document.querySelector(el).classList.add('full-height'));
            }

            return () => {
                [
                    'html',
                    'body'
                ].forEach((el) => document.querySelector(el).classList.remove('full-height'));
            };
        },
        [
            location.pathname
        ]
    );

    return (
        <Fragment>
            <UserContext.Provider value={{ authenticated, setAuthenticated, user }}>
                <Navigation />
                <div className="container" id="main-container">
                    <Router />
                </div>
            </UserContext.Provider>
        </Fragment>
    );
}

export default App;
