import React, { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';

import profile from '../../assets/profile-thumbnail.png';

import './ticket.scss';

export default function Ticket() {
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	return (
		<div className="ticket">
			<header>
				<Row gap={2} className="py-2 py-md-3 align-items-center">
					<Col md={2} id="artist-image-col" className="tablet-desktop-only">
						<img
							src={profile}
							alt="Nic Fanciulli"
							width="139"
							height="139"
							className="artist-image"
						/>
					</Col>
					<Col md={6} className="d-flex flex-column details">
						<h1 className="normal-lg artist-name">Nic Fanciulli</h1>
						<p className="caption--uppercase subtitle text-muted tablet-desktop-only">
							Coda, Platform, Floh, &amp; Embrace Presents:
						</p>
						<Row>
							<Col className="details-heading tablet-desktop-only" md={2}>
								<p className="time-caption">Time</p>
							</Col>
							<Col>
								<p className="small">
									Mar 13 <span className="time">9:00 PM</span>
								</p>
							</Col>
						</Row>
						<Row>
							<Col className="details-heading tablet-desktop-only" md={2}>
								<p className="venue-caption">Venue</p>
							</Col>
							<Col>
								<p className="small">
									CODA<span className="loc mobile-only">
										Toronto, ON or Full address of Venue goes here
									</span>
								</p>
							</Col>
						</Row>
						<Row className="tablet-desktop-only--flex">
							<Col className="details-heading" md={2}>
								<p className="location-caption location">Location</p>
							</Col>
							<Col>
								<p className="small">
									Toronto, ON or Full address of Venue goes here
								</p>
							</Col>
						</Row>
					</Col>
					<Col className='d-flex'>
    <>
      {/* <Button variant="default" className="btn--info ms-auto mt-0 " onClick={handleShow}>
      </Button> */}

      <Modal scrollable centered fullscreen="md-down" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title as="h4">Event information</Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
			    <div className="position-sticky">
					<Row className="align-items-center mb-3">
										<Col>
										<h1 className='m-0 heading-sm'>Nic Fancuilli</h1>
										</Col>
										<Col className='d-flex align-self-center'>
										<Badge className="ms-auto badge-outline badge-outline--secondary">Concert</Badge></Col>
										</Row>
										 <div className="mb-2">
											 <p className="time-caption">Time</p>
																								 <p className="normal-sm">
																									 Mar 13 9:00 PM - 11:00 EST
																								 </p>
										 </div>  
										 <div className="">
																		<p className="location-caption">Location</p>
																		<p className='normal-sm'><span className="loc"></span>Toronto, ON or Full address of Venue goes here <a href="">Directions</a></p>
																	</div>
				</div>
												<div>
													<img src={profile} alt="Nic Fanciulli" width="225" height="225" className="artist-image my-3" />
					
				<h4 className="normal mb-2">Additional Info</h4>
<p>Important Message Regarding COVID-19
Due to the uncertainty related to COVID-19, the holder of this ticket, on behalf of the holder and any accompanying minor, including a minor holding a separate ticket, acknowledges and agrees that admission to the Arena is subject to all safety and health requirements and policies, as well as any additional terms and conditions established by the Arena. Such terms may be updated from time to time (in the sole determination of the Arena). Please continue to visit the FTX Arena website for the most up to date information on the Arena health and safety measures.
FTX Arena Official Website	</p>							</div>
		</Modal.Body>
      
      </Modal>
    </>

					</Col>
				</Row>
			</header>
		</div>
	);
}
