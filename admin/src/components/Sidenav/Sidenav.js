import React from 'react';

import Nav from 'react-bootstrap/Nav';

import { DashboardMenu } from "./DashboardMenu";
import { SettingsMenu } from './SettingsMenu';

import './sidenav.scss';

export default function Sidenav({ event }) {

    const isDashboard = /myevent/.test(window.location)

    return (
        <aside id="sidebarMenu" className='sidebar'>
            <div className="sidebar-wrapper">
                <Nav as="nav" className="position-sticky" activeKey={window.location.pathname}>
                    {isDashboard ? (
                        <DashboardMenu event={event} />
                    ) : (
                        <SettingsMenu />
                    )}
                </Nav>
            </div>
        </aside>
    )
}