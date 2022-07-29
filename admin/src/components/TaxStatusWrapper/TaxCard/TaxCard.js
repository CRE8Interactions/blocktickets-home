import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function TaxCard({ show }) {

    return (
        <>
            <Row>
                <Col>
                    <div></div>
                </Col>
                <Col>
                    <Stack gap={3}>
                        <h1 className='normal'>Tax information</h1>
                        <ul className='text-muted small'>
                            <li>Party Group LLC.</li>
                            <li>Taxpayer ID: XX-XXXBOB87</li>
                            <li>Updated on Fec 28, 2022</li>
                        </ul>
                        <Stack direction='horizontal' gap={3}>
                            <Button variant="link" onClick={() => show(true)}>Edit</Button>
                        </Stack>
                    </Stack>
                </Col>
                <Col>
                    <Stack className='h-100 justify-content-center align-items-center'>
                        <Badge bg="dark" className='ms-auto'>W-9</Badge>
                    </Stack>

                </Col>

            </Row>
        </>
    );
}
