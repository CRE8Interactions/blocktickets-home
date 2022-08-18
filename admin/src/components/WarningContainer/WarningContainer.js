import React from 'react';

import './warningContainer.scss';

export default function WarningContainer({ style, children }) {
    return (
        <div className={`warning ${style}`}>
            {children}
        </div>
    );
}
