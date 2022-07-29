import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import { DeleteModal } from './DeleteModal';

export default function BankCard({ handleShow }) {

    const [show, setShow] = useState(false)

    const handleShowDelete = () => setShow(true)

    const handleClose = () => setShow(false)

    return (
        <>
            <Stack direction="horizontal" gap={4}>
                <Image
                    src=""
                    alt="Comerica Bank"
                />
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
            </Stack>

            <DeleteModal show={show} handleClose={handleClose} />
        </>
    );
}
