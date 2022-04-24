import { Card, Col, Image, Row, Button } from "react-bootstrap"
import moment from 'moment'

export default function MyEvents({type, orders}) {
  return(
    <>
      {
        orders && orders.length > 0 && orders.map((o, index) => {
          return (
            <Card key={index}>
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <Image
                      src={o?.event?.image?.url} 
                    />
                  </Col>
                  <Col md={9}>
                    <p>{o?.event?.name}</p>
                    <Button className={'float-end'} href={`/order/${o?.orderId}`}>See Details</Button>
                    <p>{moment(o?.event?.start).format('MMM DD h:mm A')}</p>
                    <p>{o?.event?.venue?.address[0]?.city}, {o?.event?.venue?.address[0]?.state} - {o?.event?.venue?.name}</p>
                    <p>Order # {o?.orderId}</p>
                    <p>{o.tickets.length} Tickets</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })
      }
    </>
  )
}