import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Member } from './Member'
import { AddMemberModal } from './AddMemberModal'
import { DeleteModal } from './DeleteModal'

export default function Team({ members, roles, inviteMember, removeMember, hasPermission = true }) {

    // new and existing role so objects match for controlled input fields 
    // also for setting the deleted member
    const [member, setMember] = useState('')

    // set member id (uuid) as flag for editing member
    const [id, setId] = useState()

    const [showAdd, setShowAdd] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const handleMember = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const handleRole = (e) => {
        const { value } = e.target;
        setMember(prevState => ({
            ...prevState,
            role: {
                ...prevState.role,
                id: value
            }
        }))
    }

    const handleAdd = () => {
        const { firstName, lastName, email } = member;
        const { id } = member.role;
        inviteMember({ firstName, lastName, email, role: id })
        handleCloseAdd()
    }

    // handle add and edit 
    const handleShowAdd = (_, member) => {
        setShowAdd(true)
        if (member) {
            setMember(member)
            setId(member?.uuid)
        }
    }

    const handleCloseAdd = () => {
        setShowAdd(false)
        setMember('')
        setId()
    }

    const handleShowDelete = (member) => {
        setShowDelete(true)
        setMember(member)
    }

    const handleCloseDelete = () => {
        setShowDelete(false)
        setMember('')
    }

    return (
        <>
            <div className='heading--flex mb-4' id="teams">
                <h1 className='normal'>Team</h1>
                <Button variant='outline-light' disabled={!hasPermission} className="btn-plus btn-plus--dark" onClick={handleShowAdd}>Invite team member</Button>
            </div>
            <Stack as="ul" gap={2}>
                {members.map((member, index) => (
                    <Member key={index} member={member} handleShowAdd={handleShowAdd} handleShowDelete={handleShowDelete} />
                ))}
            </Stack>
            <AddMemberModal show={showAdd} handleClose={handleCloseAdd} roles={roles} id={id} member={member} handleMember={handleMember} handleRole={handleRole} handleAdd={handleAdd} />
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} removeMember={removeMember} member={member} />
        </>
    )
}
