import React, { Fragment, useLayoutEffect, useState } from 'react';

import Router from './Router';
import { Navigation } from './components'

function App() {

    return (
        <Fragment>
            <Navigation />
            <div className="container" id="main-container">
                <Router />
            </div>
        </Fragment>
    );
}

export default App;
