import React from 'react'
import { Link } from 'react-router-dom'

import './cta.scss';

export default function Join() {
    return (
        <section className='section-lg text-center'>
            <div className="mb-4">
                <h1 className='section-heading-sm'>Want to join our mission?</h1>
                <h2 className="subtitle">We're always looking to add to the team! Feel free to reach out and see what positions are available.</h2>
            </div>
            <Link className='btn btn-outline-light btn-lg'>Get in tounch</Link>
        </section>
    )
}
