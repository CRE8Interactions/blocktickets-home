import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CreateEvent(props) {
  return(
    <Modal show={props.show}>
      <Modal.Header closeButton onClick={props.close}>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Close
        </Button>
        <Button variant="primary" onClick={props.close}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}