import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';
import { BackButton } from '../BackButton';

export default function DetailsWrapper({ eventId, handleNext, handleGoBack }) {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState()

    const [description, setDescription] = useState('')

    const handleDescription = (e) => {
        setDescription(e.replace(/(<([^>]+)>)/gi, ""))
    }

    const handleClick = (e) => {
        if (handleNext) {
            handleNext(e, { selected_image: selectedImage, description })
        } else {
            // save changes
            handleSave()
        }
    }

    const handleSave = () => {
        // save state
        navigate(-1)
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
                {!eventId && (
                    <BackButton handleGoBack={handleGoBack} />
                )}
                <Button className={`${!eventId ? 'btn-next' : ''} `} size="lg" disabled={!selectedImage || !description} onClick={handleClick}>Save {eventId ? 'changes' : 'and continue'}</Button>
            </Stack>
        </section>
    );
}
