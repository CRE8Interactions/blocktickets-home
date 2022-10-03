import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import AuthService from '../../../utilities/services/auth.service';
import { guestList, removeGuestList } from '../../../utilities/api';
import { checkPermission } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card'

import { Guest } from './Guest'
import { EmptyContainer } from '../../EmptyContainer';
import { DeleteModal } from './DeleteModal';

export default function GuestList({ eventId }) {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [show, setShow] = useState(false)

    // selected guest id 
    const [id, setId] = useState()

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 5));
    }, [])

    const handleShow = (id) => {
        setShow(true);
        setId(id)
    }

    const handleClose = () => {
        setShow(false);
        setId();
    }

    const [guests, setGuests] = useState([])

    useEffect(() => {
        getGL()
    }, [])

    const getGL = () => {
        guestList(eventId)
            .then((res) => setGuests(res.data))
            .catch((err) => console.error(err))
    }

    const removeGuest = () => {
        let data = {
            id,
            event: eventId
        }
        removeGuestList(data)
            .then((res) => getGL())
            .catch((err) => console.error(err))
    }

    return (
        <>
            <Stack direction='horizontal' className='mb-5'>
                <Link to='add' className={`btn btn-outline-light btn-lg btn-plus btn-plus--dark ms-auto ${!hasPermission ? 'btn-link-disabled' : ''} `}>Add guest</Link>
            </Stack>
            <Card body>
                {guests && guests.length > 0 ? (
                    <div className="list-table five-col" role="table">
                        <div className="flex-row list-table-header" role="rowgroup">
                            <div className='list-table-col list-table-col-header' role="columnheader">
                                <span>First name</span>
                            </div>
                            <div className='list-table-col list-table-col-header  ' role="columnheader">
                                <span>Last name</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Phone number</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Quantity</span>
                            </div>
                            <div className="list-table-col list-table-col-header" role="columnheader">
                                <span>Ticket type</span>
                            </div>
                        </div>
                        {guests.map((guest, index) => (
                            <Guest key={index} guest={guest} handleShow={handleShow} />
                        ))}
                    </div>
                ) : (
                    <EmptyContainer>
                        <p>No guest list created, click Add guests to create a list.</p>
                    </EmptyContainer>
                )}
            </Card>
            <DeleteModal show={show} handleClose={handleClose} id={id} removeGuest={removeGuest} />
        </>

    );
}
