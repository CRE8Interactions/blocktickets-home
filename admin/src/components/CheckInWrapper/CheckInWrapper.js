import React from 'react';

import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";

import { AttendeeList } from './AttendeeList';

export default function CheckInWrapper() {

    return (
        <section className='max-width-wrapper'>
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
    );
}
