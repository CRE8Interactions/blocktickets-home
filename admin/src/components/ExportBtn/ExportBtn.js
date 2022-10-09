import React from 'react';

import { exportHTML } from "../../utilities/helpers";

import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button';

export default function ExportBtn({ data }) {
    return (
        // <InputGroup className="export-group">
        //     <FloatingLabel controlId="export" label="Export" className='export-form-floating'>
        //         <Form.Select value={exportTo} onChange={setExportTo}>
        //             {exportOpt.map((option, index) => (
        //                 <option key={index} value={option.value}>{option.label}</option>
        //             ))}
        //         </Form.Select>
        //     </FloatingLabel>
        <Button variant="outline-light" className='justify-content-center align-items-center btn-download' onClick={(e) => exportHTML(data)}>
            <Stack className='justify-content-around align-items-start'>
                <span className="text-muted d-block caption fw-normal">Export</span>
                <span className='fw-medium'>Excel</span>
            </Stack>
        </Button>
        // </InputGroup >
    );
}
