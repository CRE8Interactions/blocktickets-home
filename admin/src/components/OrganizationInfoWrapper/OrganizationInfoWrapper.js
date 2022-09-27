import React, { useState, useEffect } from 'react';

import { getMyOrganizations } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { OrganizationInformationWrapper } from "../OrganizationInformationWrapper";

// Settings Organization Information page 
export default function OrganizationInfoWrapper() {

    const [orgInfo, setOrgInfo] = useState()

    useEffect(() => {
        getMyOrganizations()
            .then((res) => setOrgInfo(res.data[0]))
    }, [])


    const handleSave = () => {
        // TODO: make orgName unique
    }

    return (
        <section className='wrapper'>
            <header className="section-header">
                <div className="section-heading section-heading--secondary">
                    <h1>Organization info</h1>
                </div>
                <p className='section-header-desc'>Details that apply across your events and billing</p>
            </header>
            <Card body className='card--sm'>
                <OrganizationInformationWrapper getOrgInfo={setOrgInfo} orgInfo={orgInfo} />
            </Card>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button size="lg" onClick={handleSave}>Save</Button>
            </Stack>
        </section>
    );
}
