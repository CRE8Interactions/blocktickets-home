import React from 'react'

import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

import smartTickets from '../../../assets/smart-tickets.png'
import control from '../../../assets/control.png'
import royalties from '../../../assets/royalties.png'
import airdrops from '../../../assets/airdrops.png'

export default function OrganizerFeatures() {
    return (
        <Stack className='features-container'>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Smart Tickets</h4>
                    <p>Ticket fraud is impossible as each ticket is registered on the blockchain and self-updates in real-time with the latest activity and ownership details.</p>
                </div>
                <div className="feature-img-container">
                    <Image
                        src={smartTickets}
                        alt=""
                        className='feature-img'
                    />
                </div>
            </Stack>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Secondary market ownership</h4>
                    <p>You determine the pricing for ticket resales, which gives true fans the chance to buy tickets at a fair prices, while also taking in the profit that would have previously gone to scalpers.</p>
                </div>
                <div className="feature-img-container">
                    <Image
                        src={control}
                        alt=""
                        className='feature-img'
                    />
                </div>
            </Stack>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Organizer royalties</h4>
                    <p>For the first time, you get a percentage of every single ticket sold on the multi-billion dollar secondary market, turning ticket resales from your events into a new revenue stream.</p>
                </div>
                <div className="feature-img-container">
                    <Image
                        src={royalties}
                        alt=""
                        className='feature-img'
                    />
                </div>
            </Stack>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Airdrops (coming soon) </h4>
                    <p>Connect with your fans before and after your events by airdropping gifts, VIP perks, offers, and limited-edition collectibles that can be resold, all while organically building exclusive communities with aligned incentives</p>
                </div>
                <div className="feature-img-container">
                    <Image
                        src={airdrops}
                        alt=""
                        className='feature-img'
                    />
                </div>
            </Stack>
        </Stack>
    )
}
