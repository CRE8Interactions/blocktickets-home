import React from 'react';

import Alert from 'react-bootstrap/Alert';

import error from '../../assets/icons/info-error.svg';

import './error.scss';

export default function Error({ type }) {
    const getErrorType = (type) => {
        switch (type) {
            case 'phone':
                return 'Phone number is not valid or is taken. Try again';

            default:
                return 'Something went wrong. Please try again later';
        }
    };
    return (
        <Alert variant={'danger'} className="gap-4 mt-3">
            <div className="icon">
                <img src={error} width="32" height="33" alt="" />
            </div>
            <div className="body">
                <h1 className="normal mb-0 fw-medium">{getErrorType(type)}</h1>
            </div>
        </Alert>
    );
}
