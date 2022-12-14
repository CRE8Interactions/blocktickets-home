import React from 'react';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

import './actionBtns.scss';

export default function ActionBtns({ handleClick, ticketStatus, order }) {
   let hideSell = order?.tickets?.filter((ticket) => ticket.free === true).length > 0;
    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="btn-group-flex justify-content-center action-btns justify-content-md-end mt-md-2">
            <Button
                onClick={() => handleClick('transfer')}
                variant="dark"
                size="lg"
                disabled={ticketStatus === 'transferred'}>
                Transfer
            </Button>
            {
                !hideSell &&
                <Button
                    disabled={ticketStatus === 'listed'}
                    onClick={() => handleClick('sell')}
                    variant="dark"
                    size="lg">
                    Sell
                </Button>
            }
        </Stack>
    );
}
