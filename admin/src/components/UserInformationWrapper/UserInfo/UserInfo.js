import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function UserInfo({ handleChange, id }) {

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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [hasError, setHasError] = useState(false);

    const [options, setOptions] = useState({
        frequency: frequencyOpt[0].value,
        timezone: timezoneOpt[0].value,
        format: formatOpt[0].value,
    })

    useEffect(() => {
        setHasError(endDate.getDay() < startDate.getDay())

    }, [startDate, endDate])

    const handleOption = e => {
        console.log(e.target.value);
        setOptions({ [e.target.id]: e.target.value })
    }

    return (
        <Form>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='firstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={(e) => handleChange(e)} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="form-group" controlId='lastName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={(e) => handleChange(e)} required />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="form-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email address" onChange={(e) => handleChange(e)} required />
            </Form.Group>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='frequency'>
                        <Form.Label>Frequency</Form.Label>
                        <Form.Select onChange={(e) => handleOption(e)} value={options.frequency}>
                            {frequencyOpt.map(option => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="form-group d-flex-column" controlId='send'>
                        <Form.Label>Send on</Form.Label>
                        <ToggleButtonGroup
                            type="radio"
                            name="days"
                            onChange={handleChange}>
                            {
                                ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa'].map((day, index) => {
                                    return (<ToggleButton id={`tbg-btn-${index}`} value={day} key={index}>
                                        {day}
                                    </ToggleButton>
                                    )
                                })
                            }
                        </ToggleButtonGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='start-time'>
                        <Form.Label>Start time</Form.Label>
                        <TimeInputWrapper
                            id="event-start-time"
                            setDate={setStartDate} selectedDate={startDate}
                            size="sm"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='timezone'>
                        <Form.Label>Timezone</Form.Label>
                        <Form.Select onChange={(e) => handleChange(e)} value={options.timezone}>
                            {timezoneOpt.map(option => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='start-date'>
                        <Form.Label>Start date</Form.Label>
                        <DateInputWrapper id="event-start" setDate={setStartDate} selectedDate={startDate} startDate={startDate} endDate={endDate} error={hasError} size="sm" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='end-date'>
                        <Form.Label>End date</Form.Label>
                        <DateInputWrapper id="event-end" setDate={setEndDate} selectedDate={endDate} startDate={startDate} endDate={endDate} error={hasError} size="sm" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className='form-group'>
                <Col xs={6}>
                    <Form.Group controlId='format'>
                        <Form.Label>Format</Form.Label>
                        <Form.Select onChange={(e) => handleChange(e)} value={options.format}>
                            {formatOpt.map(option => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
