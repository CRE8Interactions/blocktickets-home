import React from 'react'
import { Link } from 'react-router-dom'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import './cta.scss';

export default function CTA() {
    return (
        <section className='cta d-flex-column text-center'>
            <Card body className="card--dark">
                <Row className="flex-md-row text-left justify-content-between align-items-center">
                    <Col md={7} lg={5} xxl={4}>
                        <Card.Title as="h5">The <span className="text-secondary">future</span> of ticketing is here</Card.Title>
                        <Card.Subtitle as="h6">Start selling tickets with us today</Card.Subtitle>
                    </Col>
                    <Col md={5} xxl={3}>
                        <Link className="btn btn-secondary btn-lg w-100">Request a demo</Link>
                    </Col>
                </Row>
            </Card>
        </section>
    )
}
