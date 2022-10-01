import React, { useState, useEffect } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { TaxStatus } from './TaxStatus'

// step is controlled from parent component
export default function TaxWrapper({ step, setStep, getTaxDetails, company, account }) {

    const taxCodeOpt = [
        {
            label: 'N/A',
            value: 'n/a'
        },
        {
            label: '1',
            value: '1'
        },
        {
            label: '2',
            value: '2'
        },
        {
            label: '3',
            value: '3'
        },
        {
            label: '4',
            value: '4'
        },
        {
            label: '4',
            value: '4'
        },
        {
            label: '6',
            value: '6'
        },
        {
            label: '7',
            value: '7'
        },
        {
            label: '8',
            value: '8'
        },
        {
            label: '9',
            value: '9'
        },
        {
            label: '10',
            value: '10'
        },
        {
            label: '11',
            value: '11'
        },
        {
            label: '12',
            value: '12'
        },
        {
            label: '13',
            value: '13'
        },
    ]

    const [date, setDate] = useState(new Date())

    const [taxDetails, setTaxDetails] = useState({
        address: '',
        city: '',
        taxCode: taxCodeOpt[0].value,
        state: stateOpt[0].value,
        zip_code: '',
        ein: '',
        sign_by: '',
        corporation: ''
    })

    // set step when component mounts 
    useEffect(() => {
        setStep(1)
    }, [])


    // update parent state when state changes 
    useEffect(() => {
        getTaxDetails({ ...taxDetails, sign_date: date })
    }, [taxDetails, date])

    const handleTaxDetails = (e) => {
        setTaxDetails({ ...taxDetails, [e.target.name]: e.target.value })
        getTaxDetails(taxDetails)
    }

    return (
        <>
            <h1 className='fs-md'>IRS Substitute Form W-9</h1>
            <h2 className='fw-normal small mb-4'>The following form is required by the U.S. Internal Revenue Service and is only available in U.S. English. Please complete in U.S. English.</h2>
            <TaxStatus step={step} taxDetails={taxDetails} taxCodeOpt={taxCodeOpt} date={date} setDate={setDate} handleTaxDetails={handleTaxDetails} company={company} />
        </>
    )
}
