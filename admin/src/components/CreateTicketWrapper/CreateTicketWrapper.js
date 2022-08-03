import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { CreateTicket } from './CreateTicket';
import { BackButton } from '../BackButton';

export default function CreateTicketWrapper({ id, ticketId, handleGoBack, handleNext }) {

    const navigate = useNavigate();

    const [
        key,
        setKey
    ] = useState('paid');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])

    const [ticket, setTicket] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
        fee: '',
        minResalePrice: '',
        maxResalePrice: '',
        minQuantity: '',
        maxQuantity: '',
    })

    const handleChange = (e) => {
        setTicket({ ...ticket, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        if (handleNext) {
            handleNext(e, { ...ticket, sales_start: startDate, sales_end: endDate })
        } else {
            // save changes
            handleSave()
        }
    }

    const handleSave = () => {
        // save state
        navigate('..')
    }

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>{id || ticketId ? 'Edit' : 'Create a'} ticket</h1>
            </header>
            <Card body className='card--sm'>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <div className='d-flex mb-5 '>
                        <Nav as="ul" variant="pills" justify>
                            <Nav.Item as="li">
                                <Nav.Link as="button" eventKey="paid">
                                    Paid
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link as="button" eventKey="free">
                                    Free
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="paid">
                            <CreateTicket type={key} handleChange={handleChange} ticket={ticket} ticketId={ticketId} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="free">
                            <CreateTicket type={key} handleChange={handleChange} ticket={ticket} ticketId={ticketId} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
            <Stack direction="horizontal" className="btn-group-flex">
                <BackButton handleGoBack={handleGoBack} />
                <Button className="btn-next" size="lg" onClick={handleClick}>{ticketId || id ? 'Save' : 'Create ticket'}</Button>
            </Stack>
        </section>
    );
}
