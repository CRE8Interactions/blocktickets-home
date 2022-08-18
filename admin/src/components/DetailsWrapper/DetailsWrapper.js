import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { createEvent } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';

export default function DetailsWrapper({ eventId }) {


    const [selectedImage, setSelectedImage] = useState()

    const [eventImg, setEventImg] = useState()

    const [description, setDescription] = useState()

    const [event, setEvent] = useState()

    useEffect(() => {
        setEventImg(selectedImage)
    }, [selectedImage])

    const handleDescription = (e) => {
        setDescription(e.replace(/(<([^>]+)>)/gi, ""))
    }

    const handleSave = () => {
        // save state
        // Creates Event img
        const data = {};
        const formData = new FormData();
        formData.append(`files.image`, eventImg, eventImg.name);
        // formats data for api

        // Send formData
        formData.append('data', JSON.stringify(data));
        createEvent(formData)
            .then((res) => { setEvent(res?.data?.data); console.log(res?.data) })
            .catch((err) => console.error(err))
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Main event image</h1>
                </header>
                <Card body className='card--sm'>
                    <UploadEventImage setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
                </Card>
            </section>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Event description</h1>
                </header>
                <Card body className='card--sm'>
                    <TextEditor handleChange={handleDescription} />
                </Card>
            </section>
            <Stack direction="horizontal" className="btn-group-flex">
                <Button size="lg" disabled={!selectedImage} onClick={handleSave}>Save and continue</Button>
            </Stack>
        </section>
    );
}
