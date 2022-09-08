import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPromoLink } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TrackingLink } from './TrackingLink';

export default function TrackingLinkWrapper({ id }) {

    const navigate = useNavigate();

    const { uuid } = useParams()

    const [link, setLink] = useState({
        name: '',
        uuid: uuid
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
        createPromoLink({data: link})
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
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
