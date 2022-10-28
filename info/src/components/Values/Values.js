import React from 'react'

import Stack from 'react-bootstrap/Stack'

import './values.scss';

export default function Values() {
    return (
        <section className='values d-flex-column text-center'>
            <Stack gap={5}>
                <div className='value value-1'>
                    <h2 className='heading'>Communication is key</h2>
                    <p>Our smart tickets allow organizers to have a direct relationship with every fan. Organizers can communicate with fans throughout the event life cycle by providing event notifications, check in directions, and locations for artist meet and greets or merch pickups. This creates a seamless experience for both fans and organizers.</p>
                </div>
                <div className='value value-2'>
                    <h2 className='heading'>Building a community</h2>
                    <p>Organizers are given data backed by blockchain that allow them to understand who their diehard fans really are. This gives organizers the opportunity to build a community by rewarding select fans with special offers, early access to future shows, and airdrops.</p>
                </div>
                <div className='value value-3'>
                    <h2 className='heading'>Experience that last</h2>
                    <p>With a user experience like no other, our innovative features utilized by blockchain technology spark excitement in organizers and fans — when the tickets go on sale and start selling to long after the event has taken place.</p>
                </div>
            </Stack>
        </section>
    )
}
