import { useEffect, useContext, useState } from "react";
import OrganizationContext from "../../../context/Organization/Organization";
import { Table, Row, Col, ProgressBar, Image, Dropdown } from "react-bootstrap";
import { FaEllipsisV } from 'react-icons/fa';
import { PublishEvent } from "../../Modals/PublishEvent";
import { publishEvent } from "../../../utilities/api";

export default function ShowTable(props) {
  const org = useContext(OrganizationContext)
  const { handleTicketShow } = props;
  const [events, setEvents] = useState()
  const [event, setEvent] = useState()
  const [gross, setGross] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let sum;
  let selectedEvent;

  useEffect(() => {
    setEvents(org.orgs[0]['events'])
    console.log(org.orgs[0]['events'])
  }, [org.orgs])

  const calculateSold = (tickets) => {
    let availableTickets = tickets
    let soldTickets = tickets.filter((ticket) => ticket.on_sale_status === 'sold')
    let availableCount = availableTickets.length
    let soldCount = soldTickets.length
    let percentage = (soldCount / availableCount) * 100
    let prices = soldTickets.map(ticket => ticket.cost + ticket.fee);
    sum = prices.reduce((a, b) => a + b, 0);

    return (
      <>
        <p> {soldCount} / {availableCount} </p>
        <ProgressBar now={percentage} />
      </>
    )
  }

  const publish = (event) => {
    publishEvent(event)
      .then((res) => {
        let updateEvent = events.find(e => e.id === event.id)
        updateEvent.status = 'on_sale'
        handleClose()
      })
      .catch((err) => console.error(err))
  }

  return(
    <>
      <Table bordered hover>
      <thead>
        <tr>
          <th>Event</th>
          <th>Sold</th>
          <th>Gross</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { events && 
          events.map((event, index) => {
            return(
              <tr key={index}>
                <td>
                  <Row>
                    <Col md="4">
                      <Image src={event?.image?.url} rounded="true" width="120" height="80" />
                    </Col>
                    <Col>
                      <p className="mb-0">{event?.name}</p>
                      <p className="mb-0">{event?.venue?.name}</p>
                      <p className="mb-0">{event?.start}</p>
                    </Col>
                  </Row>
                </td>
                <td>
                  { calculateSold(event.tickets)}
                </td>
                <td>$ {sum}</td>
                <td> {event.status} </td>
                <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    { event && event.status === 'unpublished' &&
                      <Dropdown.Item href="#/action-1" onClick={(e) => { handleShow(); setEvent(event)  } }>Publish</Dropdown.Item>
                    }
                    <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                    <Dropdown.Item href="#2" onClick={(e) => handleTicketShow(event) }>Add Tickets</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </td>
              </tr>
            )
          })
        }
      </tbody>
      </Table>
      <PublishEvent show={show} handleClose={handleClose} event={event} publish={publish} />
    </>
  )
}