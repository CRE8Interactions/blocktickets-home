import React from 'react'

import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge'
import { formatString } from '../../../utilities/helpers';
import { EditDeleteDropdown } from '../../EditDeleteDropdown';

export default function Member({ member }) {

    return (
        <Stack direction="horizontal" as="li" className='list-item split-row'>
            <h2 className='normal m-0'>{formatString(member.name)}</h2>
            <Stack direction='horizontal' gap={2}>
                <Badge bg={`${member.role === 'master_admin' ? 'success' : 'default'}`} className={`text-uppercase ${member.role !== 'master_admin' ? 'badge-outline badge-outline--dark' : ''}`}>{formatString(member.role)}</Badge>
                <EditDeleteDropdown />
            </Stack>
        </Stack>
    )
}
