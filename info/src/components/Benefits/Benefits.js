import React from 'react'

import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'

import './benefits.scss';

export default function Benefits() {
    return (
        <section className='benefits d-flex-column text-center'>
            <div className="section-header">
                <h1 className='section-heading'>Why Blocktickets?</h1>
            </div>
            <Stack gap={5} className='flex-lg-row'>
                <Card body>
                    <Card.Title as="h5">Eliminate ticket fraud</Card.Title>
                    <Card.Subtitle as="h6">by leveraging the blockchain to verify validity and view activity of every single ticket at any time</Card.Subtitle>
                </Card>
                <Card body>
                    <Card.Title as="h5">Increase revenue</Card.Title>
                    <Card.Subtitle as="h6">by having total control over the primary and secondary market, and capturing the profit that would have gone to scalpers</Card.Subtitle>
                </Card>
                <Card body>
                    <Card.Title as="h5">Unlock data insights</Card.Title>
                    <Card.Subtitle as="h6">from all events and current and previous ticket holders to target specific groups, reward superfans,  and build communities</Card.Subtitle>
                </Card>
            </Stack>
        </section>
    )
}
