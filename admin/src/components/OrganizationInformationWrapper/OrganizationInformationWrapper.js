import React, { useEffect, useState } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { OrganizationInformation } from './OrganizationInformation'

// child component to parent components 
export default function OrganizationInformationWrapper({ getOrgInfo, orgInfo }) {

    const [org, setOrg] = useState({
        orgName: '',
        address: []
    })

    // update parent state when state changes 
    useEffect(() => {
        getOrgInfo(org)
        // setOrg(orgInfo)
    }, [org])

    const handleOrg = (e) => {
        setOrg({ ...org, [e.target.name]: e.target.value })
    }

    return (
        <OrganizationInformation org={org} handleOrg={handleOrg} />
    )
}
