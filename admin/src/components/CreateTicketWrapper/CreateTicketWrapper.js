import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'

import { createTickets, updateTickets, getEvent, getTaxRates } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { CreateTicket } from './CreateTicket';
import { CreateEventButtons } from '../CreateEventButtons';

export default function CreateTicketWrapper({ event, eventId, type }) {

    const navigate = useNavigate();
    const { uuid } = useParams()

    // error flag for ticket name because setErrors is asynchronous 
    let nameUniqueError = false;

    const [
        key,
        setKey
    ] = useState('paid');

    const [initialState, setInitialState] = useState()

    const [salesStart, setSalesStart] = useState(new Date(moment('12:00 pm', 'h:mm a').format()));

    const [salesEnd, setSalesEnd] = useState(new Date());

    const [hasError, setHasError] = useState(false)

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

    const [fees, setFees] = useState({
        primaryOver20: 0,
        primaryUnder20: 0,
        secondaryServiceFeeBuyer: 0,
        secondaryServiceFeeSeller: 0,
        stripeCharge: 0,
        stripeServicePecentage: 0
    })

    const [taxRates, setTaxRates] = useState({
        stateTaxRate: 0,
        localTaxRate: 0,
        combinedTaxRate: 0
    })

    const [address, setAddress] = useState()

    const [showFooter, setShowFooter] = useState(false);

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // save initial state to check whether to show save buttons
        setInitialState({
            ticket
        })
    }, [])

    // scroll to top if ticket name is already created
    useEffect(() => {
        if (errors?.field === 'name') {
            window.scroll(0, 0)
        }
    }, [errors])

    // remove error when ticket name changes
    useEffect(() => {
        if (errors?.field === 'name') {
            setErrors()
        }
    }, [ticket.name])


    // set sales end to event start 
    useEffect(() => {
        setSalesEnd(new Date(moment(event?.start).format()))
    }, [event])

    // change key if ticket is free when editing ticket 
    useEffect(() => {
        if (ticket.free) setKey('free')
    }, [ticket])

    useEffect(() => {
        if (!address) return;
        getTaxRates(address?.city, address?.state)
            .then((res) => setTaxRates(res?.data?.sales_tax_rates[0]))
            .catch((err) => console.error(err))
    }, [address])


    useEffect(() => {
        if (initialState?.ticket !== ticket) setShowFooter(true)
        else setShowFooter(false)

    }, [initialState, ticket.hideTicket, ticket.name, ticket.description, ticket.quantity, ticket.price, ticket.fee, ticket.price, ticket.minResalePrice,
        , ticket.maxResalePrice, ticket.minQuantity, ticket.maxQuantity])

    useEffect(() => {
        if (type) {
            getEvent(eventId)
                .then((res) => {
                    const ticket = res.data?.tickets.find((ticket) => ticket?.name == type);
                    if (!ticket) return
                    setTicket({
                        name: ticket?.name,
                        free: ticket?.free,
                        description: ticket?.description,
                        quantity: res.data?.tickets?.filter((ticket) => ticket.name === type).length,
                        price: ticket?.cost,
                        fee: ticket?.fee,
                        minResalePrice: ticket?.minResalePrice,
                        maxResalePrice: ticket?.maxResalePrice,
                        minQuantity: ticket?.minimum_quantity,
                        maxQuantity: ticket?.maximum_quantity,
                        hideTicket: ticket?.hidden
                    })
                    setSalesStart(new Date(ticket?.sales_start))
                    setSalesEnd(new Date(ticket?.sales_end))
                    // setFees(res.data?.fee_structure)
                    setAddress(res.data.venue.address[0])
                })
                .catch((err) => console.error(err))
        } else {
            getEvent(eventId)
            .then((res) => {
                console.log(res.data)
                setAddress(res.data.venue.address[0])
                // setFees(res.data?.fee_structure)
            })
            .catch((err) => console.error(err))
        }
    }, [type])

    const handleChange = (e, val = e.target.value) => {
        setTicket({ ...ticket, [e.target.name]: val })
    }

    // check whether ticket name is unique if not editing ticket 
    const checkUnique = () => {
        if (!type) {
            if (event?.tickets?.findIndex(evtTicket => evtTicket?.name === ticket.name) !== -1) {
                nameUniqueError = true
                setErrors({
                    field: 'name',
                    message: 'A ticket is already created with the same name. Please choose a different name'
                })
            }
        }
    }
    const handleValid = (_, el) => {
        const { name, value } = el;
        let num = parseFloat(value)

        switch (name) {
            case 'minResalePrice':
                if (num < ticket.price) {
                    setErrors({
                        field: name,
                        message: 'Minimum resale price cannot be less than price of ticket'
                    })
                } else {
                    setErrors()
                }
                if (ticket.maxResalePrice) {
                    if (num > ticket.maxResalePrice) {
                        setErrors({
                            field: name,
                            message: 'Minimum resale price cannot be more than maximum resale price'
                        })
                    }
                    else {
                        setErrors()
                    }
                }
                break;
            case 'maxResalePrice':
                if (num < ticket.minResalePrice) {
                    setErrors({
                        field: name,
                        message: 'Maximum resale price cannot be less than minimum resale price'
                    })
                } else {
                    setErrors()
                }

                break;
            case 'minQuantity':
                if (num > ticket.quantity) {
                    setErrors({
                        field: name,
                        message: 'Minimum quantity cannot be more than available quantity'
                    })
                } else {
                    setErrors()
                }
                if (ticket.maxQuantity) {
                    if (num > ticket.maxQuantity) {
                        setErrors({
                            field: name,
                            message: 'Minimum quantity cannot be more than maximum quantity'
                        })
                    }
                } else {
                    setErrors()
                }
                break;
            case 'maxQuantity':
                if (num < ticket.minQuantity || num > ticket.quantity) {
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
        buildTickets(ticket, salesStart, salesEnd)
    }

    const buildTickets = (ticket, start, end) => {
        checkUnique();
        if (!errors && !nameUniqueError) {
            setIsSaving(true)
            const data = {};
            data['name'] = ticket.name;
            data['description'] = ticket.description;
            data['cost'] = key === "free" ? 0 : parseFloat(ticket.price);
            data['fee'] = key === "free" ? 0 : parseFloat(ticket.fee);
            data['minimum_quantity'] = Number(ticket.minQuantity);
            data['maximum_quantity'] = Number(ticket.maxQuantity);
            data['minResalePrice'] = parseFloat(ticket.minResalePrice);
            data['maxResalePrice'] = parseFloat(ticket.maxResalePrice);
            data['eventId'] = eventId;
            data['free'] = key === "free" ? true : false;
            data['generalAdmission'] = true;
            data['quantity'] = ticket.quantity;
            data['sales_start'] = moment(start).format();
            data['sales_end'] = moment(end).format();
            data['hidden'] = ticket.hideTicket
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
                data['type'] = type;
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
        <section className='wrapper event-form'>
            <header className="section-header-sm section-heading section-heading--secondary">
                <h1>{type ? 'Edit' : 'Create a'} ticket</h1>
            </header>
            <Card body className='card--sm'>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    {!type && (
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
                    )}
                    <Tab.Content>
                        <Tab.Pane eventKey="paid">
                            <CreateTicket type={key}
                                isEdit={type} handleValid={handleValid} handleChange={handleChange} ticket={ticket} setSalesStart={setSalesStart} salesStart={salesStart} setSalesEnd={setSalesEnd} salesEnd={salesEnd} setHasError={setHasError} hasError={hasError} errors={errors} fees={fees} taxRates={taxRates} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="free">
                            <CreateTicket type={key}
                                isEdit={type} handleValid={handleValid} handleChange={handleChange} ticket={ticket} setSalesStart={setSalesStart} salesStart={salesStart} setSalesEnd={setSalesEnd} salesEnd={salesEnd} setHasError={setHasError} hasError={hasError} errors={errors} fees={fees} taxRates={taxRates} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
            {showFooter && (
                <CreateEventButtons page="Create ticket" isEditing={type ? true : false} isDisabled={checkDisabled()} isSaving={isSaving} handleSave={handleSave} />
            )}
        </section>
    );
}
