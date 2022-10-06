import React, { useState } from 'react';
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap';

import { formatDateTime } from '../../../utilities/helpers';

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
                    <p>{formatDateTime(moment(event?.start))}</p>
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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V11.3361C2 10.4857 2.36096 9.67518 2.99311 9.10625L9.9931 2.80625C11.134 1.77943 12.866 1.77943 14.0069 2.80625L21.0069 9.10625C21.639 9.67518 22 10.4857 22 11.3361V19C22 20.6569 20.6569 22 19 22H5ZM20 11.3361V19C20 19.5523 19.5523 20 19 20H16V15C16 13.3432 14.6569 12 13 12H11C9.34315 12 8 13.3432 8 15V20H5C4.44772 20 4 19.5523 4 19V11.3361C4 11.0526 4.12032 10.7825 4.33104 10.5928L11.331 4.29284C11.7113 3.95056 12.2887 3.95056 12.669 4.29284L19.669 10.5928C19.8797 10.7825 20 11.0526 20 11.3361ZM10 20V15C10 14.4478 10.4477 14 11 14H13C13.5523 14 14 14.4478 14 15V20H10Z" fill="#6F767E" />
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.1597 7.1842L19.2326 3.21844C18.667 2.45219 17.7713 2 16.8189 2H7.18101C6.22864 2 5.33285 2.45219 4.76729 3.21844L1.84018 7.1842C1.04645 8.25957 1.05987 9.73033 1.87309 10.791L9.61913 20.8946C10.8199 22.4609 13.18 22.4609 14.3808 20.8946L22.1268 10.791C22.94 9.73033 22.9534 8.25957 22.1597 7.1842ZM3.72383 8L6.37644 4.40615C6.56496 4.15073 6.86355 4 7.18101 4H16.8189C17.1363 4 17.4349 4.15073 17.6235 4.40615L20.2761 8H3.72383ZM3.78676 10L11.2063 19.6777C11.6066 20.1998 12.3933 20.1998 12.7936 19.6777L20.2131 10H3.78676Z" fill="#6F767E" />
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
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="#6F767E"/>
<path fillRule="evenodd" clipRule="evenodd" d="M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33284 17.7154 5.44116 19.5488C7.19693 21.0756 9.49052 22 12 22C14.4162 22 16.6323 21.143 18.3609 19.7165C18.4276 19.6614 18.4936 19.6055 18.5588 19.5488ZM12.2579 19.9959C12.1723 19.9986 12.0863 20 12 20C11.9914 20 11.9827 20 11.9741 20C11.8937 19.9997 11.8135 19.9983 11.7337 19.9956C10.3914 19.9517 9.13273 19.5772 8.03655 18.9508C8.95181 17.7632 10.3882 17 12 17C13.6118 17 15.0482 17.7632 15.9634 18.9508C14.865 19.5785 13.6033 19.9533 12.2579 19.9959ZM17.5624 17.7498C16.2832 16.0781 14.2675 15 12 15C9.73249 15 7.7168 16.0781 6.43759 17.7498C4.93447 16.2953 4 14.2568 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.2568 19.0655 16.2953 17.5624 17.7498Z" fill="#6F767E"/>
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.51812 1.99994C8.50537 1.99969 8.49264 1.9997 8.47996 1.99994H6.55221C5.31497 1.99994 4.20463 2.75948 3.75619 3.9126L1.96825 8.51017C1.53386 9.62716 2.01111 10.8522 3 11.4121V18.9999C3 20.6568 4.34315 21.9999 6 21.9999H18C19.6569 21.9999 21 20.6568 21 18.9999V11.4121C21.9889 10.8522 22.4662 9.62717 22.0318 8.51017L20.2438 3.9126C19.7954 2.75949 18.685 1.99994 17.4478 1.99994H15.5201C15.5074 1.9997 15.4947 1.99969 15.4819 1.99994H8.51812ZM19 11.7384C18.5515 11.6858 18.1119 11.5559 17.7016 11.3507L17.0005 11.0002L16.9994 11.0002L16.357 11.2572C15.1649 11.734 13.8351 11.734 12.6431 11.2572L12 10.9999L11.357 11.2572C10.1649 11.734 8.83511 11.734 7.64305 11.2572L7.00058 11.0002L6.99955 11.0002L6.29844 11.3507C5.88814 11.5559 5.44854 11.6858 5 11.7384V18.9999C5 19.5522 5.44772 19.9999 6 19.9999H8V16.9999C8 15.3431 9.34315 13.9999 11 13.9999H13C14.6569 13.9999 16 15.3431 16 16.9999V19.9999H18C18.5523 19.9999 19 19.5522 19 18.9999V11.7384ZM17.8944 9.21108C17.8793 9.20354 17.8642 9.1962 17.849 9.18906L16.737 3.99994H17.4478C17.8602 3.99994 18.2303 4.25312 18.3798 4.63749L20.1678 9.23506C20.2451 9.43404 20.1304 9.65579 19.9233 9.70757C19.4776 9.81898 19.0069 9.7673 18.596 9.56187L17.8944 9.21108ZM15.8303 9.31376L14.6916 3.99994H13V9.24587L13.3858 9.4002C14.1011 9.6863 14.8989 9.6863 15.6142 9.4002L15.8303 9.31376ZM11 3.99994H9.30844L8.16976 9.31378L8.38583 9.4002C9.10107 9.6863 9.89894 9.6863 10.6142 9.4002L11 9.24588V3.99994ZM6.15109 9.18904L7.26304 3.99994H6.55221C6.13979 3.99994 5.76968 4.25312 5.6202 4.63749L3.83226 9.23506C3.75488 9.43404 3.8696 9.65579 4.07673 9.70757C4.52237 9.81898 4.99315 9.7673 5.40401 9.56187L6.10558 9.21108C6.12068 9.20354 6.13585 9.19619 6.15109 9.18904ZM14 16.9999V19.9999H10V16.9999C10 16.4477 10.4477 15.9999 11 15.9999H13C13.5523 15.9999 14 16.4477 14 16.9999Z" fill="#777E91" />
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