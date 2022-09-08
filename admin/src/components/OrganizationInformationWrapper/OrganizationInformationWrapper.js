import React, { useEffect, useState } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { OrganizationInformation } from './OrganizationInformation'

export default function OrganizationInformationWrapper({ orgInfo, setOrgInfo }) {

    const [org, setOrg] = useState({
        orgName: '',
        address: '',
        city: '',
        zip_code: '',
        state: stateOpt[0].value
    })

    // update parent state when state changes 
    useEffect(() => {

    }, [orgInfo])

    const handleOrg = (e) => {
        setOrg({ ...org, [e.target.name]: e.target.value })
    }

    return (
        <OrganizationInformation org={orgInfo} handleOrg={handleOrg} />
    )
}
