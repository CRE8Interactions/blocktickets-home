import React from 'react'

import { formatString } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack'

import { EditDeleteDropdown } from "../../EditDeleteDropdown";

export default function Role({ role, handleShowCreate, handleShowDelete }) {

    return (
        <Stack direction="horizontal" as="li" className='list-item split-row'>
            <h2 className='normal m-0'>{formatString(role)}</h2>
            {role !== 'master_admin' && (
                <EditDeleteDropdown onClick={(e) => handleShowCreate(e, role)} handleShow={handleShowDelete} />
            )}
        </Stack>
    )
}
