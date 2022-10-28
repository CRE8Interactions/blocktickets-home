import React from 'react'

import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

import control from '../../../assets/control.png'
import royalties from '../../../assets/royalties.png'
import airdrops from '../../../assets/airdrops.png'

export default function FanFeatures() {
    return (
        <Stack className='features-container'>
            <Stack className='feature-box'>
                <div className="feature-desc">
                    <h4 className="feature-title">Access</h4>
                    <p>Purchase tickets with standard payment methods such as credit card, apple pay and google pay while still benefiting from the security of blockchain.</p>
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
                    <h4 className="feature-title">Post-Events (coming soon)</h4>
                    <p>Purchase tickets with standard payment methods such as credit card, apple pay and google pay while still benefiting from the security of blockchain.</p>
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
                    <h4 className="feature-title">Transfer & Sell</h4>
                    <p>Transfer tickets to a friend or sell them on our secondary marketplace with 100% certainty that the recipient will receive their tickets within seconds of the transaction.  </p>
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
                    <h4 className="feature-title">Ticket Bids (coming soon) </h4>
                    <p>Fans can bid on tickets that are sold out and no longer available for sale, giving them the ultimate opportunity to see their favourite artist at a price they're willing to pay.</p>
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
