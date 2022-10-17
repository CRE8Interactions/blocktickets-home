import React, { useState, useEffect } from 'react';

import { formatCurrency, formatNumber, copy } from '../../../utilities/helpers';

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

export default function Cards({ stats }) {

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        }
    }, [copied])

    return (
        <section className='cards'>
            <Row>
                <Col lg={6}>
                    <Card body id="tickets-sold-card">
                        <div className='heading--flex card-body-heading'>
                            <h1 className='card-body-title card-body-title--flex tickets-sold'>Tickets sold</h1>
                            <Badge bg="default" className='badge-outline badge-outline--primary'>Primary</Badge>
                        </div>
                        <Row className='mb-5'>
                            <Col>
                                <span className="amount fs-md">{formatNumber(stats?.allTicketsSold)}</span> <span className='text-muted'>/ {formatNumber(stats?.totalTickets)}</span>
                            </Col>
                            <Col className='text-end'>
                                <span className='fw-medium'>{stats?.totalSoldPercentage}%</span>
                            </Col>
                        </Row>
                        <ProgressBar now={stats?.totalSoldPercentage} />
                    </Card>
                </Col>
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
                                <h1 className='card-body-title'>{formatCurrency(stats?.allTicketsSoldAmount)}</h1>
                            </Stack>
                        </div>
                        <Row className='split-row'>
                            <Col>
                                <span className='amount'>{formatCurrency(stats?.primaryNetSales)}</span> <span className="small-text">Net sales</span>
                            </Col>
                            <Col className='text-end'>
                                <Badge bg="default" className='badge-outline badge-outline--primary'>Primary</Badge>
                            </Col>
                        </Row>
                        <Row className='mt-2 split-row'>
                            <Col>
                                <span className='amount'>{formatCurrency(0)}</span> <span className="small-text">Royalties</span>
                            </Col>
                            <Col className='text-end'>
                                <Badge bg="default" className='badge-outline badge-outline--secondary'>Resale</Badge>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading royalties mb-4'>
                            <Stack>
                                <Stack direction="horizontal" gap={2} className="small-label--flex">
                                    <span className='small-label'>Royalites</span>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Royalties you’ve collected from secondary ticket sales across all your events</Tooltip>}>
                                        <Button variant="link">
                                            <InfoIcon variant="dark" />
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                                <h1 className='card-body-title'>{formatCurrency(0)}</h1>
                            </Stack>
                            <Badge bg="default" className='badge-outline badge-outline--secondary'>Resale</Badge>
                        </div>
                        <Row>
                            <Col>
                                <span className='amount'>{formatNumber(stats?.primaryTicketsSold)}</span> <span className="small-text">Tickets sold</span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading net-sales mb-4'>
                            <Stack>
                                <Stack direction="horizontal" gap={2} className="small-label--flex">
                                    <span className='small-label'>Net sales</span>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Sales across all your events after fees have been paid</Tooltip>}>
                                        <Button variant="link">
                                            <InfoIcon variant="dark" />
                                        </Button>
                                    </OverlayTrigger>
                                </Stack>
                                <h1 className='card-body-title'>{formatCurrency(stats?.primaryNetSales)}</h1>
                            </Stack>
                            <Badge bg="default" className='badge-outline badge-outline--primary'>Primary</Badge>
                        </div>
                        <Row>
                            <Col>
                                <span className='amount'>{formatCurrency(stats?.primaryGrossSales)}</span> <span className="small-text">Gross sales</span>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col lg={3}>
                    <Card body>
                        <div className="card-body-heading page-views mb-0">
                            <Stack direction="horizontal" gap={2} className="small-label--flex">
                                <span className='small-label'>Page views</span>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Page views for all your events on sales</Tooltip>}>
                                    <Button variant="link">
                                        <InfoIcon variant="dark" />
                                    </Button>
                                </OverlayTrigger>
                            </Stack>
                            <h1 className='card-body-title'>{formatNumber(stats?.pageViews)}</h1>
                        </div>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card body>
                        <div className="card-body-heading payout mb-0">
                            <Stack direction="horizontal" gap={2} className="small-label--flex">
                                <span className='small-label'>Your payouts</span>
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Your total earnings made from event</Tooltip>}>
                                    <Button variant="link">
                                        <InfoIcon variant="dark" />
                                    </Button>
                                </OverlayTrigger>
                            </Stack>
                            <h1 className='card-body-title'>{formatCurrency(stats?.allTicketsSoldAmount)}</h1>
                        </div>
                    </Card>
                </Col>
                <Col lg={6}>
                    <Card body>
                        <div className='heading--flex card-body-heading'>
                            <h1 className='card-body-title card-body-title--flex shareable-link gap-1'>Shareable link</h1>
                            <OverlayTrigger
                                placement="top"
                                trigger="click"
                                show={copied}
                                overlay={<Tooltip>Copied</Tooltip>}>
                                <Button variant="outline-light" onClick={() => copy(`https://www.blocktickets.xyz/tickets/${stats?.eventUUID}`, setCopied)}>Copy URL</Button>
                            </OverlayTrigger>
                        </div>
                        <p className='text-muted mt-3'>https://www.blocktickets.xyz/tickets/{stats?.eventUUID}</p>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}
