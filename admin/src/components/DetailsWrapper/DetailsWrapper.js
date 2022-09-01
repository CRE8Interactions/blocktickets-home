import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvent } from '../../utilities/api';

import { addDetailsToEvent, upload } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';

export default function DetailsWrapper({ eventId }) {

    const [selectedImage, setSelectedImage] = useState()

    const [event, setEvent] = useState()

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''

    })

    const [eventImg, setEventImg] = useState()

    const [description, setDescription] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        getEvent(eventId)
            .then((res) => {
                if (res.data) setEvent(res.data);
            })
            .catch((err) => console.error(err))
    }, [eventId])

    useEffect(() => {
        setEventImg(selectedImage)
    }, [selectedImage])

    const handleDescription = (e) => {
        setDescription(e.replace(/(<([^>]+)>)/gi, ""))
    }

    const handleSave = () => {
        if (eventImg) {
            const formData = new FormData();
            formData.append(`files`, eventImg);

            upload(formData)
                .then((res) => {
                    let data = {};
                    data['description'] = description;
                    data['eventUUID'] = eventId;
                    data['image'] = res?.data[0].id;

                    addDetailsToEvent({ data })
                        .then((res) => { 
                            navigate(`/myevent/${eventId}/details`) 
                            setAlert({
                                show: true,
                                varient: 'success',
                                message: 'Your details have been updated.'
                            }) 
                    })
                        .catch((err) => {
                            console.error(err)
                            setAlert({
                                show: true,
                                varient: 'error',
                                message: 'Unable to save details please try again.'
                            }) 
                        })
                })
                .catch((err) => {
                    console.error(err)
                    setAlert({
                        show: true,
                        varient: 'error',
                        message: 'Unable to save details please try again.'
                    }) 
                })
        } else {
            let data = {};
            data['description'] = description;
            data['eventUUID'] = eventId;
            data['image'] = event?.image?.id;

            addDetailsToEvent({ data })
                .then((res) => { 
                    navigate(`/myevent/${eventId}/details`)
                    setAlert({
                        show: true,
                        varient: 'success',
                        message: 'Your details have been updated.'
                    }) 
                })
                .catch((err) => {
                    console.error(err)
                    setAlert({
                        show: true,
                        varient: 'error',
                        message: 'Unable to save details please try again.'
                    })
                })
        }
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Main event image</h1>
                    { alert.show && 
                        <>
                            <Alert variant={alert.varient} onClose={() => setAlert({show: false, variant: '', message: ''})} dismissible>
                                {alert.message}
                            </Alert>
                        </>
                    }
                </header>
                <Card body className='card--sm'>
                    <UploadEventImage setSelectedImage={setSelectedImage} event={event} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Event description</h1>
                </header>
                <Card body className='card--sm'>
                    <TextEditor handleChange={handleDescription} event={event} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button size="lg" disabled={!event && !selectedImage} onClick={handleSave}>{event ? 'Save' : 'Save and continue'}</Button>
            </Stack>
        </section>
    );
}
