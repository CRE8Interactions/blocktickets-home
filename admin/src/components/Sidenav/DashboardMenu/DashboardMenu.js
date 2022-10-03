import React, { useState } from 'react';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

export default function DashboardMenu({ event }) {

    const [attendeesOpen, setAttendeesOpen] = useState(false);

    const [reportsOpen, setReportsOpen] = useState(false);

    const [marketingOpen, setMarketingOpen] = useState(false);

    const badgeStatus = (event) => {
        if (event?.status === 'unpublished') {
            return <Badge bg="warning" className='mb-3 align-self-start'>Draft</Badge>
        } else if (event?.status === 'on_sale') {
            return <Badge bg="success" className='mb-3 align-self-start'>On Sale</Badge>
        }
    }
    return (
        <>
            <Stack as="header" className="sidebar-header">
                {badgeStatus(event)}
                <h1 className='fs-md'>{event?.name}</h1>
                <div className="small">
                    <p>{moment(event?.start).format('ddd, MMM DD, YYYY')} {moment(event?.start).format('h:mm A')}</p>
                </div>
                {/* <Button variant='outline-light' className='mt-4'>Preview your event</Button> */}
            </Stack>
            <Stack as="ul" gap={1} className='mb-3 secondary-navigation'>
                <Nav.Item as="li">
                    <LinkContainer to="basic-info">
                        <Nav.Link>Basic Info</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li">
                    <LinkContainer to="details">
                        <Nav.Link>Details</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li">
                    <LinkContainer to="tickets">
                        <Nav.Link>Tickets</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li">
                    <LinkContainer to="publish">
                        <Nav.Link>Publish</Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Stack>
            <Stack as="ul" gap={2} className="main-navigation">
                <Nav.Item as="li">
                    <LinkContainer to="">
                        <Nav.Link>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 20C1.34315 20 0 18.6568 0 17V9.33607C0 8.48561 0.360964 7.67512 0.993106 7.10619L7.9931 0.80619C9.13402 -0.220633 10.866 -0.220635 12.0069 0.806189L19.0069 7.10619C19.639 7.67512 20 8.48561 20 9.33607V17C20 18.6568 18.6569 20 17 20H3ZM18 9.33607V17C18 17.5523 17.5523 18 17 18H14V13C14 11.3431 12.6569 9.99998 11 9.99998H9C7.34315 9.99998 6 11.3431 6 13V18H3C2.44772 18 2 17.5523 2 17V9.33607C2 9.05258 2.12032 8.78242 2.33104 8.59278L9.33103 2.29278C9.71134 1.9505 10.2887 1.9505 10.669 2.29278L17.669 8.59278C17.8797 8.78242 18 9.05259 18 9.33607ZM8 18V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V18H8Z" fill="#6F767E" />
                            </svg>
                            Dashboard
                        </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item as="li">
                    <Button variant="link" className='btn-toggle w-100'
                        onClick={() => setAttendeesOpen(!attendeesOpen)}
                        aria-controls="attendees-collapse"
                        aria-expanded={attendeesOpen}
                    >
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M21.1597 5.1842L18.2326 1.21844C17.667 0.452194 16.7713 0 15.8189 0H6.18101C5.22864 0 4.33285 0.452195 3.76729 1.21844L0.840184 5.1842C0.0464547 6.25957 0.0598719 7.73033 0.873088 8.79105L8.61913 18.8946C9.81994 20.4609 12.18 20.4609 13.3808 18.8946L21.1268 8.79105C21.94 7.73033 21.9534 6.25957 21.1597 5.1842ZM2.72383 6L5.37644 2.40615C5.56496 2.15073 5.86355 2 6.18101 2H15.8189C16.1363 2 16.4349 2.15073 16.6235 2.40615L19.2761 6H2.72383ZM2.78676 8L10.2063 17.6777C10.6066 18.1998 11.3933 18.1998 11.7936 17.6777L19.2131 8H2.78676Z" fill="#6F767E" />
                        </svg>

                        Manage Attendees
                    </Button>
                    <Collapse in={attendeesOpen}>
                        <ul id="attendees-collapse" className='submenu'>
                            <Nav.Item as="li">
                                <LinkContainer to="orders">
                                    <Nav.Link>Orders</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            {/* <Nav.Item as="li">
                                <LinkContainer to="attendees-list">
                                    <Nav.Link>Attendees list</Nav.Link>
                                </LinkContainer>
                            </Nav.Item> */}
                            <Nav.Item as="li">
                                <LinkContainer to="guest-list">
                                    <Nav.Link>Guest list</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <LinkContainer to="attendees">
                                    <Nav.Link>Attendees</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </ul>
                    </Collapse>
                </Nav.Item>
                {/* <Nav.Item as="li">
                    <Button variant="link" className='btn-toggle w-100'
                        onClick={() => setReportsOpen(!reportsOpen)}
                        aria-controls="reports-collapse"
                        aria-expanded={reportsOpen}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10 10C11.1046 10 12 9.10457 12 8C12 6.89543 11.1046 6 10 6C8.89543 6 8 6.89543 8 8C8 9.10457 8.89543 10 10 10ZM10 12C12.2091 12 14 10.2091 14 8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8C6 10.2091 7.79086 12 10 12Z" fill="#6F767E" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5588 17.5488C18.6672 15.7154 20 13.0134 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 13.0134 1.33284 15.7154 3.44116 17.5488C5.19693 19.0756 7.49052 20 10 20C12.4162 20 14.6323 19.143 16.3609 17.7165C16.4276 17.6614 16.4936 17.6055 16.5588 17.5488ZM10.2579 17.9959C10.1723 17.9986 10.0863 18 10 18C9.99137 18 9.98274 18 9.97412 18C9.89368 17.9997 9.81353 17.9983 9.73367 17.9956C8.39138 17.9517 7.13273 17.5772 6.03655 16.9508C6.95181 15.7632 8.3882 15 10 15C11.6118 15 13.0482 15.7632 13.9634 16.9508C12.865 17.5785 11.6033 17.9533 10.2579 17.9959ZM15.5624 15.7498C14.2832 14.0781 12.2675 13 10 13C7.73249 13 5.7168 14.0781 4.43759 15.7498C2.93447 14.2953 2 12.2568 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 12.2568 17.0655 14.2953 15.5624 15.7498Z" fill="#6F767E" />
                        </svg>
                        Event reports
                    </Button>
                    <Collapse in={reportsOpen}>
                        <ul id="reports-collapse" className='submenu'>
                            <Nav.Item as="li">
                                <LinkContainer to="primary-sales">
                                    <Nav.Link>Primary sales</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <LinkContainer to="secondary-sales">
                                    <Nav.Link>Secondary sales</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <LinkContainer to="automatic-reporting">
                                    <Nav.Link>Automatic reporting</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </ul>
                    </Collapse>
                </Nav.Item> */}
                <Nav.Item as="li">
                    <Button variant="link" className='btn-toggle w-100'
                        onClick={() => setMarketingOpen(!marketingOpen)}
                        aria-controls="marketing-collapse"
                        aria-expanded={marketingOpen}
                    >
                        <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.51812 -6.69388e-10C7.50537 -0.000244745 7.49264 -0.000243536 7.47996 -6.69388e-10H5.55221C4.31497 -6.69388e-10 3.20463 0.759545 2.75619 1.91266L0.96825 6.51023C0.533862 7.62723 1.01111 8.85223 2 9.41213V17C2 18.6568 3.34315 20 5 20H17C18.6569 20 20 18.6568 20 17V9.41214C20.9889 8.85224 21.4662 7.62723 21.0318 6.51023L19.2438 1.91266C18.7954 0.759547 17.685 -6.69388e-10 16.4478 -6.69388e-10H14.5201C14.5074 -0.000243536 14.4947 -0.000244745 14.4819 -6.69388e-10H7.51812ZM18 9.73843C17.5515 9.68589 17.1119 9.55593 16.7016 9.35078L16.0005 9.00023L15.9994 9.00023L15.357 9.25722C14.1649 9.73404 12.8351 9.73404 11.6431 9.25722L11 9L10.357 9.25722C9.1649 9.73404 7.83511 9.73404 6.64305 9.25722L6.00058 9.00023L5.99955 9.00023L5.29844 9.35078C4.88814 9.55593 4.44854 9.68589 4 9.73843V17C4 17.5523 4.44772 18 5 18H7V15C7 13.3431 8.34315 12 10 12H12C13.6569 12 15 13.3431 15 15V18H17C17.5523 18 18 17.5523 18 17V9.73843ZM16.8944 7.21115C16.8793 7.2036 16.8642 7.19626 16.849 7.18912L15.737 2H16.4478C16.8602 2 17.2303 2.25318 17.3798 2.63755L19.1678 7.23512C19.2451 7.4341 19.1304 7.65585 18.9233 7.70763C18.4776 7.81904 18.0069 7.76736 17.596 7.56193L16.8944 7.21115ZM14.8303 7.31382L13.6916 2H12V7.24593L12.3858 7.40027C13.1011 7.68636 13.8989 7.68636 14.6142 7.40027L14.8303 7.31382ZM10 2H8.30844L7.16976 7.31384L7.38583 7.40027C8.10107 7.68636 8.89894 7.68636 9.61418 7.40027L10 7.24594V2ZM5.15109 7.1891L6.26304 2H5.55221C5.13979 2 4.76968 2.25318 4.6202 2.63755L2.83226 7.23512C2.75488 7.4341 2.8696 7.65585 3.07673 7.70763C3.52237 7.81904 3.99315 7.76736 4.40401 7.56193L5.10558 7.21115C5.12068 7.2036 5.13585 7.19625 5.15109 7.1891ZM13 15V18H9V15C9 14.4477 9.44772 14 10 14H12C12.5523 14 13 14.4477 13 15Z" fill="#777E91" />
                        </svg>
                        Marketing
                    </Button>
                    <Collapse in={marketingOpen}>
                        <ul id="marketing-collapse" className='submenu'>
                            {/* <Nav.Item as="li">
                                <LinkContainer to="contact-attendees">
                                    <Nav.Link>Contact attendees</Nav.Link>
                                </LinkContainer>
                            </Nav.Item> */}
                            <Nav.Item as="li">
                                <LinkContainer to="tracking-links">
                                    <Nav.Link>Tracking links</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </ul>
                    </Collapse>
                </Nav.Item>
            </Stack>
        </>
    )
}