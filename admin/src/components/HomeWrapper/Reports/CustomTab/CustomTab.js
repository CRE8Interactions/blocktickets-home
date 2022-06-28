import React from "react";

import { formatCurrency, formatNumber } from "../../../../utilities/helpers";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Stack from "react-bootstrap/Stack";

import { StatRow } from "../../../StatRow";
import { InfoIcon } from "../../../InfoIcon";

import './customTab.scss';

export default function CustomTab({ title, total, amount, stat, statAmount, text }) {

    return (
        <Stack className="justify-content-between align-items-start">
            <Stack direction="horizontal" className="split-row">
                <Stack direction="horizontal" gap={2}>
                    <span>{title}</span>
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{title}</Tooltip>}>
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