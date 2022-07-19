import React from 'react';

import './noDataContainer.scss';

export default function NoDataContainer({ style, children }) {
    return (
        <div id="no-data" className={`${style}`}>
            {children}
        </div>
    );
}
