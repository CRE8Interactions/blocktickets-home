import React from 'react';

import './successContainer.scss';

export default function SuccessContainer({ children }) {
    return (
        <div className="success d-flex-column justify-content-center align-items-center gap-4">
            {children}
        </div>
    );
}
