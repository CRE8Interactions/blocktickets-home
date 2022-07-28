import React from 'react'

import { formatString } from '../../../utilities/helpers';

import Stack from 'react-bootstrap/Stack'

import { EditDeleteDropdown } from "../../EditDeleteDropdown";

export default function Role({ role }) {

    return (
        <Stack direction="horizontal" as="li" className='list-item split-row'>
            <h2 className='normal m-0'>{formatString(role)}</h2>
            <EditDeleteDropdown />
        </Stack>
    )
}
