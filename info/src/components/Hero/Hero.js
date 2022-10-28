import React from 'react'
import { useInView } from 'react-intersection-observer'

import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import screenshot from '../../assets/screenshot.svg'

import './hero.scss';

export default function Hero() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: '0.5',
    })

    return (
        <section className='hero d-flex-column text-center'>
            <div className="section-header d-flex-column">
                <div className="hero-content d-flex-column">
                    <h1 className='section-heading display-1'>Control and security through <span className='text-primary'>blockchain</span>.</h1>
                    <Badge bg="default" className='small text-secondary badge--primary-light badge--tickets'>Innovative ticket selling</Badge>
                    <p className='hero-text'>Blocktickets uses blockchain technology to eliminate ticket fraud, and provide fans and organizers control of the secondary market with innovative features not available anywhere else.</p>
                    <Stack gap={3} className="my-5 align-items-center justify-content-center">
                        <Button variant='link' className='text-dark'>Learn more</Button>
                        <span><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.69526 5.69526C3.95561 5.43491 4.37772 5.43491 4.63807 5.69526L8.5 9.55719L12.3619 5.69526C12.6223 5.43491 13.0444 5.43491 13.3047 5.69526C13.5651 5.95561 13.5651 6.37772 13.3047 6.63807L9.44281 10.5C8.92211 11.0207 8.07789 11.0207 7.55719 10.5L3.69526 6.63807C3.43491 6.37772 3.43491 5.95561 3.69526 5.69526Z" fill="#23262F" />
                        </svg>
                        </span>
                    </Stack>
                </div>
                <Image ref={ref} src={screenshot} className={`image ${inView ? 'opacity-1' : 'opacity-0'}`} />
            </div>
        </section>
    )
}
