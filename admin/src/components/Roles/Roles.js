import React, { useState, useEffect } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Role } from "./Role";
import { CreateRoleModal } from './CreateRoleModal';
import { DeleteModal } from './DeleteModal';

export default function Roles({ roles, permissions, createRoles, setRoles, hasPermission = true }) {

    // new and existing role so objects match for controlled input fields 
    const [role, setRole] = useState('')

    // for editing - save role id for flag when sending original role when editing 
    const [id, setId] = useState();

    const [isCheckAll, setIsCheckAll] = useState(false);

    const [isCheck, setIsCheck] = useState([])

    const [showCreate, setShowCreate] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    // reset permissions when adding or editing 
    useEffect(() => {
        // if adding role  
        if (!id) setIsCheck([]);
        // if editing existing role
        if (id) setIsCheck([...isCheck, ...role?.organization_permissions.map(item => item.id)])
    }, [id])

    // handle create and edit
    const handleShowCreate = (_, role) => {
        setShowCreate(true)
        if (role) {
            setId(role?.id)
            setRole(role)
        }
    }

    const handleCloseCreate = () => {
        setShowCreate(false);
        setIsCheck([]);
        setRole('')
        setId()
    }

    const handleShowDelete = (role) => {
        setShowDelete(true);
        setRole(role)
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
        setRole('')
    }

    const handleCheck = e => {
        const { id, checked } = e.target;
        setIsCheckAll(!isCheckAll)
        setIsCheck([...isCheck, Number(id)]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== Number(id)));
        }
    };

    const handleSelectAll = e => {
        const { name } = e.target;

        const obj = name ? permissions[`${name}`] : permissions;

        setIsCheckAll(!isCheckAll)

        if (name) {
            setIsCheck(permissions[`${name}`].map(item => item.id))
        }
        else {
            setIsCheck([...isCheck, ...permissions['settings'].map(item => item.id), ...permissions['management'].map(item => item.id)])
            // setIsCheck([...isCheck, ...permissions['settings'].map(item => item.id), ...permissions['events'].map(item => item.id), ...permissions['management'].map(item => item.id)])
        }

        if (isCheckAll) {
            setIsCheck(isCheck.filter(item => item.id !== obj.id))
        }
    };

    const handleCreate = () => {
        createRoles({ roleName: role?.name, permissions: isCheck, currentRole: id ? role : undefined })
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
                    <Role key={index} role={role} handleShowCreate={handleShowCreate} handleShowDelete={handleShowDelete} hasPermission={hasPermission} />
                ))}
            </Stack>

            <CreateRoleModal show={showCreate} handleClose={handleCloseCreate} permissions={permissions} id={id} role={role} setRole={setRole} isCheck={isCheck} handleSelectAll={handleSelectAll} handleCheck={handleCheck} handleCreate={handleCreate} />

            <DeleteModal show={showDelete} handleClose={handleCloseDelete} id={role.id} setRoles={setRoles} />
        </>
    )
}
