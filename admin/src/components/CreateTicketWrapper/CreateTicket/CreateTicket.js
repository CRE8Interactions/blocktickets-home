import React, { useState, useEffect } from 'react';

import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';
import { TicketBreakdownModal } from './TicketBreakdownModal';

export default function CreateTicket({ handleChange, ticketId }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    const [show, setShow] = useState(false);

    useEffect(() => {
        setHasError(endDate.getTime() < startDate.getTime())

    }, [startDate, endDate])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Form>
                <Form.Group className="form-group" controlId="ticketType">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Type of ticket" onChange={(e) => handleChange(e)} required />
                </Form.Group>

                <Form.Group className="form-group" controlId="quantity">
                    <Form.Label>Available quantity</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Number of tickets available"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label htmlFor="price">Price per ticket</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="price-val">$</InputGroup.Text>
                        <Form.Control
                            placeholder="Price per ticket"
                            id="price"
                            aria-describedby="price-val"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Stack direction="horizontal" className='my-4'>
                    <Button variant='outline-light' size="sm" className="btn--info ms-auto" onClick={handleShow}>
                        View ticket breakdown
                    </Button>
                </Stack>
                <fieldset className="form-group">
                    <legend>Resale price range</legend>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="min">Minimum</Form.Label>
                            <InputGroup>
                                <InputGroup.Text id="min-val">
                                    $
                                </InputGroup.Text>
                                <Form.Control placeholder="Minimum Value" id="min"
                                    aria-describedby="min-val"
                                    onChange={(e) => handleChange(e)}
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
                                    aria-describedby="max-val"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                </fieldset>
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
                                    onChange={(e) => handleChange(e)}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="maxQuantity">
                                <Form.Label>Maximum quantity</Form.Label>
                                <Form.Control placeholder="Maximum quantity"
                                    onChange={(e) => handleChange(e)}
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
