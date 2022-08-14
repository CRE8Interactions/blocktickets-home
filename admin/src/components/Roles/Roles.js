import React, { useState, useEffect } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Role } from "./Role";
import { CreateRoleModal } from './CreateRoleModal';
import { DeleteModal } from './DeleteModal';

export default function Roles({ roles, permissions, createRoles, setRoles }) {
  
    const [role, setRole] = useState('')

    const [isCheckAll, setIsCheckAll] = useState(false);

    const [isCheck, setIsCheck] = useState([])

    const [id, setId] = useState();

    const [showCreate, setShowCreate] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [createRole, setCreateRole] = useState()

    // handle create and edit
    const handleShowCreate = (_, id) => {
        setId(id)
        setShowCreate(true)
        setRole(id)
    }

    const handleCloseCreate = () => { setShowCreate(false); setIsCheck([]) }

    const handleShowDelete = (role) => { setShowDelete(true); setRole(role)}

    const handleCloseDelete = () => setShowDelete(false)

    const handleCheck = e => {
        const { id, checked } = e.target;
        setIsCheck([...isCheck, Number(id)]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== Number(id)));
        }
    };

    useEffect(() => {
        if (!role) setIsCheck([]);
        if (role) setIsCheck([...isCheck, ...role?.organization_permissions.map(item => item.id)])
    }, [role])

    const handleSelectAll = e => {
        const { name } = e.target;

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
            setIsCheck(isCheck.filter(item => item.id !== obj.id))
        }
    };

    const handleCreate = () => {
        createRoles({roleName: createRole, permissions: isCheck, currentRole: role})
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

            <CreateRoleModal show={showCreate} handleClose={handleCloseCreate} permissions={permissions} id={id} role={role} setRole={setCreateRole} isCheck={isCheck} handleSelectAll={handleSelectAll} handleCheck={handleCheck} handleCreate={handleCreate} />
            
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} role={role} setRoles={setRoles} />
        </>
    )
}
