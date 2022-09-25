import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Member } from './Member'
import { AddMemberModal } from './AddMemberModal'
import { DeleteModal } from './DeleteModal'

export default function Team({ members, roles, inviteMember, removeMember }) {
    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    })

    const [role, setRole] = useState()

    const [id, setId] = useState()

    const [showAdd, setShowAdd] = useState(false);


    const [showDelete, setShowDelete] = useState(false);

    const [removeSelectedMember, setRemoveSelectedMember] = useState()

    const handleMember = (e) => {
        const role = document.getElementById('role').value;
        setRole(role)
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        inviteMember({...member, role})
        handleCloseAdd()
    }

    // handle add and edit 
    const handleShowAdd = (_, id) => {
        setId(id)
        setShowAdd(true)
        setMember(id)
    }

    const handleCloseAdd = () => setShowAdd(false)

    const handleShowDelete = (member) => {
        setShowDelete(true)
        setRemoveSelectedMember(member)
    }

    const handleCloseDelete = () => setShowDelete(false)

    return (
        <>
            <div className='heading--flex mb-4' id="teams">
                <h1 className='normal'>Team</h1>
                <Button variant='outline-light' className="btn-plus btn-plus--dark" onClick={handleShowAdd}>Invite team member</Button>
            </div>
            <Stack as="ul" gap={2}>
                {members.map((member, index) => (
                    <Member key={index} member={member} handleShowAdd={handleShowAdd} handleShowDelete={handleShowDelete} setRemoveSelectedMember={setRemoveSelectedMember} />
                ))}
            </Stack>
            <AddMemberModal show={showAdd} handleClose={handleCloseAdd} roles={roles} id={id} member={member} handleMember={handleMember} handleAdd={handleAdd} />
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} removeMember={removeMember} removeSelectedMember={removeSelectedMember} />
        </>
    )
}
