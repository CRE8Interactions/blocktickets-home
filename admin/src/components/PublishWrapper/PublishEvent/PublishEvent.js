import React from 'react';
import moment from 'moment';

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';

import { DateInputWrapper } from '../../DateInputWrapper';
import { TimeInputWrapper } from '../../TimeInputWrapper';

export default function PublishEvent({ setDate, date, setPublishType, publishType, eventStarted, eventStatus, event }) {
    return (
        <>
            <Row>
                <Col lg={5} className="w-auto">
                    <Image src={event?.image?.url} rounded alt="Nic Fanciulli" width="291" height="291" className="event-image">
                    </Image>
                </Col>
                <Col>
                    <h1 className='fs-md mb-3'>Event Info</h1>
                    <ul>
                        <li className="list list-with-seperator">
                            <Stack as="ul" gap={3}>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Presented by</span>
                                    <span className='fw-medium text-end flex-grow-1'>{event?.presentedBy}</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Event title</span>
                                    <span className='fw-medium text-end flex-grow-1'>{event?.name}</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Date</span>
                                    <span className='fw-medium text-end flex-grow-1'>{moment(event?.start).format('MMM DD, yyyy')}</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Venue</span>
                                    <span className='fw-medium text-end flex-grow-1'>{event?.venue?.name}</span>
                                </Stack>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Location</span>
                                    <span className='fw-medium text-end flex-grow-1'>{event?.venue?.address[0]?.address_1}, {event?.venue?.address[0]?.city}, {event?.venue?.address[0]?.state}</span>
                                </Stack>
                            </Stack>
                        </li>
                        <li className="list list-with-seperator pt-2">
                            <Stack as="ul" gap={3}>
                                <Stack as="li" direction='horizontal' className='split-row'>
                                    <span className='text-muted'>Capacity</span>
                                    <span className='fw-medium text-end flex-grow-1'>{event?.tickets?.length}</span>
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
            <div className="pt-4">
                {eventStarted || eventStatus === "on_sale" ? (
                    <Alert bg="default" className='alert-info alert-info--light'>
                        <p>The event {eventStarted ? 'has already started' : 'is already published'}, changes are not possible.</p>
                    </Alert>
                ) : (
                    <Stack direction="horizontal" className='mb-3'>
                        <Form>
                            <div key={`inline-radio`} >
                                <Form.Check
                                    inline
                                    label="Publish event"
                                    name="radGroup"
                                    type="radio"
                                    id='1'
                                    defaultChecked={publishType === '1'}
                                    className='fw-medium'
                                    onChange={(e) => setPublishType(e.target.id)}
                                />
                                <Form.Check
                                    inline
                                    label="Schedule for later"
                                    name="radGroup"
                                    type="radio"
                                    id='2'
                                    defaultChecked={publishType === '2'}
                                    className='fw-medium'
                                    onChange={(e) => setPublishType(e.target.id)}
                                />
                            </div>
                        </Form>
                    </Stack>
                )}
            </div>
            {!eventStarted && publishType === '2' && (
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
