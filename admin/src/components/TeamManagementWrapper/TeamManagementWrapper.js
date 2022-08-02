import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
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
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    variant="pills"
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="roles" title="Roles">
                        <Roles roles={roles} />
                    </Tab>
                    <Tab eventKey="team" title="Team">
                        <Team members={members} />
                    </Tab>
                </Tabs>
            </Card>
        </section>
    )
}
