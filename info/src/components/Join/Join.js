import React from 'react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './cta.scss';

export default function Join() {
    return (
        <section className='cta d-flex-column text-center'>
            <div className="section-header">
                <h1 className='section-heading-sm'>Want to join our mission?</h1>
                <h2 className="subtitle">We're always looking to add to the team! Feel free to reach out and see what positions are available.</h2>

            </div>
        </section>
    )
}
