import React from 'react';

import './emptyContainer.scss';

export default function EmptyContainer({ style, children }) {
    return (
        <div className={`empty ${style}`}>
            {children}
        </div>
    );
}
