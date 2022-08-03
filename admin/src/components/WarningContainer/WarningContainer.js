import React from 'react';

import './warningContainer.scss';

export default function WarningContainer({ style, children }) {
    return (
        <div id="warning" className={`${style}`}>
            {children}
        </div>
    );
}
