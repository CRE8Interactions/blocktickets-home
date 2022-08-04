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
                name: "Edit organization info"
            },
            {
                id: "2",
                name: "Edit roles"
            },
            {
                id: "3",
                name: "Add team members"
            },
            {
                id: "4",
                name: "Edit payment information"
            },
            {
                id: "5",
                name: "View payouts"
            },
            {
                id: "6",
                name: "Edit tax status"
            }
        ],
        events: [
            {
                id: "7",
                name: "View events"
            }
        ],
        management: [
            {
                id: "8",
                name: "Create an event"
            },
            {
                id: "9",
                name: "Edit basic info"
            },
            {
                id: "10",
                name: "Edit details"
            },
            {
                id: "11",
                name: "Edit & add tickets"
            },
            {
                id: "12",
                name: "Edit event status (on sale / draft / delete)"
            },
            {
                id: "13",
                name: "View dashboard"
            },
            {
                id: "14",
                name: "View orders"
            },
            {
                id: "15",
                name: "View attendees list"
            },
            {
                id: "16",
                name: "Issue refunds"
            },
            {
                id: "17",
                name: "Edit & add guests"
            },
            {
                id: "18",
                name: "Check in"
            },
            {
                id: "19",
                name: "View primary sales"
            },
            {
                id: "20",
                name: "View secondary sales"
            },
            {
                id: "21",
                name: "Add recipients for automatic reporting"
            },
            {
                id: "22",
                name: "Contact attendees"
            },
            {
                id: "23",
                name: "Edit & add tracking links"
            }
        ],
    }

    const [role, setRole] = useState('')

    const [isCheckAll, setIsCheckAll] = useState(false);

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

    const handleSelectAll = e => {
        const { name } = e.target;
        console.log(name);
        const obj = name ? permissions[`${name}`] : permissions;

        let curIsCheckAll = isCheckAll;
        setIsCheckAll(!isCheckAll)

        if (name) {
            setIsCheck(permissions[`${name}`].map(item => item.id))
        }
        else {
            setIsCheck([...isCheck, ...permissions['settings'].map(item => item.id), ...permissions['events'].map(item => item.id), ...permissions['management'].map(item => item.id)])
        }

        if (isCheckAll) {
            console.log(curIsCheckAll);
            setIsCheck(isCheck.filter(item => item.id !== obj.id))
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
            <CreateRoleModal show={showCreate} handleClose={handleCloseCreate} permissions={permissions} id={id} role={role} setRole={setRole} isCheck={isCheck} handleSelectAll={handleSelectAll} handleCheck={handleCheck} handleCreate={handleCreate} />
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} />
        </>
    )
}
