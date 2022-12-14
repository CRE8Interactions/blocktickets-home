import React, { useState } from 'react';

import { formatPhoneNumber, formatDateTime } from '../../../../utilities/helpers';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Collapse from "react-bootstrap/Collapse";

export default function Attendee({ attendee, handleToggle }) {

    const [open, setOpen] = useState(false)

    return (
        <>
            <li>
                <Card body className='card--sm'>
                    <div className="d-flex align-items-center">
                        <Button variant="link"
                            onClick={() => setOpen(!open)}
                            aria-controls="attendee-info"
                            aria-expanded={open}
                            className="text-dark normal fw-medium  w-100" style={{ textAlign: "left" }}>{attendee.firstName} {attendee.lastName}
                        </Button>
                        <Button variant="link"
                            onClick={() => handleToggle(attendee.id)}
                            className='d-flex align-items-center' style={{ height: "35px" }}>
                            {attendee.checked_in ? (
                                <>
                                    <svg style={{ transform: 'scale(.65)' }} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.0001 29.3332C23.3639 29.3332 29.3334 23.3636 29.3334 15.9998C29.3334 8.63604 23.3639 2.6665 16.0001 2.6665C8.63628 2.6665 2.66675 8.63604 2.66675 15.9998C2.66675 23.3636 8.63628 29.3332 16.0001 29.3332ZM23.3739 12.7069C23.7644 12.3164 23.7644 11.6833 23.3739 11.2927C22.9833 10.9022 22.3502 10.9022 21.9596 11.2927L14.6667 18.5856L11.3739 15.2927C10.9833 14.9022 10.3502 14.9022 9.95964 15.2927C9.56912 15.6833 9.56912 16.3164 9.95964 16.7069L13.9596 20.7069C14.1472 20.8945 14.4015 20.9998 14.6667 20.9998C14.932 20.9998 15.1863 20.8945 15.3739 20.7069L23.3739 12.7069Z" fill="#45B36B" />
                                    </svg><span className='text-success fw-medium normal'>Checked in</span>
                                </>
                            ) : <span className='fw-medium normal'>Check in</span>
                            } </Button>
                        <Button variant="link" className="ps-4 btn-toggle"
                            onClick={() => setOpen(!open)}
                            aria-controls="attendee-info"
                            aria-expanded={open}
                        >
                        </Button>
                    </div>
                    <Collapse in={open}>
                        <div id="attendee-info">
                            <ul className='d-flex mt-4' style={{ gap: "15%" }} >
                                <li>
                                    <Stack as="ul" gap={3}>
                                        <li>
                                            <p className='heading-caption'>Email</p>
                                            <p className='small fw-medium'>{attendee.email}</p>
                                        </li>
                                        <li>
                                            <p className='heading-caption'>Phone number</p>
                                            <p className='small fw-medium'>{formatPhoneNumber(attendee.phoneNumber)}</p>
                                        </li>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack as="ul" gap={3}>
                                        <li>
                                            <p className='heading-caption'>Ticket type</p>
                                            <p className='small fw-medium'>{attendee.ticketType}</p>
                                        </li>
                                        <li>
                                            <p className='heading-caption'>Market type</p>
                                            <p className='small fw-medium'>Primary</p>
                                        </li>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack as="ul" gap={3}>
                                        <li>
                                            <p className='heading-caption'>Transaction type</p>
                                            <p className='small fw-medium'>Transferred</p>
                                        </li>
                                        <li>
                                            <p className='heading-caption'>Status</p>
                                            <p className='small fw-medium'>{attendee.checked_in ? 'Checked in' : "Check in"} {attendee.checked_in && <span className='text-muted'>Feb 12, 2022 3:43pm</span>}</p>
                                        </li>
                                    </Stack>
                                </li>
                            </ul>
                        </div >
                    </Collapse >
                </Card >
            </li >
        </>
    );
}
