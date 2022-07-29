import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Role } from "./Role";
import { CreateRoleModal } from './CreateRoleModal';
import { DeleteModal } from './DeleteModal';

export default function Roles({ roles }) {

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

    const [id, setId] = useState();

    const [showCreate, setShowCreate] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    // handle create and edit
    const handleShowCreate = (_, id) => {
        setId(id)
        setShowCreate(true)
    }

    const handleCloseCreate = () => setShowCreate(false)

    const handleShowDelete = () => setShowDelete(true)

    const handleCloseDelete = () => setShowDelete(false)

    const handleCheck = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    const handleCreate = () => {
        handleCloseCreate();
    }

    return (
        <>
            <div className='heading--flex mb-4'>
                <h1 className='normal'>Roles</h1>
                <Button variant='outline-light' className="btn-plus btn-plus--dark" onClick={handleShowCreate}>Create a new role</Button>
            </div>
            <Stack as="ul" gap={2}>
                {roles.map((role, index) => (
                    <Role key={index} role={role} handleShowCreate={handleShowCreate} handleShowDelete={handleShowDelete} />
                ))}
            </Stack>
            <CreateRoleModal show={showCreate} handleClose={handleCloseCreate} permissions={permissions} id={id} role={role} setRole={setRole} isCheck={isCheck} handleCheck={handleCheck} handleCreate={handleCreate} />
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} />
        </>
    )
}
