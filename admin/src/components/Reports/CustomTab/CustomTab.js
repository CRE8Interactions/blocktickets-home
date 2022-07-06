import React, { useState, useEffect } from "react";

import { formatCurrency, formatNumber } from "../../../utilities/helpers";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/Stack";

import { StatRow } from "../../StatRow";
import { InfoIcon } from "../../InfoIcon";

export default function CustomTab({ title, total, amount, stat, statAmount, text, sales }) {

    const [tooltip, setTooltip] = useState('')

    useEffect(() => {
        switch (title) {
            case 'Net sales':
                setTooltip('Sales across  all your events after fees have been paid out')
                break;

            case 'Gross sales':
                setTooltip('Sales across all your events before fees have been paid ')
                break

            case 'Tickets sold':
                setTooltip(`The total ${sales == 'primary sales' ? 'primary' : 'secondary'} tickets sold across all your events on sale`)
                break

            case 'Page views':
                setTooltip('Page views for all your events on sales')
                break

            case 'Royalties':
                setTooltip('Royalties you’ve collected from secondary ticket sales across all your events')
                break;

            case 'Tickets listed':
                setTooltip('Tickets listed on the secondary market across all your events')
                break;
        }

    }, [title, sales])

    return (
        <Stack className="justify-content-between align-items-start">
            <Stack direction="horizontal" className="split-row small-label--flex">
                <Stack direction="horizontal" gap={2}>
                    <span className="small-label">{title}</span>
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{tooltip}</Tooltip>}>
                        <Button variant="link">
                            <InfoIcon variant="dark" />
                        </Button>
                    </OverlayTrigger>
                </Stack>
                <StatRow stat={stat} statAmount={statAmount} text={text} />
            </Stack>
            <span className="fs-md fw-semi-bold">{total ? `${formatCurrency(total)}` : `${formatNumber(amount)}`}</span>
        </Stack>
    )
}