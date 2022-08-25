import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvent } from '../../utilities/api';

import { addDetailsToEvent, upload } from '../../utilities/api';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';

export default function DetailsWrapper({ eventId }) {

    const [selectedImage, setSelectedImage] = useState()

    const [event, setEvent] = useState()

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
        const formData = new FormData();
        formData.append(`files`, eventImg);

        upload(formData)
            .then((res) => {
                let data = {};
                data['description'] = description;
                data['eventUUID'] = eventId;
                data['image'] = res?.data[0].id;
                addDetailsToEvent({ data })
                    .then((res) => { navigate(`/myevent/${eventId}/tickets`) })
                    .catch((err) => console.error(err))
            })
            .catch((err) => console.error(err))
    }

    return (
        <section className='wrapper'>
            <section>
                <header className="section-header-sm section-heading section-heading--secondary">
                    <h1>Main event image</h1>
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
                <Button size="lg" disabled={!selectedImage} onClick={handleSave}>Save and continue</Button>
            </Stack>
        </section>
    );
}
