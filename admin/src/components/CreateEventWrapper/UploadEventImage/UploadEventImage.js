import React, { useEffect, useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { Dropzone } from './Dropzone';
import { InfoIcon } from '../../InfoIcon';

export default function UploadEventImage({ handleChange }) {
    const [previewImage, setPreviewImage] = useState()
    const [selectedImage, setSelectedImage] = useState()

    const [croppedCoordinates, setCroppedCoordinates] = useState()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)

    const handleSave = () => {
        setSelectedImage(previewImage[0].preview);
        handleClose();
    }

    const handleUpload = (img) => {
        setPreviewImage(img);
        setShow(true)
    }

    const onChange = (cropper) => {
        setCroppedCoordinates(cropper.getCoordinates())
    }

    return (
        <>
            <Stack direction="horizontal" gap={2}>
                <InfoIcon />
                <Form.Text>
                    Use a high quality image in 1:1 ratio (eg. 1080 x 1080px).
                </Form.Text>
            </Stack>
            <div className="mt-3">
                {!selectedImage ? (
                    <Dropzone handleUpload={handleUpload} />
                ) : (
                    <>
                        <Image src={selectedImage} rounded width={croppedCoordinates.width} height={croppedCoordinates.height} />
                        <Stack direction='horizontal' className='btn-group-flex'>
                            <Button variant='outline-light' className='text-danger'>Remove</Button>
                            <Button variant='outline-light'>Replace</Button>
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
                                onReady={() => console.log('image readddy')}
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
