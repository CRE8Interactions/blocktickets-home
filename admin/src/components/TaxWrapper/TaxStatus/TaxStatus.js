import React from 'react'

import { stateOpt } from '../../../utilities/helpers'

import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import { DateInputWrapper } from '../../DateInputWrapper'

export default function TaxStatus({ step, taxDetails, taxCodeOpt, date, setDate, handleTaxDetails, company }) {
    const classifications = [
        'Individual/sole proprietor or single-member LLC', 'C Corporation', 'S Corporation', 'Partnership',
        'Trust/estate', 'Limited liability company'
    ]
    return (
        <>
            {step === 1 && (
                <Form>
                    <Form.Group className='form-group' controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            defaultValue={company?.companyName}
                            disabled
                        />
                    </Form.Group>
                    <Form.Group className='form-group' controlId="corporation">
                        <Form.Label>Corporation</Form.Label>
                        <Form.Select
                            value={taxDetails.corporation} onChange={handleTaxDetails} name="corporation">
                            <optgroup className="text-muted" label="Federal tax classification">
                                {classifications.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </optgroup>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group' controlId="code">
                        <Form.Label>Exemption code</Form.Label>
                        <Form.Select
                            value={taxDetails.taxCode} onChange={handleTaxDetails} name="taxCode">
                            <optgroup className="text-muted" label="Exempt payee code (if any)">
                                {taxCodeOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </optgroup>
                        </Form.Select>
                    </Form.Group>
                    <fieldset className='form-group'>
                        <legend className="form-label">Address</legend>
                        <Stack gap={2}>
                            <Form.Control
                                type="text"
                                name="address"
                                aria-label="Address"
                                placeholder="Address"
                                value={taxDetails.address}
                                onChange={handleTaxDetails}
                            />
                            <Form.Control
                                type="text"
                                name="city"
                                aria-label="City"
                                placeholder="City"
                                value={taxDetails.city}
                                onChange={handleTaxDetails}
                            />
                            <Row>
                                <Col md={4}>
                                    <Form.Control
                                        type="text"
                                        name="zip_code"
                                        aria-label="Zip Code"
                                        placeholder="Zip code"
                                        value={taxDetails.zip_code}
                                        onChange={handleTaxDetails}
                                    />
                                </Col>
                                <Col className='ps-0'>
                                    <Form.Select aria-label="State" value={taxDetails.state} onChange={handleTaxDetails} name="state">
                                        {stateOpt.map((option, index) => (
                                            <option key={index} value={option.value}>{option.name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Stack>
                    </fieldset>
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
                    <Form.Text>Typing your name acts as your signature</Form.Text>
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
