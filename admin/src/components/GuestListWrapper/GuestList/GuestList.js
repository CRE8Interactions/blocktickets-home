import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import AuthService from '../../../utilities/services/auth.service';
import { checkPermission } from '../../../utilities/helpers';
import Stack from 'react-bootstrap/Stack';
import Table from 'react-bootstrap/Table'

import { Guest } from './Guest'
import { EmptyContainer } from '../../EmptyContainer';
import { DeleteModal } from './DeleteModal';
import { guestList, removeGuestList } from '../../../utilities/api';

export default function GuestList() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [show, setShow] = useState(false)

    const [selectedGuest, setSelectedGuest] = useState()

    const { uuid } = useParams();

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 5));
    }, [])

    const handleShow = () => setShow(true);

    const handleClose = () => setShow(false);

    const [guests, setGuests] = useState([])

    useEffect(() => {
        getGL()
    }, [])

    useEffect(( )=> {
        // Listen for selected guest changes
    }, [selectedGuest])

    const getGL = () => {
        guestList(uuid)
        .then((res) => setGuests(res.data))
        .catch((err) => console.error(err))
    }

    const removeGuest= () => {
        let data = {
            id: selectedGuest.id,
            event: uuid
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
            {guests && guests.length > 0 ? (
                <div className="table-container">
                    <Table>
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone number</th>
                                <th>Quantity</th>
                                <th>Ticket type</th>
                                {/* <th>Status</th> */}
                                <th>Quick links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map((guest, index) => (
                                <Guest key={index} guest={guest} handleShow={handleShow}
                                    hasPermission={hasPermission} setSelectedGuest={setSelectedGuest} 
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>

            ) : (
                <EmptyContainer>
                    <p>No guest list created, click Add guests to create a list.</p>
                </EmptyContainer>
            )}
            <DeleteModal show={show} handleClose={handleClose} removeGuest={removeGuest} />
        </>

    );
}
