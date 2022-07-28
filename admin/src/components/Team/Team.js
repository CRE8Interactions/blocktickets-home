import React, { useState } from 'react'

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

import { Member } from './Member'
import { AddMemberModal } from './AddMemberModal'

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

    const [show, setShow] = useState(false);

    const handleMember = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const handleAdd = () => {
        handleClose()
    }

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    return (
        <>
            <div className='heading--flex mb-4' id="teams">
                <h1 className='normal'>Team</h1>
                <Button variant='outline-light' className="btn-plus btn-plus--dark" onClick={handleShow}>Invite team member</Button>
            </div>
            <Stack as="ul" gap={2}>
                {members.map((member, index) => (
                    <Member key={index} member={member} />
                ))}
            </Stack>
            <AddMemberModal show={show} handleClose={handleClose} roleOpt={roleOpt} member={member} handleMember={handleMember} handleAdd={handleAdd} />
        </>
    )
}
