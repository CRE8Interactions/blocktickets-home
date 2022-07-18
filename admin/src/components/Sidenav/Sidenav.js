import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';

import './sidenav.scss';

export default function Sidenav(props) {

    const [open, setOpen] = useState(true);

    return (
        <aside id="sidebarMenu" className='sidebar'>
            <div className="sidebar-wrapper">
                <Nav as="nav" className="position-sticky" activeKey={window.location.pathname}>
                    <Stack className="sidebar-header">
                        <Badge bg="success" className='mb-3 align-self-start'>On Sale</Badge>
                        <h1 className='fs-md'>Nic Fanciulli</h1>
                        <div className="small">
                            <p>Mar 13 <span className='time'>9:00 PM EST</span></p>
                            <p>CODA <span className='loc'>Toronto, ON</span></p>
                        </div>
                        <Button variant='outline-light' className='mt-4'>Preview your event</Button>
                    </Stack>
                    <Stack as="ul" className='mb-3'>
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
                    <Stack as="ul" gap={3} className="main-navigation">
                        <Nav.Item as="li">
                            <LinkContainer to="">
                                <Nav.Link>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 20C1.34315 20 0 18.6568 0 17V9.33607C0 8.48561 0.360964 7.67512 0.993106 7.10619L7.9931 0.80619C9.13402 -0.220633 10.866 -0.220635 12.0069 0.806189L19.0069 7.10619C19.639 7.67512 20 8.48561 20 9.33607V17C20 18.6568 18.6569 20 17 20H3ZM18 9.33607V17C18 17.5523 17.5523 18 17 18H14V13C14 11.3431 12.6569 9.99998 11 9.99998H9C7.34315 9.99998 6 11.3431 6 13V18H3C2.44772 18 2 17.5523 2 17V9.33607C2 9.05258 2.12032 8.78242 2.33104 8.59278L9.33103 2.29278C9.71134 1.9505 10.2887 1.9505 10.669 2.29278L17.669 8.59278C17.8797 8.78242 18 9.05259 18 9.33607ZM8 18V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V18H8Z" fill="currentColor" />
                                    </svg>
                                    Dashboard
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Button variant="link" className='btn-toggle'
                                onClick={() => setOpen(!open)}
                                aria-controls="attendees-collapse"
                                aria-expanded={open}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22.1598 7.1842L19.2327 3.21844C18.6671 2.45219 17.7713 2 16.8189 2H7.18107C6.22871 2 5.33291 2.45219 4.76735 3.21844L1.84025 7.1842C1.04652 8.25957 1.05993 9.73033 1.87315 10.791L9.61919 20.8946C10.82 22.4609 13.18 22.4609 14.3808 20.8946L22.1269 10.791C22.9401 9.73033 22.9535 8.25957 22.1598 7.1842ZM3.72389 8L6.3765 4.40615C6.56502 4.15073 6.86362 4 7.18107 4H16.8189C17.1364 4 17.435 4.15073 17.6235 4.40615L20.2761 8H3.72389ZM3.78682 10L11.2064 19.6777C11.6067 20.1998 12.3933 20.1998 12.7936 19.6777L20.2132 10H3.78682Z" fill="currentColor" />
                                </svg>
                                Manage Attendees
                            </Button>
                            <Collapse in={open}>
                                <ul id="attendees-collapse" className='submenu'>
                                    <Nav.Item as="li">
                                        <LinkContainer to="orders">
                                            <Nav.Link>Orders</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <LinkContainer to="attendees-list">
                                            <Nav.Link>Attendees list</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <LinkContainer to="check-in">
                                            <Nav.Link>Check in</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Button variant="link" className='btn-toggle'
                                onClick={() => setOpen(!open)}
                                aria-controls="reports-collapse"
                                aria-expanded={open}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12ZM12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5588 19.5488C20.6672 17.7154 22 15.0134 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.0134 3.33284 17.7154 5.44116 19.5488C7.19693 21.0756 9.49052 22 12 22C14.4162 22 16.6323 21.143 18.3609 19.7165C18.4276 19.6614 18.4936 19.6055 18.5588 19.5488ZM12.2579 19.9959C12.1723 19.9986 12.0863 20 12 20C11.9914 20 11.9827 20 11.9741 20C11.8937 19.9997 11.8135 19.9983 11.7337 19.9956C10.3914 19.9517 9.13273 19.5772 8.03655 18.9508C8.95181 17.7632 10.3882 17 12 17C13.6118 17 15.0482 17.7632 15.9634 18.9508C14.865 19.5785 13.6033 19.9533 12.2579 19.9959ZM17.5624 17.7498C16.2832 16.0781 14.2675 15 12 15C9.73249 15 7.7168 16.0781 6.43759 17.7498C4.93447 16.2953 4 14.2568 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.2568 19.0655 16.2953 17.5624 17.7498Z" fill="currentColor" />
                                </svg>
                                Event reports
                            </Button>
                            <Collapse in={open}>
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
                                        <LinkContainer to="reporting">
                                            <Nav.Link>Automatic reporting</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Button variant="link" className='btn-toggle'
                                onClick={() => setOpen(!open)}
                                aria-controls="marketing-collapse"
                                aria-expanded={open}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.51812 2C8.50537 1.99976 8.49264 1.99976 8.47996 2H6.55221C5.31497 2 4.20463 2.75954 3.75619 3.91266L1.96825 8.51023C1.53386 9.62723 2.01111 10.8522 3 11.4121V19C3 20.6568 4.34315 22 6 22H18C19.6569 22 21 20.6568 21 19V11.4121C21.9889 10.8522 22.4662 9.62723 22.0318 8.51023L20.2438 3.91266C19.7954 2.75955 18.685 2 17.4478 2H15.5201C15.5074 1.99976 15.4947 1.99976 15.4819 2H8.51812ZM19 11.7384C18.5515 11.6859 18.1119 11.5559 17.7016 11.3508L17.0005 11.0002L16.9994 11.0002L16.357 11.2572C15.1649 11.734 13.8351 11.734 12.6431 11.2572L12 11L11.357 11.2572C10.1649 11.734 8.83511 11.734 7.64305 11.2572L7.00058 11.0002L6.99955 11.0002L6.29844 11.3508C5.88814 11.5559 5.44854 11.6859 5 11.7384V19C5 19.5523 5.44772 20 6 20H8V17C8 15.3431 9.34315 14 11 14H13C14.6569 14 16 15.3431 16 17V20H18C18.5523 20 19 19.5523 19 19V11.7384ZM17.8944 9.21115C17.8793 9.2036 17.8642 9.19626 17.849 9.18912L16.737 4H17.4478C17.8602 4 18.2303 4.25318 18.3798 4.63755L20.1678 9.23512C20.2451 9.4341 20.1304 9.65585 19.9233 9.70763C19.4776 9.81904 19.0069 9.76736 18.596 9.56193L17.8944 9.21115ZM15.8303 9.31382L14.6916 4H13V9.24593L13.3858 9.40027C14.1011 9.68636 14.8989 9.68636 15.6142 9.40027L15.8303 9.31382ZM11 4H9.30844L8.16976 9.31384L8.38583 9.40027C9.10107 9.68636 9.89894 9.68636 10.6142 9.40027L11 9.24594V4ZM6.15109 9.1891L7.26304 4H6.55221C6.13979 4 5.76968 4.25318 5.6202 4.63755L3.83226 9.23512C3.75488 9.4341 3.8696 9.65585 4.07673 9.70763C4.52237 9.81904 4.99315 9.76736 5.40401 9.56193L6.10558 9.21115C6.12068 9.2036 6.13585 9.19625 6.15109 9.1891ZM14 17V20H10V17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17Z" fill="currentColor" />
                                </svg>
                                Marketing
                            </Button>
                            <Collapse in={open}>
                                <ul id="marketing-collapse" className='submenu'>
                                    <Nav.Item as="li">
                                        <LinkContainer to="address">
                                            <Nav.Link>Contact address</Nav.Link>
                                        </LinkContainer>
                                    </Nav.Item>
                                </ul>
                            </Collapse>
                        </Nav.Item>
                    </Stack>
                </Nav>
                <ul className="secondary-navigation mt-auto">
                    <Nav.Item as="li">
                        <LinkContainer to="/support">
                            <Nav.Link>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" />
                                    <circle cx="12" cy="18" r="1" fill="currentColor" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 8C11.1307 8 10.3886 8.5551 10.1135 9.33325C9.9295 9.85396 9.35818 10.1269 8.83746 9.94284C8.31674 9.75879 8.04382 9.18747 8.22787 8.66675C8.7765 7.11451 10.2568 6 12 6C14.2091 6 16 7.79086 16 10C16 11.8638 14.7252 13.4299 13 13.874V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13C11 12.4477 11.4477 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="currentColor" />
                                </svg>
                                Support
                            </Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </ul>
            </div>
        </aside>
    )
}