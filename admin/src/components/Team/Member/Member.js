import React from 'react'

import { formatString } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge'

import { EditDeleteDropdown } from '../../EditDeleteDropdown';

export default function Member({ member, handleShowAdd, handleShowDelete }) {
    return (
        <Stack direction="horizontal" as="li" className='list-item split-row'>
            <h2 className='normal m-0'>{formatString(member?.name)}</h2>
            <Stack direction='horizontal' gap={2}>
                <Badge bg={`${member?.role?.name === 'Admin' ? 'success' : 'default'}`} className={`text-uppercase ${member?.role?.name !== 'Admin' ? 'badge-outline badge-outline--dark' : ''}`}>{formatString(member?.role?.name)}</Badge>
                {member.role !== 'master_admin' && (
                    <EditDeleteDropdown onClick={(e) => handleShowAdd(e, member)} handleShow={handleShowDelete} />
                )}
            </Stack>
        </Stack>
    )
}
