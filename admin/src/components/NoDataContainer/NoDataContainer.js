import React from 'react';

import './noDataContainer.scss';

export default function NoDataContainer({ children }) {
    return (
        <div id="no-data" className="d-flex-column justify-content-center align-items-center gap-2">
            {children}
        </div>
    );
}
