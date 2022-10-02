import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../utilities/services/auth.service';
import { getEvent } from '../../utilities/api';
import { addDetailsToEvent, upload } from '../../utilities/api';
import { checkPermission } from '../../utilities/helpers';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { UploadEventImage } from '../UploadEventImage';
import { CreateEventButtons } from '../CreateEventButtons';
import { NoPermissionsContainer } from '../NoPermissionsContainer';

export default function DetailsWrapper({ eventId }) {

    const navigate = useNavigate();

    const { getPermissions } = AuthService;

    const [hasPermission, setHasPermission] = useState();

    const [selectedImage, setSelectedImage] = useState()

    const [initialState, setInitialState] = useState(false)

    const [event, setEvent] = useState()

    const [alert, setAlert] = useState({
        show: false,
        variant: '',
        message: ''
    })

    const [showFooter, setShowFooter] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {

        setHasPermission(checkPermission(getPermissions(), 1));

        // save initial state to check whether to show save buttons 
        setInitialState({
            selectedImage,
            summary: event?.summary || null,
        })
    }, [])

    useEffect(() => {
        if ((event?.image?.id || initialState?.selectedImage !== selectedImage || initialState?.summary !== event?.summary)) setShowFooter(true)
        else setShowFooter(false)
    }, [initialState, selectedImage, event?.summary, event])

    useEffect(() => {
        getEvent(eventId)
            .then((res) => {
                if (res.data) setEvent(res.data);
            })
            .catch((err) => console.error(err))
    }, [eventId])

    useEffect(() => {
        // Listens for image upload
    }, [selectedImage])

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }
    const b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    const handleSave = () => {
        setIsSaving(true)
        if (selectedImage && !selectedImage.includes('https:')) {
            const formData = new FormData();
            const ImageURL = selectedImage;
            // Split the base64 string in data and contentType
            const block = ImageURL.split(";");
            // Get the content type of the image
            const contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            const realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

            // Convert it to a blob to upload
            const blob = b64toBlob(realData, contentType);
            formData.append(`files`, blob);

            upload(formData)
                .then((res) => {
                    let data = {};
                    data['description'] = event?.summary;
                    data['eventUUID'] = eventId;
                    data['image'] = res?.data[0].id;

                    addDetailsToEvent({ data })
                        .then((res) => {
                            setIsSaving(false)
                            window.scroll(0, 0)
                            setAlert({
                                show: true,
                                variant: 'success',
                                message: 'Your details have been updated.'
                            })
                            // if not updating image
                            if (!event.image) {
                                navigate(`/myevent/${eventId}/tickets`)
                            }
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
            data['description'] = event?.summary;
            data['eventUUID'] = eventId;
            data['image'] = event?.image?.id;

            addDetailsToEvent({ data })
                .then((res) => {
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
        <div className='position-relative'>
            <section className={`wrapper event-form ${!hasPermission ? 'overlay' : ''}`}>
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
                        <Form.Control
                            as="textarea" rows={5}
                            name="summary"
                            value={event?.summary || ''}
                            onChange={handleChange}
                        />
                    </Card>
                </section>
            </section>
            {showFooter && (
                <CreateEventButtons isEditing={event?.image?.id ? true : false} isDisabled={!event?.image?.id ? !selectedImage : !event?.image?.id} isSaving={isSaving} handleSave={handleSave} styles={`${!hasPermission ? 'overlay' : ''} `} />
            )}

            {!hasPermission && (
                <NoPermissionsContainer />
            )}
        </div>
    );
}
