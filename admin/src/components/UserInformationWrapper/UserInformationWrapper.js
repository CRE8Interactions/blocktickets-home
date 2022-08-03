import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { UserInfo } from './UserInfo';

export default function UserInformationWrapper({ id }) {

    const navigate = useNavigate();

    const frequencyOpt = [
        {
            label: 'Weekly',
            value: "weekly"
        },
        {
            label: 'Monthly',
            value: "monthly"
        },
        {
            label: 'Yearly',
            value: "yearly"
        }
    ]

    const timezoneOpt = [
        {
            label: 'Pacific Time',
            value: "pacific"
        },
        {
            label: 'Alantic Time',
            value: "alantic"
        }
    ]

    const formatOpt = [
        {
            label: 'PDF',
            value: "pdf"
        }
    ]

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        frequency: frequencyOpt[0].value,
        sendOn: '',
        timezone: timezoneOpt[0].value,
        format: formatOpt[0].value,
        display_ticket_gross: true
    })

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])

    const handleChange = (e, val = e.target.value) => {
        setUser({ ...user, [e.target.name]: val })
    }

    const handleSave = () => {
        navigate(-1)
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header section-heading">
                    <h1>{id ? 'Edit user information' : 'User Information'}</h1>
                </header>
                <Card body className='card--sm'>
                    <UserInfo frequencyOpt={frequencyOpt} timezoneOpt={timezoneOpt} formatOpt={formatOpt} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} hasError={hasError} user={user} handleChange={handleChange} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                <Button size="lg" onClick={handleSave}>{id ? 'Save' : 'Add recepient'}</Button>
            </Stack>
        </section>
    );
}
