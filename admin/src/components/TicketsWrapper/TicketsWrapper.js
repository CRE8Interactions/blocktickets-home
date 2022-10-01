import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthService from '../../utilities/services/auth.service';
import { checkPermission } from '../../utilities/helpers';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { Tickets } from './Tickets';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function TicketsWrapper({ tickets, eventStatus, eventId }) {

    const navigate = useNavigate();
    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    useEffect(() => {
        setHasPermission(checkPermission(getPermissions(), 1));

    }, [])

    return (
        <div className='position-relative'>
            <section className={`max-width-wrapper event-form ${!hasPermission ? 'overlay' : ''}`}>
                <header className="section-header-sm section-heading--flex section-heading section-heading--secondary">
                    <h1>Tickets</h1>
                    <Button variant="outline-light" className='btn-plus btn-plus--dark' onClick={() => navigate('create')}>Add ticket</Button>
                </header>
                <Tickets tickets={tickets} />
            </section>
            {/* only show if event is not published yet */}
            {eventStatus === "unpublished" && (
                <div className="btn-footer">
                    <Stack direction="horizontal" className="btn-group-flex max-width-wrapper">
                        <Link to={`/myevent/${eventId}/publish`} className={`btn btn-primary btn-lg btn-next ${tickets?.length > 0 ? '' : 'btn-link-disabled'} ${!hasPermission ? 'overlay' : ''}`}>Publish</Link>
                    </Stack>
                </div>
            )}

            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
