import React from 'react';

import { formatCurrency } from '../../../utilities/helpers';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { InfoIcon } from '../../InfoIcon';

import './cards.scss';

export default function Cards() {
    return (
        <section className='cards'>
            <Row>
                <Col lg={6}>
                    <Card body id="tickets-sold-card">
                        <div className='heading--flex card-body-heading'>
                            <h1 className='card-body-title card-body-title--flex tickets-sold'>Tickets sold</h1>
                            <Badge bg="default" className='badge-outline badge-outline--primary'>Primary</Badge>
                        </div>
                        <Row>
                            <Col>
                                <span><b className="fs-md">72</b> <span className='text-muted'>/ 700</span></span>
                            </Col>
                            <Col className='text-end'>
                                <span className='fw-medium'>7%</span>
                            </Col>
                        </Row>
                        <ProgressBar now={7} />
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading'>
                            <h1 className='card-body-title card-body-title--flex shareable-link'>Shareable link</h1>
                            <Button variant="outline-light">Copy URL</Button>
                        </div>
                        <p className='mb-4 fw-bold'>Your event URL</p>
                        <p className='text-muted'>https://www.blocktickets.xyz/o/lenoxx-entertainment-40700955203</p>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading total-sales mb-4'>
                            <Stack>
                                <Stack direction="horizontal" gap={2} className="small-label--flex">
                                    <span className='small-label'>Total sales</span>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Total sales from tickets sold</Tooltip>}>
                                        <Button variant="link">
                                            <InfoIcon variant="dark" />
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                                <h1 className='card-body-title'>{formatCurrency(52532.23)}</h1>
                            </Stack>
                        </div>
                        <Row>
                            <Col>
                                <span><b>{formatCurrency(42241.22)}</b> <span className="small-text">net sales</span></span>
                            </Col>
                            <Col className='text-end'>
                                <Badge bg="default" className='badge-outline badge-outline--primary'>Primary</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span><b>{formatCurrency(10222.32)}</b> <span className="small-text">royalties</span></span>
                            </Col>
                            <Col className='text-end'>
                                <Badge bg="default" className='badge-outline badge-outline--secondary'>Secondary</Badge>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <div className="heading--flex card-body-heading payout mb-4">
                            <Stack>
                                <Stack direction="horizontal" gap={2} className="small-label--flex">
                                    <span className='small-label'>Payouts</span>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Your total earnings made from event</Tooltip>}>
                                        <Button variant="link">
                                            <InfoIcon variant="dark" />
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                                <h1 className='card-body-title'>{formatCurrency(52532.23)}</h1>
                            </Stack>
                            <Badge bg="default" className='badge-outline badge-outline--success'>Paid</Badge>
                        </div>
                        <p className='text-muted'>Your payout will be released on 28 November 2020 to allow for any refunds. Depending on your bank, it may take 4-5 business days to receive your funds.</p>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}
