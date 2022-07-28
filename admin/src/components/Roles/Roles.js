import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Role } from "./Role";
import { AddRoleModal } from './AddRoleModal';

export default function Roles({ roles }) {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const permissions = {
        settings: [
            {
                id: "1",
                name: "Venue info"
            },
            {
                id: "2",
                name: "Team management"
            },
            {
                id: "3",
                name: "Security"
            },
            {
                id: "4",
                name: "Payments"
            },
            {
                id: "5",
                name: "Tax Status"
            }
        ],
    }

    const [role, setRole] = useState('')

    const [isCheck, setIsCheck] = useState(['1', '2', '3'])

    const handleCheck = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const handleCreate = () => {
        handleClose();
    }

    return (
        <>
            <div className='heading--flex mb-4'>
                <h1 className='normal'>Roles</h1>
                <Button variant='outline-light' className="btn-plus btn-plus--dark" onClick={handleShow}>Create a new role</Button>
            </div>
            <Stack as="ul" gap={2}>
                {roles.map((role, index) => (
                    <Role key={index} role={role} />
                ))}
            </Stack>
            <AddRoleModal show={show} handleClose={handleClose} permissions={permissions} role={role} setRole={setRole} isCheck={isCheck} handleCheck={handleCheck} handleCreate={handleCreate} />
        </>
    )
}
