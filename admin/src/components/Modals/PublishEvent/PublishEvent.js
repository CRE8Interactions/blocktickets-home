import { Modal, Button } from "react-bootstrap";

export default function PublishEvent(props) {
  const { event, show, handleClose, publish } = props;

  return(
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>Click the "Publish" button to make {event?.name} available to users.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => publish(event)}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}