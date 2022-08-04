import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { TextEditor } from '../../TextEditor';
import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';
import { PreviewModal } from './PreviewModal';

export default function ContactForm({ type, id, handleSendTo, handleMessage, message, handleChoice, choice, setDate, date }) {

    const [show, setShow] = useState(false);

    const isEmail = type == 'email';

    const toOpt = [
        {
            label: 'All attendees',
            value: "all"
        },
        {
            label: 'Attendees by ticket type',
            value: "by_ticket_type"
        },
        {
            label: 'Specific Attendees',
            value: "by_specific"
        }
    ]

    const [toOption, setToOption] = useState(toOpt[0].value)

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const specificAttendeesOpt = [
        { value: '001', label: 'Aalilyanna Doe', chipLabel: 'Aalilyanna Doe', custom: 'VIP ticket' },
        { value: '002', label: 'Aalilyanna Smith', chipLabel: 'Aalilyanna Smith', custom: 'General Admission' },
        { value: '003', label: 'John Lee', chipLabel: 'John Lee', custom: 'General Admission' }
    ]

    const ticketTypeOpt = [
        { value: 'vip', label: 'VIP ticket', chipLabel: "VIP ticket", custom: '16 Attendees' },
        { value: 'general_admission', label: 'General Admission', chipLabel: "General Admission", custom: '36 Attendees' },
        { value: 'standard_admission', label: 'Standard Admission', chipLabel: "Standard Admission", custom: '12 Attendees' },
        { value: 'other', label: 'Other type', chipLabel: "Other type", custom: '745 Attendees' }
    ]

    const handleToOption = e => {
        setToOption(e.target.value)
    }

    const getPlaceholderText = () => {
        switch (toOption) {
            case 'by_specific':
                return 'Search attendee name'

            case 'by_ticket_type':
                return 'Search ticket type'

            default:
                return;
        }
    }

    const getOptions = () => {
        switch (toOption) {
            case 'by_specific':
                return specificAttendeesOpt

            case 'by_ticket_type':
                return ticketTypeOpt

            default:
                return;
        }
    }

    const handleSelected = (selected) => {
        const selectedArr = selected.map(s => s.value)
        handleSendTo(selectedArr)
    }

    const formatOptionLabel = ({ value, label, custom }) => (
        <div style={{ display: "flex" }}>
            <div className="label">{label}</div>
            <div style={{ fontSize: '14px', marginLeft: "auto" }}>
                {custom}
            </div>
        </div>
    );

    const MultiValueLabel = props => {
        const { innerProps: { innerRef, ...innerProps } } = props;

        return (
            <div ref={innerRef} {...innerProps} className="react-select__multi-value__label">
                {props.data.chipLabel}
            </div>
        )
    };

    return (
        <>
            <Form>
                <Form.Group className='form-group' controlId='sender'>
                    <Form.Label>{isEmail ? 'Email' : 'Text'} sender</Form.Label>
                    <Form.Control type="text" defaultValue="South Side Music Hall" disabled />
                </Form.Group>
                {isEmail && (
                    <Form.Group className="form-group" controlId='reply-To'>
                        <Form.Label>Reply-To Email</Form.Label>
                        <Form.Control type="text" defaultValue="harrison@southsidemusichall.com" disabled />
                    </Form.Group>
                )}
                <Form.Group className="form-group" controlId='to'>
                    <Form.Label>To</Form.Label>
                    <Stack gap={2}>
                        <Form.Select onChange={handleToOption} value={toOption}>
                            {toOpt.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                        {toOption !== 'all' && (
                            <div className="select">
                                <Select closeMenuOnSelect={false}
                                    isMulti
                                    formatOptionLabel={formatOptionLabel}
                                    options={getOptions()}
                                    onChange={handleSelected}
                                    placeholder={getPlaceholderText()}
                                    components={{ MultiValueLabel }}
                                    className="react-select" classNamePrefix="react-select" />
                            </div>
                        )}
                    </Stack>
                </Form.Group>
                {isEmail && (
                    <Form.Group className="form-group" controlId='subject'>
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" defaultValue="Harrison's B-day Party Postponed" disabled />
                    </Form.Group>
                )}
                <Form.Group className="form-group" controlId='message'>
                    <Form.Label>Message</Form.Label>
                    <TextEditor handleChange={handleMessage} value={message} />
                    <Stack direction='horizontal'>
                        <Button variant='default' className='ms-auto px-0 pb-0 btn-preview' onClick={handleShow}>Preview your {type} </Button>
                    </Stack>
                </Form.Group>
                <Row className='form-group'>
                    <Col>
                        <Form.Group controlId='start-date'>
                            <Form.Label>Send test {type}</Form.Label>
                            <Form.Control type="text" defaultValue={isEmail ? 'harrisoncogan@gmail.com' : '4168095557'} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center align-items-end">
                        <Button size="lg">Send test</Button>
                    </Col>
                </Row>
                <Form.Group className='form-group'>
                    <Form.Label>Send {type}</Form.Label>
                    <Stack direction="horizontal" >
                        <div key={`inline-radio`} >
                            <Form.Check
                                inline
                                label="Now"
                                name="radGroup"
                                type="radio"
                                id='1'
                                defaultChecked={choice == '1'}
                                className='fw-medium'
                                onChange={handleChoice}
                            />
                            <Form.Check
                                inline
                                label="Schedule for later"
                                name="radGroup"
                                type="radio"
                                id='2'
                                defaultChecked={choice == '2'}
                                className='fw-medium'
                                onChange={handleChoice}
                            />
                        </div>
                    </Stack>
                    {choice === '2' && (
                        <Row className='mt-3'>
                            <Col>
                                <DateInputWrapper label="Date" id="event-date" setDate={setDate} selectedDate={date} startDate={new Date()} />
                            </Col>
                            <Col>
                                <TimeInputWrapper label="Time" id="event-time" setDate={setDate} selectedDate={date} />
                            </Col>
                        </Row>
                    )}
                </Form.Group>
            </Form>

            <PreviewModal show={show} handleClose={handleClose} message={message} />
        </>
    );
}
