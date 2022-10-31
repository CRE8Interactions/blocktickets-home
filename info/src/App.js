import React, { Fragment } from 'react';

import Router from './Router';
import { Navigation, Footer } from './components'

function App() {

    return (
        <Fragment>
            <Navigation />
            <div className="container" id="main-container">
                <div className="spacer">
                    <Router />
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}

export default App;
