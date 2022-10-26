import React from 'react'

import Badge from 'react-bootstrap/Badge'

export default function AboutUsPage() {
    return (
        <div>
            <section className='py-5 d-flex-column text-center'>
                <h1>Control and security through <span className='text-primary'>blockchain</span>.</h1>
                <Badge bg="default" className='small text-secondary badge--light'>Innovative ticket selling</Badge>
                <p>Blocktickets uses blockchain technology to eliminate ticket fraud, and provide fans and organizers control of the secondary market with innovative features not available anywhere else.</p>
                <span>Learn more</span>
            </section>
        </div>
    )
}
