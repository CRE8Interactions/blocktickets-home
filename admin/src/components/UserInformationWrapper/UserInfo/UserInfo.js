import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function UserInfo({ frequencyOpt, timezoneOpt, formatOpt, startDate, setStartDate, endDate, setEndDate, hasError, user, handleChange }) {

    return (
        <Form>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='firstName'>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="First Name"
                            value={user.firstName} onChange={handleChange} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="form-group" controlId='lastName'>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Last name"
                            value={user.lastName} onChange={handleChange} required />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="form-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Email address" value={user.email} onChange={handleChange} required />
            </Form.Group>
            <Row className='form-group'>
                <Col>
                    <Form.Group controlId='frequency'>
                        <Form.Label>Frequency</Form.Label>
                        <Form.Select name="frequency" onChange={handleChange} value={user.frequency}>
                            {frequencyOpt.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="form-group d-flex-column" controlId='send'>
                        <Form.Label>Send on</Form.Label>
                        <ToggleButtonGroup
                            type="radio"
                            name="sendOn"
                        >
                            {
                                ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fri', 'Sa'].map((day, index) => {
                                    return (<ToggleButton id={`tbg-btn-${index}`} key={index} name="sendOn"
                                        defaultChecked={user.sendOn === day}
                                        value={day} onChange={handleChange}>
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
                        <Form.Label>Send time</Form.Label>
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
                        <Form.Select name="timezone" onChange={handleChange} value={user.timezone}>
                            {timezoneOpt.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
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
            <Form.Group className="form-group" controlId='format'>
                <Form.Label>Format</Form.Label>
                <Form.Select name="format" onChange={handleChange} value={user.format}>
                    {formatOpt.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <div className="form-group">
                <Form.Check
                    type="checkbox"
                    id="displayTicketGross"
                    name="display_ticket_gross"
                    label="Display ticket gross"
                    defaultChecked={user.display_ticket_gross}
                    onChange={(e) => handleChange(e, e.target.checked)}
                />
            </div>
        </Form>
    );
}
