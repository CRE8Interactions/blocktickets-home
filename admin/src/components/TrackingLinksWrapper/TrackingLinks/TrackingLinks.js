import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { TrackingLink } from './TrackingLink'
import { EmptyContainer } from '../../EmptyContainer';
import { DeleteModal } from './DeleteModal';

export default function TrackingLinks({promos}) {

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const totalTicketsSold = (object) => {
        return parseInt(object?.reduce((accumulator, object) => {
            return accumulator + (object?.ticketsSold);
        }, 0));
    }

    const totalGross = (object) => {
        return parseFloat(object?.reduce((accumulator, object) => {
            return accumulator + parseFloat(object?.grossSales);
        }, 0)).toFixed(2);
    }

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Link to='add' className="btn btn-outline-light btn-lg btn-plus btn-plus--dark ms-auto">Create tracking link</Link>
            </Stack>
            <Card body>
                {promos && promos.length > 0 ? (
                    <div className="list-table five-col" role="table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header lg' role="columnheader">
                                <span>Name</span>
                            </div>
                            <div className="list-table-col list-table-col-header lg-2" role="columnheader">
                                <span>Link</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Views</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Tickets sold</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Gross sales</span>
                            </div>
                        </div>
                        {promos?.map((link, index) => (
                            <TrackingLink key={index} link={link} handleShow={handleShow} />
                        ))}
                        <div className="total-row flex-row" role="row">
                            <div className="list-table-col list-table-col lg" role="cell">
                                <span>Total</span>
                            </div>
                            <div className="list-table-col list-table-col" role="cell">
                                <span>&nbsp;</span>
                            </div>
                            <div className="list-table-col list-table-col" role="cell">
                                <span>{totalTicketsSold(promos)}</span>
                            </div>
                            <div className="list-table-col list-table-col" role="cell">
                                <span>${totalGross(promos)}</span>
                            </div>
                        </div>
                    </div>

                ) : (
                    <EmptyContainer>
                        <p>There are no events to track, create a new event to track its link.</p>
                    </EmptyContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} />
        </>

    );
}
