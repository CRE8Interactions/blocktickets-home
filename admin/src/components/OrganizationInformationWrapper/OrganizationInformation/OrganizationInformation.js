import React, { useEffect } from 'react'

import { stateOpt } from '../../../utilities/helpers'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import { Error } from '../../Error'

export default function OrganizationInformation({ org, setName, handleAddress, error }) {
    useEffect(() => {

    }, [org])

    return (
        <Form>
            <Form.Group className='form-group' controlId='name'>
                <Form.Label>Organization name</Form.Label>
                <Form.Control
                    type="text"
                    name="orgName"
                    required
                    placeholder="Enter organization name"
                    value={org?.orgName}
                    onChange={setName}
                    className={error?.type ? 'error-border' : ''}
                />
            </Form.Group>
            <fieldset className='form-group'>
                <legend className="form-label">Address</legend>
                <Stack gap={2}>
                    <Form.Control
                        type="text"
                        name="address_1"
                        aria-label="Address"
                        placeholder="Address"
                        value={org?.address?.address_1}
                        onChange={handleAddress}
                    />
                    <Form.Control
                        type="text"
                        name="city"
                        aria-label="City"
                        placeholder="City"
                        value={org?.address?.city}
                        onChange={handleAddress}
                    />
                    <Row>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                name="zipcode"
                                aria-label="Zip Code"
                                placeholder="Zip code"
                                value={org?.address?.zipcode}
                                onChange={handleAddress}
                            />
                        </Col>
                        <Col className='ps-0'>
                            <Form.Select aria-label="State" value={org?.address?.state} onChange={handleAddress} name="state">
                                {stateOpt.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Stack>
            </fieldset>
            {error.type && (
                <Error type={error.type} field={error.field} />
            )}
        </Form>
    )
}
