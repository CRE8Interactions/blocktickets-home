import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { ContactForm } from './ContactForm';
import { ConfirmationModal } from './ConfirmationModal';

export default function ContactAttendeeWrapper({ id }) {

    const navigate = useNavigate();

    const [
        key,
        setKey
    ] = useState('email');

    const [sendTo, setSendTo] = useState()

    const [message, setMessage] = useState('')

    const [date, setDate] = useState(new Date());

    const [choice, setChoice] = useState('1')

    const [show, setShow] = useState(false);

    const handleSendTo = (selected) => {
        setSendTo(selected)
    }

    const handleChoice = (e) => {
        setChoice(e.target.id)
    }

    const handleMessage = (e) => {
        setMessage(e.replace(/(<([^>]+)>)/gi, ""))
    }

    const handleShow = () => setShow(true)

    const handleClose = () => setShow(false)

    const handleSend = () => {
        if (!sendTo) {
            setSendTo('all')
        }
        handleShow()
    }

    return (
        <>
            <section className='wrapper'>
                <section>
                    <header className="section-header section-heading section-heading--secondary">
                        <h1>{id ? 'Edit contact attendee' : 'Contact attendee'}</h1>
                    </header>
                    <Card body className='card--sm'>
                        <h2 className='normal'>Choose how you’d like to contact your attendees</h2>
                        <Tab.Container defaultActiveKey={key} activeKey={key} onSelect={(k) => setKey(k)}>
                            <div className='d-flex my-5'>
                                <Nav as="ul" variant="pills" justify>
                                    <Nav.Item as="li">
                                        <Nav.Link as="button" eventKey="email">
                                            Via email
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link as="button" eventKey="text">
                                            Via text
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <Tab.Content>
                                <Tab.Pane eventKey="email">
                                    <ContactForm type={key} id={id} handleSendTo={handleSendTo} handleMessage={handleMessage} message={message} handleChoice={handleChoice} choice={choice} setDate={setDate} date={date} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="text">
                                    <ContactForm type={key} id={id} handleSendTo={handleSendTo} handleMessage={handleMessage} message={message} handleChoice={handleChoice} choice={choice} setDate={setDate} date={date} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Card>
                </section>
                <Stack direction="horizontal" className="btn-group-flex">
                    <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button size="lg" className={`btn-${choice == '1' ? 'send' : 'schedule'} `} onClick={handleSend}>{choice === '1' ? 'Send' : 'Schedule'}</Button>
                </Stack>
            </section>

            <ConfirmationModal type={key} choice={choice} show={show} handleClose={handleClose} />
        </>
    );
}
