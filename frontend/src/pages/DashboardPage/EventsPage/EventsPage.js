import { useContext, useState, useEffect } from "react";
import OrganizationContext from "../../../context/Organization/Organization";
import { CreateEvent, EventsTable } from "../../../components";
import Button from 'react-bootstrap/Button';

export default function EventsPage() {
  const data = useContext(OrganizationContext)
  const [events, setEvents] = useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setEvents(data.orgs[0].events)
  }, [])

  return(
    <div className="col-12">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Events</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          <Button variant="primary" onClick={handleShow}>
            Create Event
          </Button>
          </div>
        </div>
      </div>
      <EventsTable events={events} />
      <CreateEvent show={show} close={handleClose} />
    </div>
  )
}