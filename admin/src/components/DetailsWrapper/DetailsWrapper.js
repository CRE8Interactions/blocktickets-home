import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';

export default function DetailsWrapper() {

    const [selectedImage, setSelectedImage] = useState()

    const [description, setDescription] = useState('')

    const handleDescription = (e) => {
        setDescription(e.replace(/(<([^>]+)>)/gi, ""))

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
        </section>
    );
}
