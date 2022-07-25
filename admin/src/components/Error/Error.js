import React from 'react';

import Alert from 'react-bootstrap/Alert';

import error from '../../assets/icons/info-error.svg';

import './error.scss';

export default function Error({ type }) {
    const getErrorType = (type) => {
        switch (type) {
            case 'login':
                return 'Your email or password is incorrect';

            case 'match':
                return 'Your passwords do not match. Please try again';

            default:
                return 'Something went wrong. Please try again';
        }
    };
    return (
        <Alert variant={'danger'} className="d-flex gap-2 mt-3 align-items-center">
            <div className="icon">
                <img src={error} width="32" height="33" alt="" />
            </div>
            <div className="body">
                <h1 className="text-danger normal mb-0 fw-normal">{getErrorType(type)}</h1>
            </div>
        </Alert>
    );
}
