import React from 'react';

import Alert from 'react-bootstrap/Alert';

export default function Success({ field = "password" }) {

    return (
        <Alert variant={'success'} className="d-flex gap-2 mt-3 align-items-center">
            <div className="body">
                <h1 className="text-success normal mb-0 fw-normal">Your {field} is updated successfully!</h1>
            </div>
        </Alert>
    );
}
