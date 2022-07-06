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
        <div className='cards'>
            <Row className='cards-container'>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading'>
                            <h1 className='card-body-title tickets-sold'>Tickets sold</h1>
                            <Badge className='badge-outline badge-outline--primary'>Primary</Badge>
                        </div>
                        <Row className='mb-5'>
                            <Col>
                                <span><b className="fs-md">72</b> <span className="small-text">/ 700</span></span>
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
                        <div className='heading--flex card-body-heading mb-4'>
                            <h1 className='card-body-title'>Sharable link</h1>
                            <Button variant="outline-light">Copy URL</Button>
                        </div>
                        <p className='mb-4 fw-bold'>Your event URL</p>
                        <p className='text-muted'>https://www.blocktickets.xyz/o/lenoxx-entertainment-40700955203</p>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <Stack className='card-body-heading'>
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
                        <Row>
                            <Col>
                                <span><b>{formatCurrency(42241.22)}</b> <span className="small-text">net sales</span></span>
                            </Col>
                            <Col className='text-end'>
                                <Badge className='badge-outline badge-outline--primary'>Primary</Badge>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span><b>{formatCurrency(10222.32)}</b> <span className="small-text">royalties</span></span>
                            </Col>
                            <Col className='text-end'>
                                <Badge className='badge-outline badge-outline--secondary'>Secondary</Badge>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <div className="heading--flex card-body-heading">
                            <Stack>
                                <Stack direction="horizontal" gap={2} className="small-label--flex payout">
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
                            <Badge className='badge-outline badge-outline--success'>Paid</Badge>
                        </div>
                        <p className='text-muted'>Your payout will be released on 28 November 2020 to allow for any refunds. Depending on your bank, it may take 4-5 business days to receive your funds.</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
