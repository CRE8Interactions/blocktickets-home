import React from 'react'

import Card from 'react-bootstrap/Card'

export default function Member({ member }) {
    return (
        <Card className="card-sm" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title as="h5" className='order-2'>{member.name}</Card.Title>
                <Card.Subtitle as="h6">{member.title}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}
