import React from 'react';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

import image from '../../../assets/01.png';

export default function PublishEvent({ setDate, date, handleChoice, choice }) {

    return (
        <>
            <Row>
                <Col lg={5} className="w-auto">
                    <Image src={image} rounded alt="Nic Fanciulli" width="291" height="291" className="event-image">
                    </Image>
                    <Stack direction="horizontal" className="mt-4">
                        <Form>
                            <div key={`inline-radio`} >
                                <Form.Check
                                    inline
                                    label="Publish event"
                                    name="radGroup"
                                    type="radio"
                                    id='1'
                                    defaultChecked={choice === '1'}
                                    className='fw-medium'
                                    onChange={(e) => handleChoice(e)}
                                />
                                <Form.Check
                                    inline
                                    label="Schedule for later"
                                    name="radGroup"
                                    type="radio"
                                    id='2'
                                    defaultChecked={choice === '2'}
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
                            <Stack as="ul" gap={3}>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Presented by</span>
                                    <span className='fw-medium text-end flex-grow-1'>Southside Music Hall</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Event title</span>
                                    <span className='fw-medium text-end flex-grow-1'>Nic Fanciulli</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Date</span>
                                    <span className='fw-medium text-end flex-grow-1'>May 2, 2022</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Venue</span>
                                    <span className='fw-medium text-end flex-grow-1'>Southside Music Hall</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Location</span>
                                    <span className='fw-medium text-end flex-grow-1'>1135 Botham Jean Blvd, Dallas, TX</span>
                                </Stack>
                            </Stack>
                        </li>
                        <li className="list pt-2">
                            <Stack as="ul" gap={3}>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Capacity</span>
                                    <span className='fw-medium text-end flex-grow-1'>10.000</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Price range</span>
                                    <span className='fw-medium text-end flex-grow-1'>$40.00-$80.00</span>
                                </Stack>
                            </Stack>
                        </li>
                    </ul>
                </Col>
            </Row>
            {choice === '2' && (
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
