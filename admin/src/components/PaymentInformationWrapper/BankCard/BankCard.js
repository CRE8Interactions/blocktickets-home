import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { DeleteModal } from './DeleteModal';

import './bankCard.scss';

export default function BankCard({ handleShow }) {

    const [show, setShow] = useState(false)

    const handleShowDelete = () => setShow(true)

    const handleClose = () => setShow(false)

    return (
        <>
            <Row id="bank-card">
                <Col md={3}>
                    <div className='block bg-info'></div>
                </Col>
                <Col>
                    <Stack gap={3}>
                        <h1 className='normal'>Bank information</h1>
                        <ul className='text-muted small'>
                            <li>Comerica Bank</li>
                            <li>Checking TPG USA XXXXXX674232</li>
                            <li>US. Dollars, United States</li>
                        </ul>
                        <Stack direction='horizontal' gap={3}>
                            <Button variant="link" onClick={handleShow}>Edit</Button>
                            <Button variant="link" className='text-danger' onClick={handleShowDelete}>Delete</Button>
                        </Stack>
                    </Stack>
                </Col>
            </Row>

            <DeleteModal show={show} handleClose={handleClose} />
        </>
    );
}
