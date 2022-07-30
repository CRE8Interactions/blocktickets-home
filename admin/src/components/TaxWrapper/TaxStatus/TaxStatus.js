import React from 'react'

import { stateOpt } from '../../../utilities/helpers'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { DateInputWrapper } from '../../DateInputWrapper'

export default function TaxStatus({ step, taxDetails, date, setDate, handleTaxDetails }) {

    return (
        <>
            {step === 1 && (
                <Form>
                    <Form.Group className='form-group' controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            defaultValue="The Party Group LLC"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="corporation">
                        <Form.Label>Corporation</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue="C Corporation"
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="code">
                        <Form.Label>Description code</Form.Label>
                        <Form.Select
                            defaultValue="Exempt payee code (if any)"
                            disabled
                        >
                            <option value="payee">Exempt payee code (if any)</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group' controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder='Enter address'
                            required
                            value={taxDetails.address}
                            onChange={handleTaxDetails}
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            placeholder='Enter city'
                            required
                            value={taxDetails.city}
                            onChange={handleTaxDetails}
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Select
                            value={taxDetails.state} onChange={(e) => handleTaxDetails(e)} required name="state">
                            {stateOpt.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group' controlId="zip_code">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="zip_code"
                            placeholder='Enter zip code'
                            required
                            value={taxDetails.zip_code}
                            onChange={handleTaxDetails}
                        />
                    </Form.Group>
                </Form>
            )}
            {step === 2 && (
                <>
                    <h3 className='normal mb-4'>Taxplayer identification number (TIN)</h3>
                    <h4 className='normal mb-4'>EIN</h4>
                    <Form>
                        <Form.Control
                            type="text"
                            placeholder="__-_______"
                            name="ein"
                            maxLength="10"
                            onChange={handleTaxDetails}
                            required
                        />
                        <Form.Text>TIN and EIN type must correspond to the name provided in Step 1</Form.Text>
                    </Form>
                </>
            )}
            {step === 3 && (
                <>
                    <h3 className='normal mb-3'>Under penalties of perjury, I certify that:</h3>
                    <ol>
                        <li>The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and</li>
                        <li>I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subj
                            ect to backup withholding; and</li>
                        <li>I am a U.S. citizen or other U.S. person; and</li>
                        <li>The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</li>
                    </ol>
                    <p>The Internal Revenue Service does not require your consent to any provision of this document other than the certifications required to avoid backup withholding.</p>
                    <h4 className='small mt-4 mb-3' id="signature">Your signature</h4>
                    <Form.Control
                        type='text'
                        name="sign_by"
                        aria-labelledby='#signature'
                        placeholder="Sign name"
                        value={taxDetails.sign_by}
                        onChange={handleTaxDetails}
                    />
                    <small className='text-muted'>Typing your name acts as your signature</small>
                    <h4 className='small mt-4 mb-3' id="sign-date">Sign date</h4>
                    <DateInputWrapper id="sign-date" setDate={setDate} selectedDate={date} startDate={new Date} size="sm" />
                </>
            )}
            {(step === 1 || step === 2) && (
                <Alert variant="info">
                    <small>Note: Exemption from FATCA reporting code (if any) is not applicable</small></Alert>
            )}
            {step === 3 && (
                <Alert variant="info">
                    <small>Note: The date, time of submission and your computer's IP address will be recorded upon submission.</small></Alert>
            )}
        </>
    )
}
