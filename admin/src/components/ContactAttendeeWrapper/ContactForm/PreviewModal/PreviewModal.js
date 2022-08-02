import React from 'react';

import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import logo from '../../../../assets/southside_music_hall-logo.png'
import facebook from '../../../../assets/icons/facebook-filled.svg';
import instagram from '../../../../assets/icons/instagram.svg';
import twitter from '../../../../assets/icons/twitter-filled.svg';
import tiktok from '../../../../assets/icons/tiktok-filled.svg';
import discord from '../../../../assets/icons/discord-filled.svg';

import './previewModal.scss';

export default function PreviewModal({ show, handleClose, message, event }) {
    return (
        <Modal id="preview-modal" scrollable centered animation={false} fullscreen="md-down" show={show} onHide={handleClose}>
            <div className="header mb-3">
                <Stack direction='horizontal' className="justify-content-end">
                    <CloseButton onClick={handleClose} />
                </Stack>
                <Image
                    src={logo}
                    alt="Southside Music Hall"
                    width="160"
                    height="108"
                    className="m-auto"
                />
                <h2 className='fs-md my-4'>Message</h2>
                <p>{message}</p>
            </div>
            <Modal.Body>
                <Card body>
                    <Image
                        src={event}
                        alt="Nic Fancuilli Live" className="event-image"
                        width="212"
                        height="213"
                    />
                    <h4 className="event-name mb-2">Nic Fancuilli Live</h4>
                    <Stack as="p" gap={1} className="small align-items-center">
                        <span>Fri Sept 3, 2022 EST <span className='time'>9:00 PM EST</span></span>
                        <span>Southside Music Hall</span>
                        <span className='text-muted'>Dallas, TX</span>
                    </Stack>
                    <Button className='mt-4'>Buy tickets</Button>
                </Card>
                <div className="footer">
                    <Image
                        src={logo}
                        alt="Southside Music Hall"
                        width="160"
                        height="108"
                    />
                    <span className='fw-medium small text-dark'>Find us</span>
                    <Stack direction='horizontal' as="ul">
                        <li>
                            <a href="https://www.facebook.com/blocktickets" target="_blank">
                                <Image src={facebook} alt="facebook" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/blocktickets" target="_blank">
                                <Image src={instagram} alt="instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.twitter.com/blocktickets" target="_blank">
                                <Image src={twitter} alt="twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/blocktickets" target="_blank">
                                <Image src={tiktok} alt="tiktok" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.discord.com/blocktickets" target="_blank">
                                <Image src={discord} alt="discord" />
                            </a>
                        </li>
                    </Stack>

                </div>
            </Modal.Body>
        </Modal>
    );
}
