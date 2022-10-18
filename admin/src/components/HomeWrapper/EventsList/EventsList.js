import React, { useState } from "react";
import moment from 'moment';

import Card from 'react-bootstrap/Card';

import { Event } from "./Event";
import { DeleteModal } from './DeleteModal';

import './eventsList.scss';

export default function EventsList({ events, eventStatus }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    if (events && eventStatus === 'published') events = events.filter((event) => event?.status === 'on_sale')
    if (events && eventStatus === 'draft') events = events.filter((event) => (event?.status === 'unpublished' || event?.status === "scheduled"))
    if (events && eventStatus === 'past') events = events.filter((event) => event?.status === 'published' && moment(event?.eventDate) < moment())

    return (
        <>
            <Card body>
                {events?.length > 0 ? (
                    <div id="events-table" className="list-table three-col" role="table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header lg-2' role="columnheader">
                                <span>Event</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Tickets sold</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Total sales</span>
                            </div>
                            {/* <div className="list-table-col list-table-col-header lg" role="columnheader">
                            <span>Secondary sold</span>
                        </div>
                        <div className="list-table-col list-table-col-header lg" role="columnheader">
                            <span>Royalties</span>
                        </div> */}
                            <div className="list-table-col list-table-col-header text-center" role="columnheader">
                                <span>Status</span>
                            </div>
                        </div>
                        {events?.map((event, index) => (
                            <Event key={index} event={event} eventStatus={eventStatus} handleShow={handleShow} />
                        ))}
                    </div>
                ) : (
                    <>
                        <h1 className="fs-md text-center">No events to show</h1>
                        <p className="small text-center">Create events now and start selling tickets</p>
                    </>
                )}

            </Card>
            <DeleteModal show={show} handleClose={handleClose}></DeleteModal>
        </>
    )
}