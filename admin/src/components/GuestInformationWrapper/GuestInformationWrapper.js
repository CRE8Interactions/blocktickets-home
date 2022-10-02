import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { GuestInfo } from './GuestInfo';
import { createGuestList, getEventTicketTypes } from '../../utilities/api';

export default function GuestInformationWrapper({ id }) {

    const navigate = useNavigate();

    const { uuid } = useParams();

    const [ticketTypes, setTicketType] = useState()

    const [valid, setValid] = useState(false)

    // demo purposes - will come from database - display error is ticket quantity is more than event max ticket quantity 
    const maxTicketQuantity = 50;

    const [guest, setGuest] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        quantity: '',
        ticketType: ''
    })

    const [
        phoneNumber,
        setValue
    ] = useState();

    const [isQuantityValid, setIsQuantityValid] = useState(true)

    const [countryCode, setCountryCode] = useState('');

    // save phone number to guest object every time it changes
    useEffect(() => {
        if (phoneNumber) {
            setGuest({ ...guest, phoneNumber })
        }
    }, [phoneNumber])

    useEffect(() => {
        if (!isQuantityValid) {
            setIsQuantityValid(true)
        }
    }, [guest.quantity])

    useEffect(() => {
        if (guest.phoneNumber, guest.firstName, guest.lastName, guest.quantity, guest.ticketType) return setValid(true)
        setValid(false)
    }, [guest.firstName, guest.lastName, guest.quantity, guest.ticketType, guest.phoneNumber])


    useEffect(() => {
        axios
            .get(`https://api.ipdata.co?api-key=${process.env.REACT_APP_IP_DATA_API_KEY}`)
            .then((res) => setCountryCode(res.data.country_code));
    }, []);

    useEffect(() => {
        getEventTicketTypes(uuid)
            .then((res) => {setTicketType(res.data)})
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {

    }, [ticketTypes])

    const validQuantity = e => {
        if (e.target.value > maxTicketQuantity) {
            setIsQuantityValid(false)
        }
    }

    const handleChange = e => {
        setGuest({ ...guest, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        guest['quantity'] = Number(guest.quantity)
        guest['event'] = uuid;
        console.log('GL ', guest)
        createGuestList(guest)
            .then(() => navigate(-1))
            .catch((err) => console.error(err))
        
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header section-heading">
                    <h1>{id ? 'Edit guest' : 'Guest'} information</h1>
                </header>
                <Card body>
                    <GuestInfo ticketTypes={ticketTypes} guest={guest} handleChange={handleChange}
                        setPhoneNumber={setValue} isQuantityValid={isQuantityValid} validQuantity={validQuantity} countryCode={countryCode} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button variant="outline-light" size="lg" onClick={() => navigate(-1)}>Cancel</Button>
                <Button size="lg" onClick={handleSave} disabled={!valid}>{id ? 'Update guest information' : 'Add Guest'}</Button>
            </Stack>
        </section>
    );
}
