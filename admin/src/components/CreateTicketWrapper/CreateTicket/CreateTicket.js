import React, { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { InfoIcon } from '../../InfoIcon';
import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';
import { TicketBreakdownModal } from './TicketBreakdownModal';

export default function CreateTicket({ type, handleChange, ticket, ticketId, setStartDate, startDate, setEndDate, endDate, hasError }) {

    const isPaid = type === 'paid'

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Form>
                <Form.Group className="form-group" controlId="ticketType">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Type of ticket" value={ticket.name} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="form-group" controlId="description">
                    <div className="form-label--flex">
                        <Form.Label>Description</Form.Label>
                        <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>Give attendees some more info about this ticket</Tooltip>}>
                            <Button variant="link">
                                <InfoIcon />
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <Form.Control
                        as="textarea" rows={3}
                        name="description"
                        value={ticket.description} onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-group" controlId="quantity">
                    <Form.Label>Available quantity</Form.Label>
                    <Form.Control
                        type="text"
                        name="quantity"
                        pattern="[0-9]*"
                        placeholder="Number of tickets available"
                        value={ticket.quantity}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {isPaid && (
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="price">Price per ticket</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="price-val">$</InputGroup.Text>
                            <Form.Control
                                placeholder="Price per ticket"
                                id="price"
                                name="price"
                                aria-describedby="price-val"
                                value={ticket.price}
                                onChange={handleChange}
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                )}
                <Stack direction="horizontal" className='my-4'>
                    <Button variant='outline-light' size="sm" className="btn--info ms-auto" onClick={handleShow}>
                        View ticket breakdown
                    </Button>
                </Stack>
                {isPaid && (
                    <fieldset className="form-group">
                        <legend>Resale price range</legend>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="min">Minimum</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="min-val">
                                        $
                                    </InputGroup.Text>
                                    <Form.Control placeholder="Minimum Value" id="min" name="minResalePrice"
                                        aria-describedby="min-val"
                                        value={ticket.minResalePrice}
                                        onChange={handleChange}
                                        required />
                                </InputGroup>
                            </Col>
                            <Col>
                                <Form.Label htmlFor="max">Maximum</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text id="max-val">$</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Maximum Value"
                                        id="max"
                                        name="maxResalePrice"
                                        aria-describedby="max-val"
                                        value={ticket.maxResalePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                    </fieldset>
                )}
                <fieldset className="form-group">
                    <legend>When are tickets available</legend>
                    <Row className='pt-1 mb-3'>
                        <Col>
                            <DateInputWrapper label="Sales start" id="sales-start" setDate={setStartDate} selectedDate={startDate} startDate={startDate} endDate={endDate} error={hasError} />
                        </Col>
                        <Col>
                            <TimeInputWrapper
                                label="Start time"
                                id="sales-start-time"
                                setDate={setStartDate} selectedDate={startDate}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DateInputWrapper label='Sales end' id="sales-end" setDate={setEndDate} selectedDate={endDate} startDate={startDate} endDate={endDate} error={hasError} />

                        </Col>
                        <Col>
                            <TimeInputWrapper
                                label="End time"
                                id="sales-end-time"
                                setDate={setEndDate} selectedDate={endDate}
                            />
                        </Col>
                    </Row>
                </fieldset>
                <fieldset className="form-group">
                    <legend>Tickets per order</legend>
                    <Row>
                        <Col>
                            <Form.Group controlId="minQuantity">
                                <Form.Label>Minimum quantity</Form.Label>
                                <Form.Control placeholder="Minimum quantity"
                                    pattern="[0-9]*"
                                    name="minQuantity"
                                    onChange={handleChange}
                                    value={ticket.minQuantity}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="maxQuantity">
                                <Form.Label>Maximum quantity</Form.Label>
                                <Form.Control placeholder="Maximum quantity"
                                    pattern="[0-9]*"
                                    value={ticket.maxQuantity}
                                    name="maxQuantity"
                                    onChange={handleChange}
                                    required />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>

            <TicketBreakdownModal show={show} handleClose={handleClose} />
        </>
    );
}
