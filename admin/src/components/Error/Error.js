import React from 'react';

import Alert from 'react-bootstrap/Alert';

export default function Error({ type, field = "password" }) {
    const getErrorType = (type) => {
        switch (type) {
            case 'login':
                return 'Your email or password is incorrect';

            case 'match':
                return `Your ${field}s do not match. Please try again`;

            case 'sameMatch':
                return `Your ${field} cannot be the same as your old ${field.substring(field.indexOf(' '))}! Please try again`;

            case 'alreadyExist':
                return `Your email already exists or is taken. Please try again`;

            case 'notExist':
                return `Your ${field} does not match our records. Please try again`;

            default:
                return 'Something went wrong. Please try again';
        }
    };
    return (
        <Alert variant={'danger'} className="d-flex gap-2 mt-3 align-items-center">
            <div className="body">
                <h1 className="text-danger normal mb-0 fw-normal">{getErrorType(type)}</h1>
            </div>
        </Alert>
    );
}
