import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import { SettingsWrapper, LoginSecurityForm } from '../../../components';

export default function LoginSecurityPage() {
    let user = sessionStorage.getItem('user');
    user = JSON.parse(user).user;
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [phone, setPhone] = useState(user.phoneNumber)

    return (
        <SettingsWrapper>
            <div className="settings-heading">
                <h1 className="settings-title">Login & security</h1>
                <h2 className="settings-subtitle">
                    Update the phone number associated with this account, please fill in the following fields. Your
                    phone number is required for security reasons.
                </h2>
                <p className="mt-3 fw-medium">
                    Current Phone Number: <span className="text-secondary">{phone}</span>
                </p>
            </div>
            {
                show &&
                <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <p>
                        To complete this update please enter the 4 digit code.
                    </p>
                </Alert>
            }
            {
                showError &&
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                    <p>
                        Please check verification code and try again.
                    </p>
                </Alert>
            }
            <LoginSecurityForm user={user} setShow={setShow} showError={setShowError} setPhone={setPhone} />
        </SettingsWrapper>
    );
}
