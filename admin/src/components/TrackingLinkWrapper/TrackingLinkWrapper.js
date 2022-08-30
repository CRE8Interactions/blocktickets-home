import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TrackingLink } from './TrackingLink';

export default function TrackingLinkWrapper({ id }) {

    const navigate = useNavigate();

    const [link, setLink] = useState({
        name: '',
        url: 'https://www.blocktickets.xyz/e/welcome-to-the-party-tickets-380737735817?aff=fanclubonly'
    })

    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        if (!isValid) {
            setIsValid(true)
        }

    }, [link.name])


    const handleChange = (e) => {
        setLink({ ...link, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        navigate(-1)
    }

    const validInputs = (e) => {
        setIsValid(e.target.value !== "" && e.target.validity.valid)
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header section-heading">
                    <h1>{id ? 'Edit' : 'Create a new'} tracking link</h1>
                </header>
                <Card body className='card--sm'>
                    <TrackingLink link={link} handleChange={handleChange} isValid={isValid} validInputs={validInputs} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                <Button size="lg" disabled={!isValid} onClick={handleSave}>{id ? 'Update' : 'Create'} tracking link</Button>
            </Stack>
        </section>
    );
}
