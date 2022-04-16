import { useState, useEffect } from 'react';
import { Button, Col, Form, Image, Row, Modal } from "react-bootstrap";
import { getCategories, getVenues } from '../../../utilities/api';
import { PriceRangeSlider } from '../../PriceRangeSlider';
import './createEvent.scss';
import { createEvent as newEvent } from '../../../utilities/api';
import { creatTickets as newTickets } from '../../../utilities/api';

export default function CreateEvent(props) {
  const { show, handleClose, fullscreen, orgs, myEvent } = props;
  const organizationId = orgs.orgs ? orgs.orgs[0]['id'] : 'n/a';
  const ticketTypes = ['General Admission', 'Seated'];
  const [step, setStep] = useState()
  const [presentedBy, setPresentedBy] = useState()
  const [title, setTitle] = useState()
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()
  const [venue, setVenue] = useState()
  const [type, setType] = useState()
  const [categories, setCategories] = useState([])
  const [venues, setVenues] = useState([])
  const [image, setImage] = useState()
  const [description, setDesciption] = useState()
  const [ticketType, setTicketType] = useState()
  const [stepOneValid, setStepOne] = useState(false)
  const [stepTwoValid, setStepTwo] = useState(false)
  const [stepThreeValid, setStepThree] = useState(false)
  const [ticketName, setTicketName] = useState()
  const [ticketQty, setTicketQty] = useState()
  const [ticketPrice, setTicketPrice] = useState()
  const [facilityFee, setFacilityFee] = useState()
  const [royalty, setRoyalty] = useState()
  const [salesStartDate, setSalesStartDate] = useState()
  const [salesStartTime, setSalesStartTime] = useState()
  const [salesEndDate, setSalesEndDate] = useState()
  const [salesEndTime, setSalesEndTime] = useState()
  const [resaleRange, setResaleRange] = useState()
  const [minQty, setMinQty] = useState()
  const [maxQty, setMaxQty] = useState()
  const [event, setEvent] = useState()

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err))

    getVenues()
      .then((res) => setVenues(res.data))
      .catch((err) => console.error(err))
    
      console.log(step)
  }, [])

  useEffect(() => {
    validateSteps()
  }, [title, startDate, endDate, startTime, endTime, venue, type, image, description, maxQty, minQty, resaleRange, royalty, facilityFee, ticketPrice, ticketName, ticketQty, salesStartDate, salesStartTime, salesEndDate, salesEndTime])

  useEffect(() => {
    setStep(props.step)
    if (myEvent) {
      setVenue(myEvent.venue)
      setEvent(myEvent)
    }
  }, [props.step])

  const handleChange = (e) => {
    if (e.target.id === "presentedBy") setPresentedBy(e.target.value)
    if (e.target.id === "title") setTitle(e.target.value)
    if (e.target.id === "startDate") setStartDate(e.target.value)
    if (e.target.id === "startTime") setStartTime(e.target.value)
    if (e.target.id === "endDate") setEndDate(e.target.value)
    if (e.target.id === "endTime") setEndTime(e.target.value)
    if (e.target.id === "venue") {
      let venue = venues.find(venue => venue.id === Number(e.target.value));
      if (!venue) return
      setVenue(venue); 
    }
    if (e.target.id === "eventType") setType(e.target.value)
    if (e.target.id === "eventInformation") setDesciption(e.target.value)
    if (e.target.id === "mediaFile") {
      let files = e.target.files[0];
      setImage(files)

      // show preview on page
      if (!files) return;
      let reader = new FileReader()
      reader.onload = (e) => {
       const img = document.getElementById('imagePreview')
       img.setAttribute('src', e.target.result)
      }
      reader.readAsDataURL(files);
    }
    if (e.target.id === "ticketType") setTicketType(e.target.value)
    if (e.target.id === "ticketName") setTicketName(e.target.value)
    if (e.target.id === "ticketQty") {
      let msg = document.getElementById('capacity-error')
      let input = document.getElementById(e.target.id)
      if (e.target.value > venue.capacity) {
        msg.classList.remove('d-none')
        input.classList.add('is-invalid')
        e.target.value = ''
      } else {
        msg.classList.add('d-none')
        input.classList.remove('is-invalid')
        setTicketQty(e.target.value)
      }
    }
    if (e.target.id === "ticketPrice") setTicketPrice(e.target.value)
    if (e.target.id === "facilityFee") setFacilityFee(e.target.value)
    if (e.target.id === "royalty") setRoyalty(e.target.value)
    if (e.target.id === "salesStartDate") setSalesStartDate(e.target.value)
    if (e.target.id === "salesStartTime") setSalesStartTime(e.target.value)
    if (e.target.id === "salesEndDate") setSalesEndDate(e.target.value)
    if (e.target.id === "salesEndTime") setSalesEndTime(e.target.value)
    if (e.target.id === "minQuantity") setMinQty(e.target.value)
    if (e.target.id === "maxQuantity") setMaxQty(e.target.value)
  }

  const resaleChange = (e) => {
    setResaleRange(e)
  }
  
  const modalHeading = () => {
    if (step === 1) {
      return `Basic Info`
    } else if (step === 2) {
      return `Details` 
    } else if (step === 3) {
      return `Create a Ticket`
    }
  }

  const modalSubHeading = () => {
    if (step === 1) {
      return `Enter your event info below`
    } else if (step === 2) {
      return `Enter your main event image and description  below` 
    }
  }

  const submitEvent = async() => {
    const formData = new FormData();
    const file = image;

    let data = {}
    data['name'] = title
    data['summary'] = description
    data['capacity'] = venue.capacity
    data['categories'] = type
    data['venue'] = venue.id
    data['status'] = 'unpublished'
    data['currency'] = 'usd'
    data['event'] = event
    data['organizationId'] = organizationId;
    // formats start and end dates/time
    let sD = startDate.split('-')
    let sT = startTime.split(':')
    let eD = endDate.split('-')
    let eT = endTime.split(':')
    data['start'] = new Date(sD[0], sD[1], sD[2], sT[0], sT[1])
    data['end'] = new Date(eD[0], eD[1], eD[2], eT[0], eT[1])

    formData.append(`files.image`, file, file.name);
    formData.append('data', JSON.stringify(data));

    await newEvent(formData)
      .then((res) => { setEvent(res.data.data); setStep(step + 1) })
      .catch((err) => console.error(err))
  }

  const createTickets = async() => {
    let data = {}
    data['name'] = ticketName
    data['costs'] = ticketPrice
    data['quantity'] = ticketQty
    data['fee'] = facilityFee
    data['royalty'] = royalty
    data['minimum_quantity'] = minQty
    data['maximum_quantity'] = maxQty
    data['generalAdmission'] = ticketType === 'General Admission' ? true : false;
    data['event'] = event
     // formats start and end dates/time
     let sD = salesStartDate.split('-')
     let sT = salesStartTime.split(':')
     let eD = salesEndDate.split('-')
     let eT = salesEndTime.split(':')
     data['sales_start'] = new Date(sD[0], sD[1], sD[2], sT[0], sT[1])
     data['sales_end'] = new Date(eD[0], eD[1], eD[2], eT[0], eT[1])
 
     await newTickets({data: data})
      .then((res) => {
        handleClose()
        let updateEventTickets = orgs.orgs[0].events.find(e => e.id === event.id)
        updateEventTickets.tickets = res.data
      })
      .catch((err) => console.error(err))
  }

  const validateSteps = () => {
    // Validates step 1 in form fields
    if ((typeof title !== 'undefined' && title !== '') && typeof startDate !== 'undefined' && typeof startTime !== 'undefined' && typeof endDate !== 'undefined' && typeof endTime !== 'undefined' && typeof venue !== 'undefined' && typeof type !== 'undefined') {
      setStepOne(true)
    } else {
      setStepOne(false)
    }
    // Validates step 2 in form fields
    if (image && description) {
      setStepTwo(true)
    } else {
      setStepTwo(false)
    }
    // Validates step 3 in form fields
    if (ticketName && ticketQty && ticketPrice && facilityFee && royalty && resaleRange && salesStartDate && salesStartTime && salesEndDate && salesEndTime && minQty && maxQty) {
      setStepThree(true)
    } else {
      setStepThree(false)
    }    
  }

  const next = () => {
    if (step === 2) {
      submitEvent()
      return
    }

    if (stepThreeValid && step === 3) {
      createTickets()
      return
    }
    setStep(step + 1)
  }

  const checkBtn = () => {
    if (step === 1 && !stepOneValid) return true
    if (step === 1 && stepOneValid) return false
    if (step === 2 && !stepTwoValid) return true
    if (step === 2 && stepTwoValid) return false
    if (step === 3 && !stepThreeValid) return true
    if (step === 3 && stepThreeValid) return false
  }

  const clearInputs = () => {
    setStep(1)
    setStepOne(false)
    setStepTwo(false)
    setStepTwo(false)
    setImage(undefined)
  }

  return(
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen} onExit={clearInputs}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Step {step}</h6>
        <h4>{ modalHeading() }</h4>
        <h6>{ modalSubHeading() }</h6>
        <Form>
          { step === 1 && 
            <>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Event Title</Form.Label>
              <Form.Control type="text" placeholder="Enter your event title" onChange={(e) => handleChange(e)} required />
            </Form.Group>

            <div className="row">
              <div className='col-6'>
                <Form.Group className="mb-3" controlId="startDate">
                  <Form.Label>Event Start Date</Form.Label>
                  <Form.Control type="date" onChange={(e) => handleChange(e)} required />
                </Form.Group>
              </div>
              <div className='col-6'>
                <Form.Group className="mb-3" controlId="startTime">
                  <Form.Label>Event Start Time</Form.Label>
                  <Form.Control type="time" onChange={(e) => handleChange(e)} required />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className='col-6'>
                <Form.Group className="mb-3" controlId="endDate">
                  <Form.Label>Event End Date</Form.Label>
                  <Form.Control type="date" onChange={(e) => handleChange(e)} required />
                </Form.Group>
              </div>
              <div className='col-6'>
                <Form.Group className="mb-3" controlId="endTime">
                  <Form.Label>Event End Time</Form.Label>
                  <Form.Control type="time" onChange={(e) => handleChange(e)} required />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Select id="venue" onChange={(e) => handleChange(e)}>
                <option>Select A Venue</option>
                {
                  venues.map((venue, index) => {
                    let address = venue.address[0];
                    return <option value={venue.id} key={index}>{venue.name} - {address.address_1}, {address.city} {address.state} </option>
                  })
                }
              </Form.Select>
            </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Type of event</Form.Label>
                <Form.Select id="eventType" onChange={(e) => handleChange(e)}>
                  <option>Select Event Type</option>
                  {
                    categories.map((category, index) => {
                      return <option value={category.id} key={index}>{category.attributes.name}</option>
                    })
                  }
                </Form.Select>
              </Form.Group>
            </>
          }

          { step === 2 && 
            <>
              <h6 className='pt-4'>Main Event Image</h6>
              <Form.Text muted>
                JPG, png, and mp4 files should not be larger than 50MB. Still images should have width of 3000px ideally. For video, 1080p or 4K is best.
              </Form.Text>

              <Form.Group controlId="mediaFile" className="mb-3 mt-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" onChange={(e) => handleChange(e)} />
              </Form.Group>

              { image &&
              <Row>
                <Col className='col-12'>
                  <Form.Text>
                    NFT Media
                  </Form.Text>
                </Col>
                <Col className='col-12'>
                  <Image rounded="true" id="imagePreview" style={{width: '300px', height: '250px'}} />
                </Col>
              </Row>
              }

              <Form.Group className="mb-3 pt-3" controlId="eventInformation">
                <Form.Label>Event Information</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => handleChange(e)}  />
              </Form.Group>
            </>
          }

          {step === 3 &&
            <>
              <Form.Group className="mb-3">
                <Form.Label>Type of ticket</Form.Label>
                <Form.Select id="ticketType" onChange={(e) => handleChange(e)}>
                  <option>Select Ticket Type</option>
                  {
                    ticketTypes.map((ticket, index) => {
                      return <option value={ticket} key={index}>{ticket}</option>
                    })
                  }
                </Form.Select>
              </Form.Group>
              {ticketType && ticketType !== 'Select Ticket Type' &&
                <>
                  <Form.Group className="mb-3" controlId="ticketName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter a name for Ticket" onChange={(e) => handleChange(e)} required />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="ticketQty">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="Enter available quantity" onChange={(e) => handleChange(e)} />
                    <Form.Text id="capacity-error" className="d-none error">
                      Quantity is over venue capacity at {venue.capacity}.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="ticketPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter ticket price" onChange={(e) => handleChange(e)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="facilityFee">
                    <Form.Label>Facility Fee</Form.Label>
                    <Form.Control type="number" placeholder="Enter facility fee" onChange={(e) => handleChange(e)} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="royalty">
                    <Form.Label>Royalty</Form.Label>
                    <Form.Control type="number" placeholder="Enter royalty percentage" onChange={(e) => handleChange(e)} required />
                  </Form.Group>

                  <>
                    <div className='col-12'>
                      <p>Resale Price Range</p>
                    </div>
                    <PriceRangeSlider id="resaleRange" handleChange={resaleChange} minPrice={ticketPrice} required />
                  </>

                  <div className="row">
                    <div className='col-12'>
                      <p>When are tickets available</p>
                    </div>
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="salesStartDate">
                        <Form.Label>Sales Start</Form.Label>
                        <Form.Control type="date" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="salesStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="salesEndDate">
                        <Form.Label>Sales End</Form.Label>
                        <Form.Control type="date" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="salesEndTime">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12'>
                      <p>Tickets Per Order</p>
                    </div>
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="minQuantity">
                        <Form.Label>Minimum Quantity</Form.Label>
                        <Form.Control type="number" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                    <div className='col-6'>
                      <Form.Group className="mb-3" controlId="maxQuantity">
                        <Form.Label>Maximum Quantity</Form.Label>
                        <Form.Control type="number" onChange={(e) => handleChange(e)} required />
                      </Form.Group>
                    </div>
                  </div>
                </>
              }
            </>
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={(e) => next() } disabled={checkBtn()}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  )
}