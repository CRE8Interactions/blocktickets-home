import React, { useEffect, useState } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { OrganizationInformation } from './OrganizationInformation'

export default function OrganizationInformationWrapper({ getOrgInfo }) {

    const [org, setOrg] = useState({
        org: '',
        address: '',
        city: '',
        zip_code: '',
        state: stateOpt[0].value
    })

    // update parent state when state changes 
    useEffect(() => {
        getOrgInfo(org)
    }, [org])

    const handleOrg = (e) => {
        setOrg({ ...org, [e.target.name]: e.target.value })
    }

    return (
        <OrganizationInformation org={org} handleOrg={handleOrg} />
    )
}
