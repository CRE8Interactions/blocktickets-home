import React from 'react'

import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

import control from '../../../assets/control.png'
import royalties from '../../../assets/royalties.png'
import airdrops from '../../../assets/airdrops.png'

export default function OrganizerFeatures() {
    return (
        <Stack className='features-container'>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Smart Tickets</h4>
                    <p>Total control and insight during the event cycle due to the real-time data showing ticket ownership and activity.</p>
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
                    <h4 className="feature-title">Control</h4>
                    <p>Optimize the min and max ticket prices for resales to prevent scalpers from under cutting your primary ticket inventory and give true fans the opportunity to buy tickets at fair prices. </p>
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
                    <h4 className="feature-title">Royalties</h4>
                    <p>Earn royalties from every ticket sold on the secondary market turning resales from your events into a new revenue stream.</p>
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
                    <p>Transfer NFT moments, special offers, tickets for future events and more directly into the wallets of your fans.</p>
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
