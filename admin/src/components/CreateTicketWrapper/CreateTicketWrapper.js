import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

import { createTickets, updateTickets, getEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { CreateTicket } from './CreateTicket';

export default function CreateTicketWrapper({ eventId, type }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (type) {
            getEvent(eventId)
                .then((res) => {
                    const ticket = res.data?.tickets.find((ticket) => ticket.name === type);
                    setTicket({
                        name: ticket?.name,
                        description: ticket?.description,
                        quantity: res.data?.tickets?.filter((ticket) => ticket.name === type).length,
                        price: ticket?.cost,
                        fee: ticket?.fee,
                        minResalePrice: ticket?.minResalePrice,
                        maxResalePrice: ticket?.maxResalePrice,
                        minQuantity: ticket?.minimum_quantity,
                        maxQuantity: ticket?.maximum_quantity
                    })
                    setStartDate(new Date(ticket?.sales_start))
                    setEndDate(new Date(ticket?.sales_end))
                })
                .catch((err) => console.error(err))
        }
    }, [type])

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
        name: 'General Admission',
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

    const handleSave = () => {
        buildTickets(ticket, startDate, endDate)
    }

    const buildTickets = (ticket, start, end) => {
        const data = {};
        data['name'] = ticket.name;
        data['description'] = ticket.description;
        data['cost'] = parseFloat(ticket.price);
        data['fee'] = parseFloat(ticket.fee);
        data['minimum_quantity'] = Number(ticket.minQuantity);
        data['maximum_quantity'] = Number(ticket.maxQuantity);
        data['minResalePrice'] = parseFloat(ticket.minResalePrice);
        data['maxResalePrice'] = parseFloat(ticket.maxResalePrice);
        data['eventId'] = eventId;
        data['free'] = ticket.price > 0 ? false : true;
        data['generalAdmission'] = true;
        data['quantity'] = ticket.quantity;
        data['sales_start'] = moment(start).format();
        data['sales_end'] = moment(end).format();
        if (!type) {
            createTickets({ data })
                .then((res) => navigate(`/myevent/${eventId}/tickets`))
                .catch((err) => console.error(err))
        } else {
            data['type'] = type
            updateTickets({ data })
                .then((res) => navigate(`/myevent/${eventId}/tickets`))
                .catch((err) => console.error(err))
        }
    }

    const checkDisabled = () => {
        if (key === 'paid') {
            return hasError || !ticket.name || !ticket.quantity || !ticket.price || !ticket.fee || !ticket.minResalePrice || !ticket.maxResalePrice || !ticket.minQuantity || !ticket.maxQuantity
        } else {
            return hasError || !ticket.name || !ticket.quantity || !ticket.minQuantity || !ticket.maxQuantity
        }
    }

    return (
        <section className='wrapper'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>{type ? 'Edit' : 'Create a'} ticket</h1>
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
                            <CreateTicket type={key} handleChange={handleChange} ticket={ticket} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="free">
                            <CreateTicket type={key} handleChange={handleChange} ticket={ticket} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button className="btn-next" size="lg" disabled={checkDisabled()} onClick={handleSave}>{type ? 'Save' : 'Create ticket'}</Button>
            </Stack>
        </section>
    );
}
