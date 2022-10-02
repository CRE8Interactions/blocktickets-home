import React, { useState, useEffect } from 'react';

import AuthService from '../../utilities/services/auth.service';
import { checkPermission } from '../../utilities/helpers';

import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

import { AttendeeList } from './AttendeeList';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function AttendeesWrapper() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 6));

    }, [])

    return (
        <div className="position-relative">
            <section className={`max-width-wrapper ${!hasPermission ? 'overlay' : ''}`}>
                <header className='section-header'>
                    <div className="section-header" >
                        <div className="section-heading">
                            <h1>Attendees</h1>
                        </div>
                        <p className='section-header-desc'>Check in attendees by scanning the QR code on their smart ticket</p>
                    </div>
                    <p className='fw-medium mb-5'>Check in attendees with your mobile device: <span className='text-primary'>iPhone</span> or <span className='text-primary'>Android</span></p>
                    <Card>
                        <Card.Body className='pt-3 pb-4'>
                            <div className='heading--flex mb-3'>
                                <h4 className='normal'>Attendees checked in</h4>
                                <span className='text-muted fw-medium'><span className='text-dark fs-md fw-bold'>72</span> / 1000</span>
                            </div>
                            <ProgressBar now="6" />
                        </Card.Body>
                    </Card>
                </header>
                <section>
                    <AttendeeList />
                </section>
            </section>
            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
