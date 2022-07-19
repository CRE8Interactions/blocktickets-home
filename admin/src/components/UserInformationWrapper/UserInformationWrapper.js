import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { UserInfo } from './UserInfo';

export default function UserInformationWrapper({ id }) {

    const navigate = useNavigate();

    const handleChange = (e) => { }

    const handleSave = () => {
        navigate(-1)
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header section-heading">
                    <h1>{id && 'Edit'} User Information</h1>
                </header>
                <Card body className='card--sm'>
                    <UserInfo handleChange={handleChange} id={id} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                <Button size="lg" onClick={handleSave}>{id ? 'Save' : 'Add recepient'}</Button>
            </Stack>
        </section>
    );
}
