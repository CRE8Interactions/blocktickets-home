import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Member } from './Member'
import { AddMemberModal } from './AddMemberModal'
import { DeleteModal } from './DeleteModal'

export default function Team({ members }) {

    const roleOpt = [
        {
            label: 'Master Admin',
            value: 'master_admin'
        },
        {
            label: 'Admin',
            value: 'admin'
        },
        {
            label: 'Marketer',
            value: 'marketer'
        },
        {
            label: 'Viewer',
            value: 'viewer'
        },
    ]

    const [member, setMember] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: roleOpt[0].value
    })

    const [id, setId] = useState()

    const [showAdd, setShowAdd] = useState(false);


    const [showDelete, setShowDelete] = useState(false);

    const handleMember = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        handleCloseAdd()
    }

    // handle add and edit 
    const handleShowAdd = (_, id) => {
        setId(id)
        setShowAdd(true)
    }

    const handleCloseAdd = () => setShowAdd(false)

    const handleShowDelete = () => setShowDelete(true)

    const handleCloseDelete = () => setShowDelete(false)

    return (
        <>
            <div className='heading--flex mb-4' id="teams">
                <h1 className='normal'>Team</h1>
                <Button variant='outline-light' className="btn-plus btn-plus--dark" onClick={handleShowAdd}>Invite team member</Button>
            </div>
            <Stack as="ul" gap={2}>
                {members.map((member, index) => (
                    <Member key={index} member={member} handleShowAdd={handleShowAdd} handleShowDelete={handleShowDelete} />
                ))}
            </Stack>
            <AddMemberModal show={showAdd} handleClose={handleCloseAdd} roleOpt={roleOpt} id={id} member={member} handleMember={handleMember} handleAdd={handleAdd} />
            <DeleteModal show={showDelete} handleClose={handleCloseDelete} />
        </>
    )
}
