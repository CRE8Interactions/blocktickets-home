import React from 'react'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import { MyCarousel } from './MyCarousel'


export default function Sectors() {
    return (
        <section className='benefits d-flex-column text-center'>
            <div className="section-header">
                <h1 className='section-heading-sm'>Tracking all sectors</h1>
                <Tabs
                    defaultActiveKey="0"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="0" title="Arenas & Stadiums">
                        <MyCarousel activeSlide={0} />
                    </Tab>
                    <Tab eventKey="1" title="Amphitheaters">
                        <MyCarousel />
                    </Tab>
                    <Tab eventKey="2" title="Theaters">
                        <MyCarousel />
                    </Tab>
                </Tabs>
            </div>

        </section>
    )
}
