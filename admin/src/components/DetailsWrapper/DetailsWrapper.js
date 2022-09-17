import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvent } from '../../utilities/api';

import { addDetailsToEvent, upload } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';
import { CreateEventButtons } from '../CreateEventButtons';

export default function DetailsWrapper({ eventId }) {
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState()

    const [initialState, setInitialState] = useState(false)

    const [event, setEvent] = useState()

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    const [showFooter, setShowFooter] = useState(false)

    // const [eventImg, setEventImg] = useState()

    const [description, setDescription] = useState()

    const [isSaving, setIsSaving] = useState(false)

    // save initial state to check whether to show save buttons 
    useEffect(() => {
        setInitialState({
            selectedImage,
            description,
        })
    }, [])

    useEffect(() => {
        if ((event?.image?.id || initialState?.selectedImage !== selectedImage || initialState?.description !== description)) setShowFooter(true)
        else setShowFooter(false)
    }, [initialState, selectedImage, description, event])

    useEffect(() => {
        getEvent(eventId)
            .then((res) => {
                if (res.data) setEvent(res.data);
            })
            .catch((err) => console.error(err))
    }, [eventId])

    useEffect(() => {
        console.log(selectedImage)
    }, [selectedImage])

    const handleDescription = (e) => {
        setDescription(e.replace(/(<([^>]+)>)/gi, ""))
    }

    const handleSave = () => {
        setIsSaving(true)
        if (selectedImage) {
            const formData = new FormData();
            formData.append(`files`, selectedImage);

            upload(formData)
                .then((res) => {
                    console.log(res);
                    let data = {};
                    data['description'] = description;
                    data['eventUUID'] = eventId;
                    data['image'] = res?.data[0].id;

                    addDetailsToEvent({ data })
                        .then((res) => {
                            navigate(`/myevent/${eventId}/tickets`)
                            setIsSaving(false)
                            setAlert({
                                show: true,
                                variant: 'success',
                                message: 'Your details have been updated.'
                            })
                        })
                        .catch((err) => {
                            console.error(err)
                            window.scrollTo(0, 0)
                            setIsSaving(false)
                            setAlert({
                                show: true,
                                variant: 'danger',
                                message: 'Unable to save details please try again.'
                            })
                        })
                })
                .catch((err) => {
                    console.error(err)
                    setIsSaving(false)
                    window.scrollTo(0, 0)
                    setAlert({
                        show: true,
                        variant: 'danger',
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
                    // navigate(`/myevent/${eventId}/details`)
                    setIsSaving(false)
                    window.scrollTo(0, 0)
                    setAlert({
                        show: true,
                        variant: 'success',
                        message: 'Your details have been updated.'
                    })
                })
                .catch((err) => {
                    console.error(err)
                    setIsSaving(false)
                    window.scrollTo(0, 0)
                    setAlert({
                        show: true,
                        variant: 'danger',
                        message: 'Unable to save details please try again.'
                    })
                })
        }
    }

    return (
        <>
            <section className='wrapper event-form'>
                {alert.show &&
                    <>
                        <Alert variant={alert.variant} className="mb-5" onClose={() => setAlert({ show: false, variant: '', message: '' })} dismissible>
                            {alert.message}
                        </Alert>
                    </>
                }
                <section>
                    <header className="section-header-sm section-heading section-heading--secondary">
                        <h1>Main event image</h1>
                    </header>
                    <Card body className='card--sm'>
                        <UploadEventImage setSelectedImage={setSelectedImage} selectedImage={selectedImage} event={event} />
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
            </section>
            {showFooter && (
                <CreateEventButtons isEditing={event?.image?.id ? true : false} isDisabled={!event?.image?.id ? !selectedImage : !event?.image?.id} isSaving={isSaving} handleSave={handleSave} />
            )}
        </>
    );
}
