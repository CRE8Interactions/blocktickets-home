import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { OrganizerFeatures } from './OrganizerFeatures';
import { FanFeatures } from './FanFeatures';

import './features.scss';

export default function Features() {
    return (
        <section className='features d-flex-column text-center'>
            <div className="section-header">
                <h1 className='section-heading-sm'>New innovative features</h1>
                <h2 className="subtitle">and it's bigger in every way</h2>
            </div>
            <Tabs
                defaultActiveKey="organizers"
                transition={false}
                id="features"
            >
                <Tab eventKey="organizers" title="For Organizers">
                    <OrganizerFeatures />
                </Tab>
                <Tab eventKey="fans" title="For Fans">
                    <FanFeatures />
                </Tab>
            </Tabs>
        </section>
    )
}
