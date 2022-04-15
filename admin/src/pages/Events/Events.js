import { useState, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import OrganizationContext from "../../context/Organization/Organization";
import { CreateEvent } from "../../components";
import ShowTable from "../../components/Tables/Events/ShowTable";

export default function Events() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fullscreen = useState(true);
  const orgs = useContext(OrganizationContext)
 
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <h1 className="h2">Events</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <Button type="button" className="btn btn-sm btn-primary" onClick={handleShow}>
                Create Event
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <ShowTable />
      <CreateEvent show={show} handleClose={handleClose} fullscreen={fullscreen} orgs={orgs} />
    </Container>
  )
}