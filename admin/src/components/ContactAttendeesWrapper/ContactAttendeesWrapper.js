import React from 'react';

import { ContactAttendees } from './ContactAttendees'


export default function ContactAttendeesWrapper() {

    return (
        <section className='max-width-wrapper'>
            <header className='section-header'>
                <div className="section-header" >
                    <div className="section-heading">
                        <h1>Contact attendees</h1>
                    </div>
                    <p className='section-header-desc'>Communicate directly with your attendees via texts / emails</p>
                </div>
            </header>
            <ContactAttendees />
        </section>

    );
}
