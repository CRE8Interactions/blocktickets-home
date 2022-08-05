import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { GuestInfo } from './GuestInfo';

export default function GuestInformationWrapper({ id }) {

    const navigate = useNavigate();

    // demo purposes - will come from database 
    const maxTicketQuantity = 4;

    const ticketTypeOpt = [
        {
            label: 'General Admission',
            value: "genAdmission"
        },
        {
            label: 'Seated',
            value: "seated"
        }
    ]

    const [guest, setGuest] = useState({
        firstName: '',
        lastName: '',
        email: '',
        quantity: '',
        ticketType: ticketTypeOpt[0].value
    })

    const [isQuantityValid, setIsQuantityValid] = useState(true)

    useEffect(() => {
        if (!isQuantityValid) {
            setIsQuantityValid(true)
        }
    }, [guest.quantity])


    const validQuantity = e => {
        if (e.target.value > maxTicketQuantity) {
            setIsQuantityValid(false)
        }
    }

    const handleChange = e => {
        setGuest({ ...guest, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        navigate(-1)
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header section-heading">
                    <h1>{id ? 'Edit guest' : 'Guest'} information</h1>
                </header>
                <Card body>
                    <GuestInfo ticketTypeOpt={ticketTypeOpt} guest={guest} handleChange={handleChange} isQuantityValid={isQuantityValid} validQuantity={validQuantity} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                <Button size="lg" onClick={handleSave}>{id ? 'Update guest information' : 'Add Guest'}</Button>
            </Stack>
        </section>
    );
}
