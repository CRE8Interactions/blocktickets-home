import React from 'react'

import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'

import './benefits.scss';

export default function Benefits() {
    return (
        <section className='benefits d-flex-column text-center'>
            <div className="section-header">
                <h1 className='section-heading-sm'>Utilizing blockchain technology</h1>
                <h2 className="subtitle">to reinvent the fan and organizer experience</h2>
            </div>
            <Stack gap={5} className='flex-lg-row'>
                <Card body>
                    <Card.Title as="h5">Eliminates risk</Card.Title>
                    <Card.Subtitle as="h6">of fraud and allows fans to verify ticket history.</Card.Subtitle>
                </Card>
                <Card body>
                    <Card.Title as="h5">Facilitate reselling</Card.Title>
                    <Card.Subtitle as="h6">in a way you control and turn secondary tickets into an advantage.</Card.Subtitle>
                </Card>
                <Card body>
                    <Card.Title as="h5">Profit</Card.Title>
                    <Card.Subtitle as="h6">from every secondary ticket sold and maximize revenues from your event. </Card.Subtitle>
                </Card>
            </Stack>
        </section>
    )
}
