import React, { useState, useEffect } from 'react';

import AuthService from '../../utilities/services/auth.service';
import { getMyOrganizations, updateOrgDetails } from '../../utilities/api';
import { checkPermission } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { OrganizationInformationWrapper } from "../OrganizationInformationWrapper";
import { NoPermissionsContainer } from '../NoPermissionsContainer';

// Settings Organization Information page 
export default function OrganizationInfoWrapper() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [orgInfo, setOrgInfo] = useState()

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    useEffect(() => {
        getMyOrganizations()
            .then((res) => setOrgInfo(res.data[0]))

        setHasPermission(checkPermission(getPermissions(), 8));

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
        <div className="position-relative">
            <section className={`wrapper ${!hasPermission ? 'overlay' : ''}`}>
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
            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
