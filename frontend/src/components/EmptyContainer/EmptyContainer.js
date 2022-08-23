import React from 'react';

import './emptyContainer.scss';

export default function EmptyContainer({ children }) {
    return (
        <div className="empty d-flex-column justify-content-center align-items-center">
            {children}
        </div>
    );
}
