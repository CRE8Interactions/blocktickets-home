import React from 'react';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';

import { EmptyContainer } from '../../EmptyContainer';
import { Payout } from './Payout';

import './payouts.scss';

export default function Tickets({ payouts }) {

    return (
        <>
            <Card body className='card--sm'>
                <>
                    {payouts && payouts.length > 0 ? (
                        <>
                            <Stack gap={2} as="ul" className="payouts">
                                {(payouts).map((payout, id) => (
                                    <Payout key={id} payout={payout} />
                                ))}
                            </Stack>
                        </>
                    ) : (
                        <EmptyContainer style="center">
                            <p>You don’t have any payouts. Check back in later</p>
                        </EmptyContainer>
                    )
                    }
                </>
            </Card>
        </>
    );
}
