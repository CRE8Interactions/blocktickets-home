import React, { useEffect, useContext, useState } from "react";

import OrganizationContext from "../../../context/Organization/Organization";

import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";

import { UpArrow } from "../../../components";
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

//   useEffect(() => {
//     setEvents(org.orgs[0]['events'])
//     console.log(org.orgs[0]['events'])
//   }, [org.orgs])

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
      <Table hover>
      <thead>
        <tr>
          <th>Event</th>
          <th>Primary sold</th>
          <th>Gross</th>
          <th>Secondary sold</th>
          <th>Royalties</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        
              <tr>
                <td className="text-left">
                  <Row>
                    <Col md="4">
                      <Image src={event?.image?.url} alt={event?.name} rounded width="80" height="80" />
                    </Col>
                    <Col>
                      <p className="fw-bold">Nic Fanciulli</p>
                      <p className="fw-bold">CODA</p>
                      <p className="mb-0">Mar 19, 2022</p>
                    </Col>
                  </Row>
                </td>
                <td>
                    <Stack gap={3}>
                        <Badge bg='light' className="badge-label">50/500</Badge>
                        <ProgressBar now={20} />
                    </Stack>
                  {/* { calculateSold(event.tickets)} */}
                </td>
                <td>
                    <Stack gap={2}>
                    <Badge bg='light' className="badge-label">$3,200</Badge>
                    <Stack direction="horizontal" gap={2}>
                        <UpArrow /><span className="caption"><span className="text-success">55.8%</span> this week</span>
                    </Stack>
                    </Stack>
                    </td>
                    
                <td>
                     <Stack gap={3}>
                        <Badge bg='light' className="badge-label">50/500</Badge>
                        <ProgressBar now={20} />
                        </Stack>
                  {/* { calculateSold(event.tickets)} */}
                </td>
                <td>
                    <Stack gap={2}>
                    <Badge bg='light' className="badge-label">$3,200</Badge>
                    <Stack direction="horizontal" gap={2}>
                        <UpArrow /><span className="caption"><span className="text-success">55.8%</span> this week</span>
                    </Stack>
                    </Stack>
                </td>
                <td>Event on sale</td>
                <td className="btn-cell">
                <Dropdown>
                  <Dropdown.Toggle variant="default">
                    
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