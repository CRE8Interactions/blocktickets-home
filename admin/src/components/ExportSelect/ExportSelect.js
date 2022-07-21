import React, { useState } from 'react';

import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import './exportSelect.scss'

export default function ExportSelect() {

    const exportOpt = [
        {
            label: "Excel",
            value: 'excel'
        },
        {
            label: "CVC",
            value: 'cvc'
        },

    ];

    const [exportTo, setExportTo] = useState('excel')

    return (
        <InputGroup className="export-group">
            <FloatingLabel controlId="export" label="Export">
                <Form.Select value={exportTo} onChange={(e) => setExportTo(e.target.value)}>
                    {exportOpt.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <Button variant="outline-light" className='justify-content-center align-items-center' id="download-btn">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.002 5.49957C13.002 4.94729 12.5543 4.49957 12.002 4.49957C11.4497 4.49957 11.002 4.94729 11.002 5.49957V13.5858L8.20906 10.7929C7.81854 10.4024 7.18537 10.4024 6.79485 10.7929C6.40432 11.1834 6.40432 11.8166 6.79485 12.2071L10.5878 16C11.3688 16.7811 12.6352 16.7811 13.4162 16L17.2072 12.209C17.5977 11.8185 17.5977 11.1854 17.2072 10.7948C16.8167 10.4043 16.1835 10.4043 15.793 10.7948L13.002 13.5858V5.49957Z" fill="#777E91" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4 14.5C4.55228 14.5 5 14.9477 5 15.5V17.5C5 18.0523 5.44772 18.5 6 18.5H18C18.5523 18.5 19 18.0523 19 17.5V15.5C19 14.9477 19.4477 14.5 20 14.5C20.5523 14.5 21 14.9477 21 15.5V17.5C21 19.1569 19.6569 20.5 18 20.5H6C4.34315 20.5 3 19.1569 3 17.5V15.5C3 14.9477 3.44772 14.5 4 14.5Z" fill="#777E91" />
                </svg>
            </Button>
        </InputGroup>
    );
}
