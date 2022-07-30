import React, { useState, useEffect } from 'react'

import { stateOpt } from '../../utilities/helpers'

import { TaxStatus } from './TaxStatus'

// step is controlled from parent component
export default function TaxWrapper({ step, setStep, getTaxDetails }) {

    const [date, setDate] = useState(new Date())

    const [taxDetails, setTaxDetails] = useState({
        address: '',
        city: '',
        city: '',
        state: stateOpt[0].value,
        zip_code: '',
        ein: '',
        sign_by: 'Harrison Cogan'
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
    }

    return (
        <>
            <h1 className='fs-md'>IRS Substitute Form W-9</h1>
            <h2 className='fw-normal small mb-4'>The following form is required by the U.S. Internal Revenue Service and is only available in U.S. English. Please complete in U.S. English.</h2>
            <TaxStatus step={step} taxDetails={taxDetails} date={date} setDate={setDate} handleTaxDetails={handleTaxDetails} />
        </>
    )
}
