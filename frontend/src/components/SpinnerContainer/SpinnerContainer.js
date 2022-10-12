import React from 'react';

import { Spinner } from './Spinner';

import './spinnerContainer.scss';

export default function SpinnerContainer() {
    return (
        <div id="spinner">
            <Spinner variant='dark' size="lg" />
        </div>
    );
}
