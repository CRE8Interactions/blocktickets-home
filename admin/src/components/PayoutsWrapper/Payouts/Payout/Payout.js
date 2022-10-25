import React, { useState } from 'react';

import { formatCurrency, formatOrderId } from '../../../../utilities/helpers';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';

export default function Payout({ payout }) {

    const [open, setOpen] = useState(false);

    return (
        <li className="list-item payout-row">
            <Button variant="link" className=" btn-toggle" onClick={() => setOpen(!open)}
                aria-controls="payout-desc"
                aria-expanded={open}>
                <Stack className='justify-content-center'>
                    <h2 className='normal m-0 fw-medium'>{payout.date}</h2>
                </Stack>
                <Stack className='gap-3'>
                    <p className='event normal fw-semi-bold text-truncate'>{payout.event}</p>
                    <small>Invoice {formatOrderId(payout.invoice)}</small>
                </Stack>
                <Stack className='align-items-center'>
                    <span className='normal fw-semi-bold'>{formatCurrency(payout.price)}</span>
                    <Badge bg="default" className='badge-outline badge-outline--dark'>{payout.status}</Badge>
                </Stack>
            </Button>
            <Collapse in={open}>
                <div id="payout-desc">
                    <ul className='d-flex'>
                        <Stack as="li" className='main-list'>
                            <ul className='d-flex-column gap-4'>
                                <li>
                                    <p className="heading">Event name</p>
                                    <span>Nic Fanciulli Live</span>
                                </li>
                                <li>
                                    <p className="heading">Event date</p>
                                    <span>Mar 10, 2022</span>
                                </li>
                                <li>
                                    <p className="heading">Payment information</p>
                                    <ul>
                                        <li>Comerica Bank</li>
                                        <li>Checking TPG USA XXXXXX674232</li>
                                        <li>US. Dollars, United States</li>
                                    </ul>
                                </li>
                                <li>
                                    <p className="heading">Currency</p>
                                    <span>$USD</span>
                                </li>
                                <li>
                                    <p className="heading">Payout ID</p>
                                    <span>123123123123</span>
                                </li>
                                <li>
                                    <p className="heading">Trace ID</p>
                                    <span>123123123123</span>
                                </li>
                                <li>
                                    <p className="heading">Payment type</p>
                                    <span>Final or processing</span>
                                </li>
                                <li>
                                    <p className="heading">Event status</p>
                                    <span>Completed</span>
                                </li>
                            </ul>
                        </Stack>
                        <Stack as="li" className='main-list'>
                            <ul className='d-flex-column gap-4'>
                                <li>
                                    <p className="heading">Sent date</p>
                                    <span>Mar 10, 2022</span>
                                </li>
                                <li>
                                    <p className="heading">Expected arrival date</p>
                                    <span>Mar 10, 2022</span>
                                </li>
                                <li>
                                    <p className="heading">Sales summary</p>
                                    <ul>
                                        <li>
                                            <Stack direction="horizontal" className="split-row">
                                                <span>Gross online sales</span>
                                                <span className='text-end'>{formatCurrency(1000)}</span>
                                            </Stack>
                                        </li>
                                        <li>
                                            <Stack direction="horizontal" className="split-row">
                                                <span>Royaltiese (resales)</span>
                                                <span className='text-end'>{formatCurrency(100)}</span>
                                            </Stack>
                                        </li>
                                        <li>
                                            <Stack direction="horizontal" className="split-row">
                                                <span>Blocktickets service fees </span>
                                                <span className='text-end'>({formatCurrency(100)})</span>
                                            </Stack>
                                        </li>
                                        <li>
                                            <Stack direction="horizontal" className="split-row">
                                                <span>Blocktickets processing fee</span>
                                                <span className='text-end'>({formatCurrency(20)})</span>
                                            </Stack>
                                        </li>
                                        <li>
                                            <Stack direction="horizontal" className="split-row">
                                                <span>Facility Fee</span>
                                                <span className='text-end'>({formatCurrency(30)})</span>
                                            </Stack>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Stack direction="horizontal" className="split-row">
                                        <span className='heading'>Net ticket sales</span>
                                        <span className='text-end'>({formatCurrency(20)})</span>
                                    </Stack>
                                </li>
                                <li>
                                    <Stack direction="horizontal" className="split-row">
                                        <span className='heading'>Payout amount</span>
                                        <span className='text-end'>({formatCurrency(850)})</span>
                                    </Stack>
                                </li>
                            </ul>

                            <Button variant="light" className="align-self-start  mt-auto btn-upload">
                                Download PDF
                            </Button>
                        </Stack>
                    </ul>
                    <Alert variant="info" className='alert-info--light'>
                        <small>If you have questions about processing time after your Blocktickets account shows the payout is sent, contact your bank directly.</small></Alert>
                </div>
            </Collapse>
        </li>
    );
}
