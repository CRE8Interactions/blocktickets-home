import React from 'react';
import moment from 'moment';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import './taxCard.scss';

export default function TaxCard({ show, account }) {

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
                            <li>{account?.organization?.name}</li>
                            <li>Taxpayer ID: {account?.ein}</li>
                            <li>Updated on {moment(account?.updatedAt).format('MMM DD, yyyy')}</li>
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
