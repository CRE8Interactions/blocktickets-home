import React, { useEffect, useState } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { OrganizationInformation } from './OrganizationInformation'

// child component to parent components SignUp and Settings OrgInfoWrapper to be able to use same component 
export default function OrganizationInformationWrapper({ getOrgInfo, orgInfo, error }) {

    const [org, setOrg] = useState({
        orgName: '',
        address: {
            state: stateOpt[0].value
        }
    })

    // update component state from parent Setting OrganizationInfoWrapper 
    useEffect(() => {
        if (orgInfo) {
            setOrg(orgInfo)
        }

    }, [orgInfo])

    // update parent state when state changes 
    useEffect(() => {
        getOrgInfo(org)
    }, [org])

    const setName = (e) => {
        setOrg({ ...org, [e.target.name]: e.target.value })
    }

    const handleAddress = (e) => {
        const { name, value } = e.target;
        setOrg(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }))
    }

    return (
        <OrganizationInformation org={org} setName={setName} handleAddress={handleAddress} error={error} />
    )
}
