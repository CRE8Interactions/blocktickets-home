import React from 'react'

import Card from 'react-bootstrap/Card'

export default function OurMission() {
    return (
        <section>
            <div className="section-header">
                <h1 className='section-heading '>Our mission</h1>
            </div>
            <Card body className="card--light">
                <Card.Text as="p" className="text-dark"><span className="text-secondary">Blocktickets</span> is a Web 3 ticket solution for live events providing artists, organizers, and fans secure NFT tickets via blockchain, secondary market control, and ticket fraud prevention.</Card.Text>
                <Card.Text as="p" className="text-dark">Our solution breaks open the barrier to entry for fans who are not crypto proficient and allows for purchases to be made using standard payment methods while still benefiting from blockchain technology.</Card.Text>
                <Card.Text as="p" className="text-dark">Organizers and artists utilize our innovative features such as airdrops to connect with their true fans in an unprecedented manner, furthering the growth and development of their fanbase.</Card.Text>
                <Card.Text as="p" className='text-secondary'>This mission is simple.</Card.Text>
                <Card.Text as="p" className='fw-bold text-dark'>Empowerment, security, and control for organizers and fans</Card.Text>
            </Card>
        </section>
    )
}
