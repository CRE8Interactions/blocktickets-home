import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { Roles } from "../Roles";
import { Team } from "../Team";

export default function TeamManagementWrapper() {

    // demo purposes: will come from database - delete later
    const roles = ['master_admin', 'admin', 'marketer', 'viewer']

    // demo purposes: will come from database - delete later 
    const members = [
        {
            name: 'harrison_cogan',
            role: 'master_admin',
        },
        {
            name: 'chaz_haskins',
            role: 'viewer',
        },
        {
            name: 'florenc_sinanaj',
            role: 'marketer',
        },
        {
            name: 'jaime_convery',
            role: 'admin',
        }
    ]

    const [
        key,
        setKey
    ] = useState('roles');

    return (
        <section className='wrapper'>
            <header className="section-header">
                <div className="section-heading section-heading--secondary">
                    <h1>Team management</h1>
                </div>
                <p className='section-header-desc'>Manage your team members and their roles</p>
            </header>
            <Card body className='card--sm'>
                <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                    <div className='d-flex mb-5 '>
                        <Nav as="ul" variant="pills" justify>
                            <Nav.Item as="li">
                                <Nav.Link as="button" eventKey="roles">
                                    Roles
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link as="button" eventKey="team">
                                    Team
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <Tab.Content>
                        <Tab.Pane eventKey="roles">
                            <Roles roles={roles} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="team">
                            <Team members={members} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
        </section>
    )
}
