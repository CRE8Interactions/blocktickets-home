import React from 'react';

import Card from 'react-bootstrap/Card';

import { UploadEventImage } from '../UploadEventImage';
import { TextEditor } from '../TextEditor';

export default function DetailsWrapper({ handleChange }) {

    return (
        <>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Main event image</h1>
                </div>
                <Card body className="card--light">
                    <UploadEventImage handleChange={handleChange} />
                </Card>
            </section>
            <section>
                <div className="section-heading-sm section-heading--secondary">
                    <h1>Event description</h1>
                </div>
                <Card body className="card--light">
                    <TextEditor handleChange={handleChange} />
                </Card>
            </section>
        </>
    );
}
