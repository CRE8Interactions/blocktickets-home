import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import './taxCard.scss';

export default function TaxCard({ show }) {

    return (
        <>
            <Row className="d-column d-md-row" id="tax-card">
                <Col md={3} className="order-first">
                    <div className='block bg-info'></div>
                </Col>
                <Col>
                    <Stack className='info'>
                        <h1>Tax information</h1>
                        <ul className='text-muted small'>
                            <li>Party Group LLC.</li>
                            <li>Taxpayer ID: XX-XXXBOB87</li>
                            <li>Updated on Fec 28, 2022</li>
                        </ul>
                        <Stack direction='horizontal' gap={3} className="mt-3">
                            <Button variant="link" onClick={() => show(true)}>Edit</Button>
                        </Stack>
                    </Stack>
                </Col>
                <Col className='badge-container'>
                    <Badge bg="info" className='rounded-1 py-3 px-5 fw-semi-bold text-dark ms-auto'>W-9</Badge>
                </Col>
            </Row>
        </>
    );
}
