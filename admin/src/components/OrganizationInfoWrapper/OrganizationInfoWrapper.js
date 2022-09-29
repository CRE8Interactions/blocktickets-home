import React, { useState, useEffect } from 'react';

import { getMyOrganizations, updateOrgDetails } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { OrganizationInformationWrapper } from "../OrganizationInformationWrapper";

// Settings Organization Information page 
export default function OrganizationInfoWrapper() {

    const [orgInfo, setOrgInfo] = useState()

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    useEffect(() => {
        getMyOrganizations()
            .then((res) => setOrgInfo(res.data[0]))
    }, [])


    const handleSave = () => {
        // TODO: make orgName unique
       
        updateOrgDetails(orgInfo)
            .then((res) => {
                setAlert({
                    show: true,
                    variant: 'success',
                    message: 'Your info has been updated.'
                })
            })
            .catch((err) => {
                console.error(err)
                setAlert({
                    show: true,
                    variant: 'danger',
                    message: 'Unable to save info please try again.'
                })
            })
    }

    return (
        <section className='wrapper'>
            {alert.show &&
                <>
                    <Alert variant={alert.variant} className="mb-5" onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                        {alert.message}
                    </Alert>
                </>
            }
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
