import React, { useState, useEffect } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Dropzone } from './Dropzone';
import { InfoIcon } from '../InfoIcon';

export default function UploadEventImage({ setSelectedImage, selectedImage, event }) {

    const [previewImage, setPreviewImage] = useState()

    const [croppedCoordinates, setCroppedCoordinates] = useState()

    const [show, setShow] = useState(false)

    const [showPreview, setShowPreview] = useState(true)

    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        if (previewImage) {
            setSelectedImage(previewImage[0].preview);
            
        } else {
            setSelectedImage(event?.image?.url)
        }
    }, [show, event])

    const handleClose = () => setShow(false)

    const handleSave = () => {
        setSelectedImage(previewImage[0]);
        handleClose();
    }

    const handleUpload = (img) => {
        setPreviewImage(img);
        setShow(true);
    }

    const onChange = (cropper) => {
        setCroppedCoordinates(cropper.getCoordinates())
    }

    const handleRemove = () => {
        setSelectedImage('')
        setShowPreview(false)
    }

    const handleReplace = () => {
        handleRemove()
    }

    return (
        <>
            <Stack direction="horizontal" gap={2}>
                <InfoIcon style="lg" />
                <small className='fw-medium'>
                    Use a high quality image in 1:1 ratio (eg. 1080 x 1080px).
                </small>
            </Stack>
            <div className="mt-3">
                {!selectedImage ? (
                    <Dropzone handleUpload={handleUpload} />
                ) : (
                    <>
                        <Image src={selectedImage} rounded width={!event && !showPreview ? croppedCoordinates.width: ''} height={!event && !showPreview  ? croppedCoordinates.height : ''} />
                        <Stack direction='horizontal' className='btn-group-flex justify-content-start'>
                            <Button variant='outline-light' className='text-danger' onClick={handleRemove}>Remove</Button>
                            <Button variant='outline-light' onClick={handleReplace}>Replace</Button>
                        </Stack>
                    </>
                )
                }

                {previewImage && (
                    <Modal centered animation={false} fullscreen="md-down" show={show} onHide={handleClose} backdrop='static'>
                        <Modal.Header closeButton className='mb-0'>
                            <Modal.Title as="h4">Image crop</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Cropper
                                src={previewImage[0].preview}
                                onChange={onChange}
                                className={'cropper'}
                                autoZoom={false}
                                stencilProps={{
                                    handlers: {},
                                    aspectRatio: 1.5 / 1.5
                                }}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-light" onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleSave}>Crop and save</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
}
