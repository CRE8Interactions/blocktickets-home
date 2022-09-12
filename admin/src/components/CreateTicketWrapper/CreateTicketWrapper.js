import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

import { createTickets, updateTickets, getEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { CreateTicket } from './CreateTicket';
import { CreateEventButtons } from '../CreateEventButtons';

export default function CreateTicketWrapper({ eventId, type }) {

    const navigate = useNavigate();

    const [
        key,
        setKey
    ] = useState('paid');

    const [initialState, setInitialState] = useState()

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    const [errors, setErrors] = useState()

    const [ticket, setTicket] = useState({
        hideTicket: false,
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

    const [showFooter, setShowFooter] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // save initial state to check whether to show save buttons
        setInitialState({
            ticket
        })
    }, [])

    useEffect(() => {
        if (initialState?.ticket !== ticket) setShowFooter(true)
        else setShowFooter(false)

    }, [initialState, ticket.hideTicket, ticket.name, ticket.description, ticket.quantity, ticket.price])

    useEffect(() => {
        if (type) {
            getEvent(eventId)
                .then((res) => {
                    const ticket = res.data?.tickets.find((ticket) => ticket?.name == type);
                    if (!ticket) return
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

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])

    const handleChange = (e, val = e.target.value) => {
        setTicket({ ...ticket, [e.target.name]: val })
    }

    const handleValid = (_, el) => {
        const { name, value } = el;

        switch (name) {
            case 'minResalePrice':
                if (value && value < ticket.price) {
                    setErrors({
                        field: name,
                        message: 'Minimum resale price cannot be less than price of ticket'
                    })
                } else {
                    setErrors()
                }
                break;
            case 'maxResalePrice':
                if (value && value < ticket.minResalePrice) {
                    setErrors({
                        field: name,
                        message: 'Maximum resale price cannot be less than minimum resale price'
                    })
                }
                else {
                    setErrors()
                }
                break;
            case 'minQuantity':
                if (value && value > ticket.quantity) {
                    setErrors({
                        field: name,
                        message: 'Minimum quantity cannot be more than available quantity'
                    })
                } else {
                    setErrors()
                }
                break;
            case 'maxQuantity':
                if (value && ((value < ticket.minQuantity) || (value > ticket.quantity))) {
                    setErrors({
                        field: name,
                        message: 'Maximum quantity cannot be less than minimum quantity or more than available quantity'
                    })
                } else {
                    setErrors()
                }
                break;

            default:
                break;
        }
    }

    const handleSave = () => {
        buildTickets(ticket, startDate, endDate)
    }

    const buildTickets = (ticket, start, end) => {
        setIsSaving(true)
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
                .then((res) => {
                    setIsSaving(false)
                    navigate(`/myevent/${eventId}/tickets`)
                })
                .catch((err) => {
                    setIsSaving(false)
                    console.error(err)
                })
        } else {
            data['type'] = type
            updateTickets({ data })
                .then((res) => {
                    setIsSaving(false)
                    navigate(`/myevent/${eventId}/tickets`)
                })
                .catch((err) => {
                    setIsSaving(false)
                    console.error(err)
                })
        }
    }

    const checkDisabled = () => {
        const { name, quantity, price, fee, minResalePrice, maxResalePrice, minQuantity, maxQuantity } = ticket;

        if (key === 'paid') {
            return hasError || errors || !name || !quantity || !price || !fee || !minResalePrice || !maxResalePrice || !minQuantity || !maxQuantity
        } else {
            return hasError || errors || !name || !quantity || !minQuantity || !maxQuantity
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
                            <CreateTicket type={key} handleValid={handleValid} handleChange={handleChange} ticket={ticket} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} errors={errors} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="free">
                            <CreateTicket type={key} handleValid={handleValid} handleChange={handleChange} ticket={ticket} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} endDate={endDate} hasError={hasError} errors={errors} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
            {showFooter && (
                <CreateEventButtons type="Create ticket" isEditing={type ? true : false} isDisabled={checkDisabled()} isSaving={isSaving} handleSave={handleSave} />
            )}
        </section>
    );
}
