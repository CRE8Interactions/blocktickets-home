import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../../../utilities/services/auth.service';
import { checkPermission, formatCurrency, formatNumber } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import { TrackingLink } from './TrackingLink'
import { EmptyContainer } from '../../EmptyContainer';
import { DeleteModal } from './DeleteModal';

export default function TrackingLinks({ promos }) {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 7));

    }, [])

    const totalViews = (object) => {
        return formatNumber(object?.reduce((accumulator, object) => {
            return accumulator + (object?.views);
        }, 0));
    }

    const totalTicketsSold = (object) => {
        return formatNumber(object?.reduce((accumulator, object) => {
            return accumulator + (object?.ticketsSold);
        }, 0));
    }

    const totalGross = (object) => {
        return formatCurrency(object?.reduce((accumulator, object) => {
            return accumulator + parseFloat(object?.grossSales);
        }, 0));
    }

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Link to='add' className={`btn btn-outline-light btn-lg btn-plus btn-plus--dark ms-auto ${!hasPermission ? 'btn-link-disabled' : ''}`}>Create tracking link</Link>
            </Stack>
            <Card body>
                {promos && promos.length > 0 ? (
                    <div className="list-table four-col" role="table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header' role="columnheader">
                                <span>Name</span>
                            </div>
                            <div className="list-table-col list-table-col-header lg" role="columnheader">
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
                            <TrackingLink key={index} link={link} handleShow={handleShow} hasPermission={hasPermission} />
                        ))}
                        <div className="total-row flex-row" role="row">
                            <div className="list-table-col list-table-col total-col" role="cell">
                                <span>Total</span>
                            </div>
                            <div className="list-table-col list-table-col total-col lg" role="cell">
                                <span>&nbsp;</span>
                            </div>
                            <div className="list-table-col list-table-col total-col" role="cell">
                                <span>{totalViews(promos)}</span>
                            </div>
                            <div className="list-table-col list-table-col total-col" role="cell">
                                <span>{totalTicketsSold(promos)}</span>
                            </div>
                            <div className="list-table-col list-table-col total-col" role="cell">
                                <span>{totalGross(promos)}</span>
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
