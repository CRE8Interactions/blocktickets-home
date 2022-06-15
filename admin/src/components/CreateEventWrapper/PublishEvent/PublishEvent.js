import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { DateInputWrapper } from '../DateInputWrapper';
import { TimeInputWrapper } from '../TimeInputWrapper';

import image from '../../../assets/01.png';

export default function PublishEvent() {

    const [date, setDate] = useState(new Date());

    const [choice, setChoice] = useState()

    const handleChoice = (e) => {
        setChoice(e.target.id)
    }
    return (
        <>
            <Row>
                <Col>
                    <Image src={image} rounded alt="Nic Fanciulli">
                    </Image>
                    <Stack direction="horizontal" className="mt-4">
                        <Form>
                            <div key={`inline-radio`} >
                                <Form.Check
                                    inline
                                    label="Publish event"
                                    name="radGroup"
                                    type="radio"
                                    id='publish'
                                    className='fw-medium'
                                    onChange={(e) => handleChoice(e)}
                                />
                                <Form.Check
                                    inline
                                    label="Schedule for later"
                                    name="radGroup"
                                    type="radio"
                                    id='schedule'
                                    className='fw-medium'
                                    onChange={(e) => handleChoice(e)}
                                />
                            </div>
                        </Form>
                    </Stack>
                </Col>
                <Col>
                    <h1 className='fs-md mb-3'>Event Info</h1>
                    <ul>
                        <li className="list">
                            <ul>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Presented by</span>
                                    <span className='fw-medium text-end flex-grow-1'>Southside Music Hall</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Event title</span>
                                    <span className='fw-medium text-end flex-grow-1'>Nic Fanciulli</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Date</span>
                                    <span className='fw-medium text-end flex-grow-1'>May 2, 2022</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Venue</span>
                                    <span className='fw-medium text-end flex-grow-1'>Southside Music Hall</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Location</span>
                                    <span className='fw-medium text-end flex-grow-1'>1135 Botham Jean Blvd, Dallas, TX</span>
                                </Stack>
                            </ul>
                        </li>
                        <li className="list">
                            <ul>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Capacity</span>
                                    <span className='fw-medium text-end flex-grow-1'>10.000</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row mb-3'>
                                    <span className='text-muted'>Price range</span>
                                    <span className='fw-medium text-end flex-grow-1'>$40.00-$80.00</span>
                                </Stack>
                            </ul>
                        </li>
                    </ul>
                </Col>
            </Row>
            {choice === 'schedule' && (
                <Row>
                    <Col>
                        <DateInputWrapper label="Date" id="event-date" setDate={setDate} selectedDate={date} startDate={new Date()} />
                    </Col>
                    <Col>
                        <TimeInputWrapper label="Time" id="event-time" setDate={setDate} selectedDate={date} />
                    </Col>
                </Row>
            )}
        </>
    );
}
