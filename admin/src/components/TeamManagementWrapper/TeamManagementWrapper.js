import React, { useState, useEffect } from 'react';

import AuthService from '../../utilities/services/auth.service';
import {
    getOrganizationRoles, getOrganizationPermissions,
    createOrEditRole, getTeam, createOrEditMember, removeTeamMember
} from '../../utilities/api'
import { checkPermission, formatPermissions, formatMembers } from '../../utilities/helpers'

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import { Roles } from "../Roles";
import { Team } from "../Team";

export default function TeamManagementWrapper() {

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [
        key,
        setKey
    ] = useState('roles');

    const [roles, setRoles] = useState([])

    const [permissions, setPermissions] = useState([])

    const [members, setMembers] = useState([])

    useEffect(() => {
        getRolesAndPermissions()

        setHasPermission(checkPermission(getPermissions(), 9));
    }, [])

    const getRolesAndPermissions = () => {
        getOrganizationRoles()
            .then((res) => {
                setRoles(res.data)
            })
            .catch((err) => console.error(err))

        getOrganizationPermissions()
            .then((res) => setPermissions(formatPermissions(res.data.data)))
            .catch((err) => console.error(err))

        getTeam()
            .then((res) => setMembers(formatMembers(res.data?.members)))
            .catch((err) => console.error(err))
    }

    const createRoles = (data) => {
        createOrEditRole({ data })
            .then((res) => setRoles(res.data))
            .catch((err) => console.error(err))
    }

    const inviteMember = (member) => {
        createOrEditMember({ member })
            .then((res) => {
                setMembers(formatMembers(res.data))
            })
            .catch((err) => console.error(err))
    }

    const removeMember = (member) => {
        removeTeamMember(member)
            .then((res) => {
                let newMembers = members.filter(m => m.email != member?.email)
                setMembers(newMembers)
            })
            .catch((err) => console.error(err))
    }

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
                            <Roles roles={roles} permissions={permissions} createRoles={createRoles} setRoles={setRoles}
                                hasPermission={hasPermission}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="team">
                            <Team members={members} roles={roles} inviteMember={inviteMember} removeMember={removeMember}
                                hasPermission={hasPermission}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card>
        </section>
    )
}
