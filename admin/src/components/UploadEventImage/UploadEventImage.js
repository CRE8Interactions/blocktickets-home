import React, { useState, useEffect } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Dropzone } from './Dropzone';
import { InfoIcon } from '../InfoIcon';

export default function UploadEventImage({ selectedImage, setSelectedImage, event }) {

    // cropped image inside preview modal 
    const [croppedImage, setCroppedImage] = useState()

    // image when uploading it from file system 
    const [image, setImage] = useState()

    const [coordinates, setCoordinates] = useState()

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (event?.image?.id) {
            setSelectedImage(event?.image?.url)
        }
    }, [event])

    // set image as background 
    // useEffect(() => {
    //     if (selectedImage) {
    //         document.getElementById('upload-area').style.background = `url(${selectedImage})`
    //     }
    // }, [selectedImage])

    const handleClose = () => setShow(false)

    const handleSave = () => {
        setSelectedImage(croppedImage);
        handleClose();
    }

    const handleUpload = (img) => {
        setImage(img);
        setShow(true);
    }

    const onCrop = (cropper) => {
        setCoordinates(cropper.getCoordinates());
        setCroppedImage(cropper.getCanvas()?.toDataURL());
    };

    const handleRemove = () => {
        setSelectedImage('')
        setCroppedImage('')
        handleClose()
        setCoordinates()
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
                        {/* <div id="upload-area" style={{ height: "234px", objectFit: "cover", backgroundRepeat: 'no-repeat' }}>
                        </div> */}

                        <Image src={selectedImage} width={selectedImage ? coordinates?.width : ''} height={selectedImage ? coordinates?.height : ''} style={{ height: "234px", width: '232px' }}
                            rounded />
                        <Stack direction='horizontal' className='btn-group-flex justify-content-start'>
                            <Button variant='outline-light' className='text-danger' onClick={handleRemove}>Remove</Button>
                            <Button variant='outline-light' onClick={handleRemove}>Replace</Button>
                        </Stack>
                    </>
                )
                }

                {image && (
                    <Modal centered animation={false} fullscreen="md-down" show={show} onHide={handleClose} backdrop='static'>
                        <Modal.Header closeButton className='mb-0'>
                            <Modal.Title as="h4">Image crop</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Cropper
                                src={image[0].preview}
                                maxWidth="1080"
                                maxHeight="1080"
                                onChange={onCrop}
                                className={'cropper'}
                                autoZoom={false}

                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-light" onClick={handleRemove}>Cancel</Button>
                            <Button onClick={handleSave}>Crop and save</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
}
